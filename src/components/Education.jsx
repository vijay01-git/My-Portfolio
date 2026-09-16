import { GraduationCap, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import {
  educationData,
  certificationsData,
  softSkillsData,
} from '../data/portfolioData';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        {/* Education */}
        <SectionHeading label="Education" title="Education" />
        <div className="education__cards reveal">
          {educationData.map((edu, i) => (
            <div className="education__card" key={i}>
              <div className="education__icon">
                <GraduationCap size={22} />
              </div>
              <div className="education__info">
                <div className="education__degree">{edu.degree}</div>
                <div className="education__institution">{edu.institution}</div>
                <div className="education__meta">
                  <span className="education__period">{edu.period}</span>
                  {edu.cgpa && (
                    <span className="education__cgpa">CGPA: {edu.cgpa}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: '80px' }}>
          <SectionHeading label="Credentials" title="Certifications" />
          <div className="certifications__grid reveal">
            {certificationsData.map((cert, i) => (
              <div className="certification__card" key={i}>
                <div className="certification__icon">
                  <Award size={18} />
                </div>
                <div>
                  <div className="certification__title">{cert.title}</div>
                  <div className="certification__issuer">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div style={{ marginTop: '80px' }}>
          <SectionHeading label="Strengths" title="Soft Skills" />
          <div className="soft-skills__pills reveal">
            {softSkillsData.map((skill) => (
              <span className="soft-skill__pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
