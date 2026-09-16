import { ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading label="Career" title="Experience" />

        <div className="experience__timeline reveal">
          {experienceData.map((exp, idx) => (
            <div className="experience__item" key={idx}>
              <div className="experience__dot" />
              <div className="experience__card">
                <div className="experience__header">
                  <div>
                    <div className="experience__role">{exp.role}</div>
                    <div className="experience__company">
                      {exp.company}, {exp.location}
                    </div>
                  </div>
                  <span className="experience__duration-badge">
                    {exp.duration}
                  </span>
                </div>

                <div className="experience__period">{exp.period}</div>

                <ul className="experience__responsibilities">
                  {exp.responsibilities.map((r, i) => (
                    <li className="experience__responsibility" key={i}>
                      <ChevronRight
                        size={14}
                        className="experience__responsibility-icon"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="experience__technologies">
                  {exp.technologies.map((tech) => (
                    <span className="experience__tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
