import { useEffect, useRef } from "react";
import companionConfig from "./companionConfig";
import useCompanionInteraction from "./useCompanionInteraction";
import useCompanionPhysics from "./useCompanionPhysics";
import "./AICompanion.css";

export default function AICompanion() {
  const elementRef = useRef(null);
  const { speech, handleEvent, speak } = useCompanionInteraction();
  const physics = useCompanionPhysics({
    elementRef,
    onEvent: handleEvent,
  });

  useEffect(() => {
    const onCursor = (event) => {
      const element = elementRef.current;
      if (!element || physics.state === "dragging") return;
      const rect = element.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
      );
      if (distance < 170) {
        const direction = event.clientX < rect.left ? -1 : 1;
        element.style.setProperty("--look-x", `${direction * 2}px`);
        element.style.setProperty(
          "--look-y",
          `${((event.clientY - rect.top) / rect.height) * 2 - 1}px`,
        );
      }
    };
    window.addEventListener("pointermove", onCursor, { passive: true });
    return () => window.removeEventListener("pointermove", onCursor);
  }, [physics.state]);

  if (!companionConfig.enabled) return null;

  const stateClass = `ai-companion--${physics.state}`;

  return (
    <div
      ref={elementRef}
      className={`ai-companion ${stateClass}`}
      style={{ "--companion-size": `${companionConfig.size}px` }}
      aria-label="Interactive AI companion"
      role="complementary"
    >
      {companionConfig.speechEnabled && speech && (
        <div className="ai-companion__speech" aria-live="polite">
          {speech}
        </div>
      )}
      <button
        className="ai-companion__character"
        type="button"
        aria-label={`Interact with ${companionConfig.name}. Drag to move or throw.`}
        onPointerDown={physics.onPointerDown}
        onPointerMove={physics.onPointerMove}
        onPointerUp={physics.onPointerUp}
        onPointerCancel={physics.onPointerCancel}
        onClick={() => {
          if (physics.state !== "dragging")
            speak("Want to see Vijay's projects?", true);
        }}
      >
        <span className="ai-companion__antenna" />
        <span className="ai-companion__ear ai-companion__ear--left" />
        <span className="ai-companion__ear ai-companion__ear--right" />
        <span className="ai-companion__body">
          <span className="ai-companion__visor">
            <span className="ai-companion__eye ai-companion__eye--left" />
            <span className="ai-companion__eye ai-companion__eye--right" />
            <span className="ai-companion__spark" />
          </span>
          <span className="ai-companion__core" />
          <span className="ai-companion__foot ai-companion__foot--left" />
          <span className="ai-companion__foot ai-companion__foot--right" />
        </span>
      </button>
      <span className="ai-companion__status">
        {companionConfig.name} · {physics.state}
      </span>
    </div>
  );
}
