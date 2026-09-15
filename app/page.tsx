import { ArrowUpRight, Asterisk, Spark } from "@/components/icons";
import { ProjectShowcase } from "@/components/project-showcase";
import { DataVisual, PlaygroundVisual, StudioVisual, VisaFlowVisual } from "@/components/project-visuals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

const experience = [
  {
    period: "Now",
    role: "Chief of Staff",
    company: "Gradly",
    description: "Turns out if you keep solving problems outside your job description, eventually they change the job description.",
  },
  {
    period: "2023 — 25",
    role: "Software Engineer → Product Lead",
    company: "Gradly",
    description: "Built products, internal systems, AI, claims infrastructure, integrations, and eventually the engineering team itself.",
  },
  {
    period: "2021 — 23",
    role: "Founding Engineer",
    company: "Gradly",
    description: "Started as a contractor writing scripts to kill manual work. Kept going until there wasn’t much of the company I hadn’t touched.",
  },
];

const notes = [
  ["Context is something you acquire.", "“I don’t have enough context” is useful for about five minutes.", "4 min"],
  ["Prototype before architecture.", "Walk ten steps and check the map before walking a kilometre in the wrong direction.", "5 min"],
  ["I don’t automate tasks. I automate roles.", "The interesting part of automation starts when you stop thinking in individual tasks.", "6 min"],
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-status"><span /> Available for interesting problems</div>
        <h1 id="hero-title">
          I figure things out. <br />
          Then I <em>build</em> them.
        </h1>
        <div className="hero-bottom">
          <p>Engineer, product person, automation obsessive, and professional “give it to Animesh, he’ll figure it out” person.</p>
          <a className="circle-link" href="#work" aria-label="See selected work">↓</a>
        </div>
        <Spark className="hero-spark" />
        <div className="hero-sticker"><span>BUILD</span><b>↘</b><span>SHIP</span></div>
      </section>

      <section className="work-section chapter chapter-paper-deep scallop-top" id="work" aria-labelledby="work-title">
        <div className="shell work-inner">
          <SectionHeading eyebrow="01 / Selected work" title="Things I’m glad exist." aside="Some shipped at work. Some started because I got annoyed enough to build them." />
          <div className="project-list">
          <ProjectShowcase label="Project 01 — VisaFile" linkLabel="VisaFile" title="DS-160, minus the suffering." description="The DS-160 can take hours of form-filling. VisaFile turns your answers into an automated application run, stopping only when it actually needs you." meta="Automation · Product · Engineering" tone="coral" featured>
            <VisaFlowVisual />
          </ProjectShowcase>
          <div className="project-pair">
            <ProjectShowcase label="Project 02 — AI Insurance Concierge" linkLabel="AI Insurance Concierge" title="Support that knows what’s going on." description="An AI support system that understands the customer, their journey, the insurance plan, and the conversation before drafting a reply." meta="AI · RAG · Product" tone="violet">
              <StudioVisual />
            </ProjectShowcase>
            <ProjectShowcase label="Project 03 — Gradly Operations" linkLabel="Gradly Operations" title={<>I don’t automate tasks.<br />I automate roles.</>} description="What started as a few scripts became the operating infrastructure behind sales, policies, payments, claims, insurance data exchange, and customer operations." meta="Automation · Systems · Engineering" tone="blue">
              <DataVisual />
            </ProjectShowcase>
          </div>
          <ProjectShowcase label="Project 04 — Experiments" linkLabel="Experiments" title={<>Things I built because<br />“someone should make this.”</>} description="Small tools, automations, experiments, and occasionally questionable ideas that made it far enough to become software." meta="Ongoing · Playground" tone="yellow">
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
            <h2 id="about-title">Engineer by trade.<br /><em>Problem solver</em> by necessity.</h2>
            <div className="about-body">
              <p>I’m unusually comfortable when the problem is ambiguous, the documentation is bad, nobody quite knows what to do, and it still needs to ship Friday.</p>
              <p>I started my career scripting away repetitive work. That turned into building internal tools, then customer products, then entire systems, then leading teams.<br /><br />I kept picking up problems until my job title had to catch up.</p>
            </div>
          </div>
          <aside className="about-side">
            <span>BASED IN</span><strong>India ↗</strong>
            <span>GOOD AT</span><strong>Products, AI, automation, figuring shit out</strong>
          </aside>
        </div>
      </section>

      <section className="experience-section chapter chapter-butter scallop-top" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading eyebrow="03 / Experience" title={<>Where I got good at<br />figuring shit out.</>} />
          <div className="experience-list">
            {experience.map(({ period, role, company, description }) => (
              <div className="experience-row" key={period}>
                <span className="experience-period">{period}</span>
                <div className="experience-role"><h3>{role}</h3><p>{company}</p></div>
                <p className="experience-description">{description}</p>
              </div>
            ))}
          </div>
          <div className="experience-mark" aria-hidden="true">✦</div>
        </div>
      </section>

      <section className="now-section chapter chapter-coral scallop-top" aria-labelledby="now-title">
        <div className="now-card shell">
          <div className="now-orbit"><span>✦</span><i /><i /></div>
          <div className="now-copy">
            <p className="eyebrow">04 / Right now</p>
            <h2 id="now-title">Currently building,<br />learning & following<br /><em>whatever looks useful.</em></h2>
          </div>
          <ul>
            <li><span>01</span> Automating things people still do manually</li>
            <li><span>02</span> Human-in-the-loop AI that actually works</li>
            <li><span>03</span> VisaFile</li>
          </ul>
        </div>
      </section>

      <section className="notes-section chapter chapter-paper scallop-top" id="notes" aria-labelledby="notes-title">
        <div className="shell notes-inner">
          <SectionHeading eyebrow="05 / Notes" title="Opinions, loosely organized." aside="Things I’ve learned from building software, breaking software, fixing operations, talking to users, and occasionally doing things the hard way." />
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
          <h2>Got a hard problem?<br /><em>Even better if you’re<br />not sure how to solve it.</em></h2>
          <a className="contact-button" href="mailto:hello.animeshsharma@gmail.com">hello.animeshsharma@gmail.com <ArrowUpRight /></a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Animesh</span>
            <div><a href="#top">LinkedIn</a><a href="#top">GitHub</a><a href="#top">X / Twitter</a></div>
            <a className="consulting-link" href="#top">Looking for professional project help? <span>Work with me ↗</span></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
