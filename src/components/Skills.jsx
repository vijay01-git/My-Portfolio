import SectionHeading from './SectionHeading';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          label="Expertise"
          title="Skills & Technologies"
          subtitle="Technologies and tools I work with."
        />

        <div className="skills__categories reveal">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div className="skills__category" key={category}>
              <h3 className="skills__category-name">{category}</h3>
              <div className="skills__chips">
                {skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
