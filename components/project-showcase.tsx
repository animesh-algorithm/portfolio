import { ArrowUpRight } from "./icons";

type ProjectShowcaseProps = {
  label: string;
  linkLabel: string;
  title: React.ReactNode;
  description: string;
  meta: string;
  tone: "coral" | "violet" | "blue" | "yellow";
  featured?: boolean;
  children: React.ReactNode;
};

export function ProjectShowcase({ label, linkLabel, title, description, meta, tone, featured, children }: ProjectShowcaseProps) {
  return (
    <article className={`project project-${tone}${featured ? " project-featured" : ""}`}>
      <a className="project-visual-link" href="#contact" aria-label={`Read about ${linkLabel}`}>
        {children}
        <span className="project-open"><ArrowUpRight /></span>
      </a>
      <div className="project-copy">
        <div className="project-story">
          <span className="project-label">{label}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="project-meta">{meta}</span>
      </div>
    </article>
  );
}
