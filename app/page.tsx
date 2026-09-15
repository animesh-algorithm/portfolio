import { ArrowUpRight, Asterisk, Spark } from "@/components/icons";
import { ProjectShowcase } from "@/components/project-showcase";
import {
  ClaimsVisual,
  DataVisual,
  // PlaygroundVisual,
  StudioVisual,
  VisaFlowVisual,
} from "@/components/project-visuals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { connection } from "next/server";

const workHeadlines = [
  "I said I could. So I did.",
  "Enough talk. Here’s the work.",
  "I’d rather show you.",
  "This is the part where I prove it.",
] as const;

const workEyebrows = [
  "01 / Built, Not Pitched",
  "01 / Show, Don’t Tell",
  "01 / For the Record",
] as const;

const workDescriptions = [
  "Some came with the job. Others were an itch I had to scratch.",
  "Some were my job. Some became my job the moment they annoyed me enough.",
  "Some paid the bills. Others were an itch I had to scratch.",
] as const;

function randomOption<const Options extends readonly string[]>(
  options: Options,
) {
  return options[Math.floor(Math.random() * options.length)];
}

const experience = [
  {
    period: "Now",
    role: "Chief of Staff",
    company: "Gradly",
    description:
      "Turns out if you keep solving problems outside your job description, eventually they change the job description.",
  },
  {
    period: "2023 — 25",
    role: "Software Engineer → Product Lead",
    company: "Gradly",
    description:
      "Built products, internal systems, AI, claims infrastructure, integrations, and eventually the engineering team itself.",
  },
  {
    period: "2021 — 23",
    role: "Founding Engineer",
    company: "Gradly",
    description:
      "Started as a contractor writing scripts to kill manual work. Kept going until there wasn’t much of the company I hadn’t touched.",
  },
];

const notes = [
  [
    "Context is something you acquire.",
    "“I don’t have enough context” is useful for about five minutes.",
    "4 min",
  ],
  [
    "Prototype before architecture.",
    "Walk ten steps and check the map before walking a kilometre in the wrong direction.",
    "5 min",
  ],
  [
    "I don’t automate tasks. I automate roles.",
    "The interesting part of automation starts when you stop thinking in individual tasks.",
    "6 min",
  ],
];

export default async function Home() {
  await connection();

  const workHeadline = randomOption(workHeadlines);
  const workEyebrow = randomOption(workEyebrows);
  const workDescription = randomOption(workDescriptions);

  return (
    <main id="top">
      <SiteHeader />

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-status">
          <span />
          OPEN TO GOOD IDEAS & GOOD CONVERSATIONS
        </div>
        <h1 id="hero-title">
          I figure things out. <br />
          Then I <em>build</em> them.
        </h1>
        <div className="hero-bottom">
          <p>
            Engineer, product person, automation obsessive, and professional{" "}
            <strong className="hero-quote">
              “give it to Animesh, he’ll figure it out”
            </strong>{" "}
            person.
          </p>
          <a
            className="circle-link"
            href="#work"
            aria-label="See selected work"
          >
            ↓
          </a>
        </div>
        <Spark className="hero-spark" />
        <div className="hero-sticker">
          <span>BUILD</span>
          <b>↘</b>
          <span>SHIP</span>
        </div>
      </section>

      <section
        className="work-section chapter chapter-paper-deep scallop-top"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="shell work-inner">
          <SectionHeading
            id="work-title"
            eyebrow={workEyebrow}
            title={workHeadline}
            aside={workDescription}
          />
          <div className="project-list">
            <ProjectShowcase
              label="Project 01 — VisaFile"
              linkLabel="VisaFile"
              links={[
                {
                  href: "https://youtu.be/IomQnHifsFU",
                  label: "Watch demo",
                  icon: "demo",
                },
                {
                  href: "https://github.com/animesh-algorithm/visafile",
                  label: "GitHub",
                  icon: "github",
                },
              ]}
              title="DS-160, minus the suffering."
              description="The DS-160 can take hours of form-filling. VisaFile turns your answers into an automated application run, stopping only when it actually needs you."
              meta="Automation · Product · Engineering"
              tone="coral"
              featured
            >
              <VisaFlowVisual />
            </ProjectShowcase>
            <div className="project-pair">
              <ProjectShowcase
                label="Project 02 — AI Insurance Concierge"
                linkLabel="AI Insurance Concierge"
                links={[
                  {
                    href: "https://www.loom.com/share/f3c7bff788054442a555f304c29c1b6d?sid=d834c1dc-8b63-4613-a4d2-51f9302517e6",
                    label: "Watch demo",
                    icon: "demo",
                  },
                ]}
                title="Support that knows what’s going on."
                description="An AI support system that understands the customer, their journey, the insurance plan, and the conversation before drafting a reply."
                meta="AI · RAG · Product"
                tone="violet"
              >
                <StudioVisual />
              </ProjectShowcase>
              <ProjectShowcase
                label="Project 03 — Gradly Links"
                linkLabel="Gradly Links"
                title="The useful kind of short story."
                description="An internal Rebrandly alternative with a custom Gradly domain—built in-house to manage branded short links and save the company about $400 a month."
                meta="Internal Tool · Custom Domains · Engineering"
                tone="blue"
              >
                <DataVisual />
              </ProjectShowcase>
            </div>
            <ProjectShowcase
              label="Project 04 — AI Claims Adjudication"
              linkLabel="AI Claims Adjudication"
              links={[
                {
                  href: "https://www.loom.com/share/b30c16086f2848efa91a0098af48d74c",
                  label: "Watch demo",
                  icon: "demo",
                },
              ]}
              title={
                <>
                  Upload the bill.
                  <br />
                  We’ll handle the rest.
                </>
              }
              description="Upload a medical bill and bank details. The app checks eligibility, sends the reimbursement by ACH, and confirms it by email—payment lands in 1–2 business days."
              meta="AI · Automation · Payments"
              tone="yellow"
            >
              <ClaimsVisual />
            </ProjectShowcase>

            {/*
            <ProjectShowcase
              label="Project 04 — Experiments"
              linkLabel="Experiments"
              title={
                <>
                  Things I built because
                  <br />
                  “someone should make this.”
                </>
              }
              description="Small tools, automations, experiments, and occasionally questionable ideas that made it far enough to become software."
              meta="Ongoing · Playground"
              tone="yellow"
            >
              <PlaygroundVisual />
            </ProjectShowcase>
            */}
          </div>
        </div>
      </section>

      <section
        className="about-section chapter chapter-cobalt scallop-top"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="shell about-grid">
          <div className="about-mark">
            <Asterisk />
          </div>
          <div className="about-copy">
            <p className="eyebrow">02 / About</p>
            <h2 id="about-title">
              Engineer on paper. <em>Problem solver</em> in practice.
            </h2>
            <div className="about-body">
              <div className="about-passage">
                <p>I’m at my best when the problem is messy.</p>
                <p>
                  Incomplete requirements. Bad documentation. Too many people
                  involved. Nobody quite knows the answer. And somehow, it still
                  needs to ship Friday.
                </p>
                <p className="about-beat">Good.</p>
              </div>
              <div className="about-passage">
                <p>
                  Give me half the context and I’ll find the other half. I’ll
                  read the code, talk to the user, ask questions, and pull at
                  threads until the problem makes sense.
                </p>
              </div>
              <div className="about-passage">
                <p>
                  That mentality took me beyond engineering — into product,
                  operations, customer experience, partnerships, and strategy.
                </p>
                <p>
                  I kept picking up problems until my job title had to catch up.
                </p>
                <p>The titles changed.</p>
                <p>The job didn’t.</p>
                <p className="about-beat">
                  <strong>Figure it out.</strong>
                </p>
              </div>
              <div className="about-passage">
                <p>Software just happens to be my favorite form of leverage.</p>
                <p>
                  If it’s repetitive, automate it. If the process is broken,
                  rebuild it. If everyone’s solving the symptom, find the actual
                  problem.
                </p>
                <p>And if nobody quite knows how to do that yet?</p>
                <p className="about-beat">
                  <strong>Now you have my attention.</strong>
                </p>
              </div>
            </div>
            <a
              className="about-resume-link"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View résumé <span>PDF</span> <ArrowUpRight />
            </a>
          </div>
          <aside className="about-side">
            <div>
              <span>BASED IN</span>
              <strong>India ↗</strong>
            </div>
            <div>
              <span>WORKS ACROSS</span>
              <strong>Engineering, Product, Operations</strong>
            </div>
            <div>
              <span>GOOD AT</span>
              <strong>Ambiguity, Automation, Getting Things Shipped</strong>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="experience-section chapter chapter-butter scallop-top"
        aria-labelledby="experience-title"
      >
        <div className="shell">
          <SectionHeading
            id="experience-title"
            eyebrow="03 / Experience"
            title="I kept picking up problems until my job title had to catch up."
          />
          <div className="experience-list">
            {experience.map(({ period, role, company, description }) => (
              <div className="experience-row" key={period}>
                <span className="experience-period">{period}</span>
                <div className="experience-role">
                  <h3>{role}</h3>
                  <p>{company}</p>
                </div>
                <p className="experience-description">{description}</p>
              </div>
            ))}
          </div>
          <div className="experience-mark" aria-hidden="true">
            ✦
          </div>
        </div>
      </section>

      <section
        className="now-section chapter chapter-coral scallop-top"
        aria-labelledby="now-title"
      >
        <div className="now-card shell">
          <div className="now-orbit">
            <span>✦</span>
            <i />
            <i />
          </div>
          <div className="now-copy">
            <p className="eyebrow">04 / Right now</p>
            <h2 id="now-title">
              Currently building, learning &amp; following{" "}
              <em>whatever looks useful.</em>
            </h2>
          </div>
          <ul>
            <li>
              <span>01</span>
              <strong>Automating work that has no business being manual</strong>
            </li>
            <li>
              <span>02</span>
              <strong>AI that works outside the demo</strong>
            </li>
            <li>
              <span>03</span>
              <strong>VisaFile — scratching another itch</strong>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="notes-section chapter chapter-paper scallop-top"
        id="notes"
        aria-labelledby="notes-title"
      >
        <div className="shell notes-inner">
          <SectionHeading
            id="notes-title"
            eyebrow="05 / Notes"
            title="Opinions, loosely organized."
            aside="Things I’ve learned from building software, breaking software, fixing operations, talking to users, and occasionally doing things the hard way."
          />
          <div className="notes-list">
            {notes.map(([title, description, time], index) => (
              <a className="note-row" href="#contact" key={title}>
                <span className="note-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="note-time">{time} read</span>
                <span className="note-arrow">
                  <ArrowUpRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="contact-section chapter chapter-blue scallop-top"
        id="contact"
      >
        <div className="shell contact-inner">
          <p className="eyebrow">06 / Say hello</p>
          <h2>
            Got a hard problem?
            <br />
            <em>
              Even better if you’re
              <br />
              not sure how to solve it.
            </em>
          </h2>
          <a
            className="contact-button"
            href="mailto:hello.animeshsharma@gmail.com"
          >
            hello.animeshsharma@gmail.com <ArrowUpRight />
          </a>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Animesh</span>
            <div>
              <a
                href="https://www.linkedin.com/in/animeshsharma42"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/animesh-algorithm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://x.com/animesh_algo"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            </div>
            <a className="consulting-link" href="#top">
              Looking for professional project help? <span>Work with me ↗</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
