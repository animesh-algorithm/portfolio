import { ArrowUpRight } from "./icons";

type ProjectShowcaseProps = {
  number: string;
  title: string;
  description: string;
  meta: string;
  tone: "coral" | "violet" | "blue" | "yellow";
  featured?: boolean;
  children: React.ReactNode;
};

export function ProjectShowcase({ number, title, description, meta, tone, featured, children }: ProjectShowcaseProps) {
  return (
    <article className={`project project-${tone}${featured ? " project-featured" : ""}`}>
      <a className="project-visual-link" href="#contact" aria-label={`Read about ${title}`}>
        {children}
        <span className="project-open"><ArrowUpRight /></span>
      </a>
      <div className="project-copy">
        <span className="project-number">{number}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="project-meta">{meta}</span>
      </div>
    </article>
  );
}
