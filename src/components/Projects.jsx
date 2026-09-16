import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          label="Portfolio"
          title="Selected Projects"
          subtitle="Things I've built and worked on."
        />

        <div className="projects__grid reveal">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
