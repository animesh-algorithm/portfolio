type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  aside?: string;
};

export function SectionHeading({ eyebrow, title, aside }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {aside ? <p className="section-aside">{aside}</p> : null}
    </header>
  );
}
