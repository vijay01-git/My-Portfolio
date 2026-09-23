import { ExternalLink, FolderOpen, ArrowUpRight, Lock } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function ProjectCard({ project }) {
  const {
    number,
    title,
    description,
    technologies,
    image,
    github,
    live,
    caseStudy,
    comingSoon,
  } = project;

  if (comingSoon) {
    return (
      <div className="project-card project-card--coming-soon">
        <div className="project-card__image">
          <div className="project-card__image-placeholder">
            <Lock size={28} className="project-card__image-placeholder-icon" />
            <span className="project-card__image-placeholder-text">
              In Development
            </span>
          </div>
          <span className="project-card__number">{number}</span>
        </div>
        <div className="project-card__body">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__description project-card__coming-soon-text">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-card">
      <div className="project-card__image">
        {image ? (
          <img src={image} alt={`${title} screenshot`} loading="lazy" />
        ) : (
          <div className="project-card__image-placeholder">
            <FolderOpen
              size={32}
              className="project-card__image-placeholder-icon"
            />
            <span className="project-card__image-placeholder-text">
              Add screenshot
            </span>
          </div>
        )}
        <span className="project-card__number">{number}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="project-card__technologies">
            {technologies.map((tech) => (
              <span className="project-card__tech-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__actions">
          {github && (
            <a
              href={github}
              className="project-card__btn project-card__btn--github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              <GithubIcon size={14} /> GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              className="project-card__btn project-card__btn--live"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {caseStudy && (
            <a
              href={caseStudy}
              className="project-card__btn project-card__btn--case-study"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} case study`}
            >
              <ArrowUpRight size={14} /> Case Study
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
