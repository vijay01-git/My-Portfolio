import { useEffect, useRef, useState } from "react";

const sectionMessages = {
  about: "Want to know about Vijay?",
  skills: "Java + Frontend + MySQL ⚡",
  projects: "Let's check out the projects!",
  contact: "Maybe it's time to say hello!",
};

export default function useCompanionInteraction() {
  const [speech, setSpeech] = useState("");
  const lastSpeech = useRef(0);
  const section = useRef("home");

  const speak = (text, force = false) => {
    if (!text) return;
    const now = Date.now();
    if (!force && now - lastSpeech.current < 7000) return;
    lastSpeech.current = now;
    setSpeech(text);
    window.setTimeout(() => setSpeech(""), 3400);
  };

  useEffect(() => {
    const sections = Object.keys(sectionMessages);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible || section.current === visible.target.id) return;
        section.current = visible.target.id;
        if (Math.random() > 0.45) speak(sectionMessages[visible.target.id]);
      },
      { threshold: [0.25, 0.6] },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        event.key.toLowerCase() === "v" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        speak("Hi! Try dragging me around.", true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
    speech,
    handleEvent: (type, payload) => {
      if (type === "speech") speak(payload.text);
      if (type === "edge" && payload.edge === "top")
        speak("Whoa! That's high 😳", true);
    },
    speak,
  };
}
