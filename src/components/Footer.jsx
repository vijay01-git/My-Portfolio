import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__name">{personalInfo.name}</div>
        <div className="footer__role">
          Software Developer • Frontend • Java
        </div>

        <div className="footer__socials">
          <a
            href={personalInfo.linkedin}
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={personalInfo.github}
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
        </div>

        <div className="footer__copyright">
          © {new Date().getFullYear()} Vijay M. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
