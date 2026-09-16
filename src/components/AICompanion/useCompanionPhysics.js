import { useCallback, useEffect, useRef, useState } from "react";
import companionConfig from "./companionConfig";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function useCompanionPhysics({ elementRef, onEvent }) {
  const [state, setState] = useState("entrance");
  const stateRef = useRef("entrance");
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const drag = useRef({
    active: false,
    pointerId: null,
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    moved: false,
  });
  const frame = useRef(null);
  const lastFrame = useRef(0);
  const idleClock = useRef(0);
  const reducedMotion = useRef(false);
  const hasEntered = useRef(false);

  const setCompanionState = useCallback((nextState) => {
    if (stateRef.current === nextState) return;
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const notify = useCallback(
    (type, payload = {}) => {
      onEvent?.(type, payload);
    },
    [onEvent],
  );

  const getBounds = useCallback(() => {
    const size = companionConfig.size;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const top = companionConfig.safeArea.top;
    const bottom = Math.max(
      top + 50,
      height - companionConfig.safeArea.bottom - size,
    );
    return {
      minX: companionConfig.safeArea.edge,
      maxX: Math.max(
        companionConfig.safeArea.edge,
        width - size - companionConfig.safeArea.edge,
      ),
      minY: top,
      maxY: bottom,
    };
  }, []);

  const render = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    const { x, y } = position.current;
    element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation.current}deg)`;
  }, [elementRef]);

  const placeAtStart = useCallback(() => {
    const bounds = getBounds();
    position.current = {
      x: bounds.maxX - 12,
      y: bounds.maxY,
    };
    render();
  }, [getBounds, render]);

  const finishEntrance = useCallback(() => {
    if (hasEntered.current) return;
    hasEntered.current = true;
    const bounds = getBounds();
    position.current = { x: bounds.maxX - 12, y: bounds.maxY };
    velocity.current = { x: 0, y: 0 };
    setCompanionState("happy");
    notify("speech", { text: "Hi Vijay's visitor! 👋" });
    window.setTimeout(() => setCompanionState("idle"), 900);
  }, [getBounds, notify, setCompanionState]);

  const settle = useCallback(() => {
    velocity.current.x = 0;
    velocity.current.y = 0;
    rotation.current = 0;
    setCompanionState("idle");
  }, [setCompanionState]);

  const onPointerDown = useCallback(
    (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      const rect = elementRef.current?.getBoundingClientRect();
      if (!rect) return;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      event.preventDefault();
      drag.current = {
        active: true,
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: performance.now(),
        moved: false,
      };
      velocity.current = { x: 0, y: 0 };
      setCompanionState("dragging");
    },
    [elementRef, setCompanionState],
  );

  const onPointerMove = useCallback(
    (event) => {
      const currentDrag = drag.current;
      if (!currentDrag.active || currentDrag.pointerId !== event.pointerId)
        return;
      event.preventDefault();
      const bounds = getBounds();
      const now = performance.now();
      const dt = Math.max(8, now - currentDrag.lastTime);
      const nextX = clamp(
        event.clientX - currentDrag.offsetX,
        bounds.minX,
        bounds.maxX,
      );
      const nextY = clamp(
        event.clientY - currentDrag.offsetY,
        0,
        window.innerHeight - companionConfig.size,
      );
      const sampleX = (event.clientX - currentDrag.lastX) / (dt / 1000);
      const sampleY = (event.clientY - currentDrag.lastY) / (dt / 1000);
      velocity.current.x = clamp(
        sampleX * 0.78,
        -companionConfig.physics.maxSpeed,
        companionConfig.physics.maxSpeed,
      );
      velocity.current.y = clamp(
        sampleY * 0.78,
        -companionConfig.physics.maxSpeed,
        companionConfig.physics.maxSpeed,
      );
      position.current = { x: nextX, y: nextY };
      rotation.current = clamp(velocity.current.x * 0.025, -18, 18);
      currentDrag.lastX = event.clientX;
      currentDrag.lastY = event.clientY;
      currentDrag.lastTime = now;
      currentDrag.moved =
        currentDrag.moved || Math.abs(sampleX) + Math.abs(sampleY) > 25;
      render();
    },
    [getBounds, render],
  );

  const onPointerUp = useCallback(
    (event) => {
      const currentDrag = drag.current;
      if (!currentDrag.active || currentDrag.pointerId !== event.pointerId)
        return;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      currentDrag.active = false;
      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      if (!currentDrag.moved) {
        velocity.current = { x: 0, y: 0 };
        setCompanionState("happy");
        notify("speech", { text: "Hey! Nice to meet you!" });
        window.setTimeout(() => setCompanionState("idle"), 800);
        return;
      }
      if (!companionConfig.physicsEnabled) {
        velocity.current = { x: 0, y: 0 };
        setCompanionState("idle");
        return;
      }
      if (speed < 90) {
        setCompanionState("falling");
        return;
      }
      if (Math.abs(velocity.current.y) > 450 && velocity.current.y < 0) {
        notify("speech", { text: "Whoa! That's high 😳" });
      } else if (speed > 600) {
        notify("speech", { text: "Easy there 😅" });
      }
      setCompanionState("thrown");
    },
    [notify, setCompanionState],
  );

  const onPointerCancel = useCallback(
    (event) => {
      if (drag.current.active && drag.current.pointerId === event.pointerId)
        onPointerUp(event);
    },
    [onPointerUp],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    placeAtStart();
    const entranceTimer = window.setTimeout(
      finishEntrance,
      reducedMotion.current ? 0 : 500,
    );
    const handleResize = () => {
      const bounds = getBounds();
      position.current.x = clamp(position.current.x, bounds.minX, bounds.maxX);
      position.current.y = clamp(position.current.y, bounds.minY, bounds.maxY);
      render();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.clearTimeout(entranceTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [finishEntrance, getBounds, placeAtStart, render]);

  useEffect(() => {
    const step = (time) => {
      const dt = Math.min((time - (lastFrame.current || time)) / 1000, 0.034);
      lastFrame.current = time;
      const currentState = stateRef.current;
      const currentDrag = drag.current;
      if (
        !currentDrag.active &&
        companionConfig.physicsEnabled &&
        currentState !== "entrance" &&
        currentState !== "happy"
      ) {
        const bounds = getBounds();
        const physics = companionConfig.physics;
        const motionScale = reducedMotion.current ? 0.35 : 1;
        velocity.current.y += physics.gravity * dt * motionScale;
        velocity.current.x *= Math.pow(physics.airResistance, dt * 60);
        position.current.x += velocity.current.x * dt;
        position.current.y += velocity.current.y * dt;
        let hit = null;
        if (
          position.current.x <= bounds.minX ||
          position.current.x >= bounds.maxX
        ) {
          position.current.x = clamp(
            position.current.x,
            bounds.minX,
            bounds.maxX,
          );
          velocity.current.x *= -physics.bounce;
          hit = position.current.x <= bounds.minX ? "left" : "right";
        }
        if (position.current.y <= bounds.minY) {
          position.current.y = bounds.minY;
          velocity.current.y = Math.abs(velocity.current.y) * physics.bounce;
          rotation.current *= 0.5;
          hit = "top";
        } else if (position.current.y >= bounds.maxY) {
          position.current.y = bounds.maxY;
          if (Math.abs(velocity.current.y) > physics.settleSpeed) {
            velocity.current.y = -Math.abs(velocity.current.y) * physics.bounce;
            setCompanionState("bouncing");
            hit = "bottom";
          } else {
            velocity.current.y = 0;
            velocity.current.x *= physics.friction;
          }
        }
        if (hit) {
          notify("edge", {
            edge: hit,
            speed: Math.hypot(velocity.current.x, velocity.current.y),
          });
          if (hit === "top") notify("speech", { text: "Why am I up here?" });
          if (hit === "bottom") notify("speech", { text: "That was fun!" });
          if (hit === "left" || hit === "right")
            notify("speech", { text: "Hello from the edge!" });
        }
        rotation.current += velocity.current.x * dt * 0.025;
        render();
        idleClock.current += dt;
        if (
          Math.abs(velocity.current.x) < 2 &&
          Math.abs(velocity.current.y) < 2 &&
          position.current.y >= bounds.maxY - 1
        )
          settle();
        if (
          companionConfig.idleAnimations &&
          currentState === "idle" &&
          idleClock.current > 7
        ) {
          idleClock.current = 0;
          if (Math.random() > 0.45) {
            velocity.current.x =
              (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 35);
            setCompanionState("walking");
          }
        }
      }
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [getBounds, notify, render, settle, setCompanionState]);

  return {
    state,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
}
