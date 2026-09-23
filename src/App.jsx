import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Scroll-reveal: observe elements with .reveal class
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // If user prefers reduced motion, make everything visible immediately
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("reveal--visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    // Observe all .reveal elements (with slight delay to ensure DOM is ready)
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Background effects */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true">
        <div className="bg-glow__orb bg-glow__orb--1" />
        <div className="bg-glow__orb bg-glow__orb--2" />
        <div className="bg-glow__orb bg-glow__orb--3" />
      </div>

      {/* Navigation */}
      <Navbar
        theme={theme}
        onToggle={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <BackToTop />

      {/* AI Companion — commented out, not in use */}
      {/* <AICompanion /> */}
    </>
  );
}

export default App;
