type SectionHeadingProps = {
  eyebrow: string;
  id?: string;
  title: React.ReactNode;
  aside?: string;
};

export function SectionHeading({ eyebrow, id, title, aside }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {aside ? <p className="section-aside">{aside}</p> : null}
    </header>
  );
}
