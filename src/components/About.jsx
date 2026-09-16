import SectionHeading from './SectionHeading';
import { aboutData } from '../data/portfolioData';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading label="About" title="About Me" />

        <div className="about__grid reveal">
          {/* Left */}
          <div>
            <h3 className="about__headline">
              Developer focused on building{' '}
              <span>useful digital experiences.</span>
            </h3>
          </div>

          {/* Right */}
          <div>
            <p className="about__text">{aboutData.description}</p>

            <div className="about__highlights">
              {aboutData.highlights.map((h) => (
                <span className="about__highlight-tag" key={h}>
                  {h}
                </span>
              ))}
            </div>

            <div className="about__mini-timeline">
              {aboutData.timeline.map((item, i) => (
                <div className="about__mini-timeline-item" key={i}>
                  <span className="about__mini-timeline-dot" />
                  <div>
                    <div className="about__mini-timeline-title">{item.title}</div>
                    <div className="about__mini-timeline-subtitle">
                      {item.subtitle}
                    </div>
                    <div className="about__mini-timeline-period">
                      {item.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
