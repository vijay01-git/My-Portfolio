import { useEffect, useState, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import {
  personalInfo,
  heroMicroDetails,
  roleOptions,
} from "../data/portfolioData";

/* Interactive CSS 3D Cube */
function Cube3D() {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: -25, y: 45 });

  useEffect(() => {
    let animId;
    let angle = 0;
    const animate = () => {
      angle += 0.4;
      setRotation({
        x: -25 + Math.sin(angle * 0.008) * 10,
        y: angle,
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="cube-scene">
      <div
        className="cube"
        ref={cubeRef}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="cube__face cube__face--front">
          <span>&lt;/&gt;</span>
        </div>
        <div className="cube__face cube__face--back">
          <span>JS</span>
        </div>
        <div className="cube__face cube__face--right">
          <span>{ }</span>
        </div>
        <div className="cube__face cube__face--left">
          <span>VM</span>
        </div>
        <div className="cube__face cube__face--top">
          <span>⚛</span>
        </div>
        <div className="cube__face cube__face--bottom">
          <span>⚙</span>
        </div>
      </div>
      {/* Orbiting particles */}
      <div className="cube-orbit">
        <div className="cube-orbit__dot cube-orbit__dot--1" />
        <div className="cube-orbit__dot cube-orbit__dot--2" />
        <div className="cube-orbit__dot cube-orbit__dot--3" />
      </div>
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(
    Math.max(0, roleOptions.indexOf(personalInfo.role)),
  );
  const [displayedRole, setDisplayedRole] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedRole(roleOptions[roleIndex]);
      return;
    }

    let cancelled = false;
    const currentRole = roleOptions[roleIndex];
    let charIndex = 0;
    let phase = "typing"; // "typing" → "pausing" → "erasing"

    const tick = () => {
      if (cancelled) return;

      if (phase === "typing") {
        charIndex += 1;
        setDisplayedRole(currentRole.slice(0, charIndex));
        if (charIndex >= currentRole.length) {
          phase = "pausing";
          setTimeout(() => !cancelled && tick(), 1200);
          return;
        }
        setTimeout(() => !cancelled && tick(), 65);
      } else if (phase === "pausing") {
        phase = "erasing";
        setTimeout(() => !cancelled && tick(), 40);
      } else if (phase === "erasing") {
        charIndex -= 1;
        setDisplayedRole(currentRole.slice(0, charIndex));
        if (charIndex <= 0) {
          setTimeout(() => {
            if (!cancelled) setRoleIndex((i) => (i + 1) % roleOptions.length);
          }, 300);
          return;
        }
        setTimeout(() => !cancelled && tick(), 40);
      }
    };

    setTimeout(() => !cancelled && tick(), 200);

    return () => { cancelled = true; };
  }, [roleIndex]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__inner">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__badge">Hello, I&apos;m</div>

          <h1 className="hero__heading">
            {personalInfo.name} <br />
            <span className="hero__heading-highlight hero__heading-highlight--typing">
              {displayedRole}
            </span>
          </h1>

          <p className="hero__description">{personalInfo.description}</p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="hero__btn--primary"
              onClick={(e) => handleScrollTo(e, "projects")}
            >
              View My Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="hero__btn--secondary"
              onClick={(e) => handleScrollTo(e, "contact")}
            >
              Let's Connect
            </a>
          </div>

          <a
            href={personalInfo.resumeUrl}
            className="hero__resume-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={14} /> Download Resume
          </a>

          <div className="hero__micro">
            {heroMicroDetails.map((item, i) => (
              <span key={i}>
                <span className="hero__micro-item">{item}</span>
                {i < heroMicroDetails.length - 1 && (
                  <span className="hero__micro-separator" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right Visual — 3D Cube */}
        <div className="hero__visual">
          <div className="hero__visual-glow" />
          <div className="hero__3d-container">
            <Cube3D />
          </div>
        </div>
      </div>
    </section>
  );
}
