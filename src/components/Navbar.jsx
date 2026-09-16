import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMobile();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
          VIJAY M
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link${activeSection === link.href.replace('#', '') ? ' navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="navbar__cta navbar__cta--desktop"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Connect
        </a>

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle${mobileOpen ? ' navbar__toggle--active' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu${mobileOpen ? ' navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="navbar__cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Connect
        </a>
      </div>
    </nav>
  );
}
