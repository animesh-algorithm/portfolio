import { ArrowUpRight, Asterisk, Spark } from "@/components/icons";
import { ProjectShowcase } from "@/components/project-showcase";
import { DataVisual, PlaygroundVisual, StudioVisual, VisaFlowVisual } from "@/components/project-visuals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

const experience = [
  ["Now", "Building thoughtful products", "Independent"],
  ["2024 — 25", "Product engineering", "Somewhere interesting"],
  ["2022 — 24", "Software engineering", "A good team"],
];

const notes = [
  ["Designing for the nervous click", "A few notes on making complex flows feel calm.", "4 min"],
  ["What prototypes are actually for", "Learning faster without mistaking polish for proof.", "6 min"],
  ["Useful automation, quietly done", "Small systems that give attention back.", "3 min"],
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-status"><span /> Available for good conversations</div>
        <h1 id="hero-title">
          I build digital things <br />
          with <em>care</em> and curiosity.
        </h1>
        <div className="hero-bottom">
          <p>Product-minded engineer working across software, AI, and the small details that make things feel right.</p>
          <a className="circle-link" href="#work" aria-label="See selected work">↓</a>
        </div>
        <Spark className="hero-spark" />
        <div className="hero-sticker"><span>BUILD</span><b>↘</b><span>SHIP</span></div>
      </section>

      <section className="work-section chapter chapter-paper-deep scallop-top" id="work" aria-labelledby="work-title">
        <div className="shell work-inner">
          <SectionHeading eyebrow="01 / Selected work" title="A few things I’ve made." aside="Selected projects, experiments, and useful systems." />
          <div className="project-list">
          <ProjectShowcase number="01" title="A clearer path through complexity" description="A guided product for a process that usually feels anything but guided." meta="Product · Engineering" tone="coral" featured>
            <VisaFlowVisual />
          </ProjectShowcase>
          <div className="project-pair">
            <ProjectShowcase number="02" title="An AI workspace for making" description="Exploring a calmer interface for human and machine collaboration." meta="AI · Product" tone="violet">
              <StudioVisual />
            </ProjectShowcase>
            <ProjectShowcase number="03" title="Operations without the busywork" description="Turning repetitive data work into a dependable flow." meta="Automation · Systems" tone="blue">
              <DataVisual />
            </ProjectShowcase>
          </div>
          <ProjectShowcase number="04" title="Tiny tools & experiments" description="A growing collection of useful, strange, and occasionally delightful ideas." meta="Ongoing · Playground" tone="yellow">
            <PlaygroundVisual />
          </ProjectShowcase>
          </div>
        </div>
      </section>

      <section className="about-section chapter chapter-cobalt scallop-top" id="about" aria-labelledby="about-title">
        <div className="shell about-grid">
          <div className="about-mark"><Asterisk /></div>
          <div className="about-copy">
            <p className="eyebrow">02 / About</p>
            <h2 id="about-title">Engineer by practice.<br /><em>Product person</em> by instinct.</h2>
            <div className="about-body">
              <p>I like ambiguous problems, useful systems, and interfaces that don’t need a manual.</p>
              <p>This is placeholder copy for now—but the point of view is real.</p>
            </div>
          </div>
          <aside className="about-side">
            <span>BASED IN</span><strong>India ↗</strong>
            <span>FOCUSED ON</span><strong>Products, AI, automation</strong>
          </aside>
        </div>
      </section>

      <section className="experience-section chapter chapter-butter scallop-top" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading eyebrow="03 / Experience" title="Where I’ve spent my time." />
          <div className="experience-list">
            {experience.map(([year, role, company]) => (
              <div className="experience-row" key={year}>
                <span>{year}</span><h3>{role}</h3><p>{company}</p><i>↗</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="now-section chapter chapter-coral scallop-top" aria-labelledby="now-title">
        <div className="now-card shell">
          <div className="now-orbit"><span>✦</span><i /><i /></div>
          <div className="now-copy">
            <p className="eyebrow">04 / Right now</p>
            <h2 id="now-title">Currently building,<br />learning & following<br /><em>the interesting thread.</em></h2>
          </div>
          <ul>
            <li><span>01</span> Human-in-the-loop AI</li>
            <li><span>02</span> Calm software</li>
            <li><span>03</span> Tools with taste</li>
          </ul>
        </div>
      </section>

      <section className="notes-section chapter chapter-paper scallop-top" id="notes" aria-labelledby="notes-title">
        <div className="shell notes-inner">
          <SectionHeading eyebrow="05 / Notes" title="Thinking in public, occasionally." aside="Short notes on building, products, and the spaces between." />
          <div className="notes-list">
          {notes.map(([title, description, time], index) => (
            <a className="note-row" href="#contact" key={title}>
              <span className="note-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="note-time">{time} read</span>
              <span className="note-arrow"><ArrowUpRight /></span>
            </a>
          ))}
          </div>
        </div>
      </section>

      <footer className="contact-section chapter chapter-blue scallop-top" id="contact">
        <div className="shell contact-inner">
          <p className="eyebrow">06 / Say hello</p>
          <h2>Have an idea, a question,<br />or just want to <em>compare notes?</em></h2>
          <a className="contact-button" href="mailto:hello@example.com">hello@example.com <ArrowUpRight /></a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Animesh</span>
            <div><a href="#top">LinkedIn</a><a href="#top">GitHub</a><a href="#top">X / Twitter</a></div>
            <a className="consulting-link" href="#top">Looking for professional project help? <span>Visit the studio ↗</span></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
