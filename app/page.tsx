import { ArrowUpRight, Asterisk, ChatBubble, Spark } from "@/components/icons";
import { AskAnimeshLink } from "@/components/ask-animesh";
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
import {
  experience,
  notes,
  profile,
  projects,
  workCopy,
} from "@/content/profile";
import { connection } from "next/server";

function randomOption<const Options extends readonly string[]>(
  options: Options,
) {
  return options[Math.floor(Math.random() * options.length)];
}

export default async function Home() {
  await connection();

  const workHeadline = randomOption(workCopy.headlines);
  const workEyebrow = randomOption(workCopy.eyebrows);
  const workDescription = randomOption(workCopy.descriptions);
  const [visaFile, concierge, gradlyLinks, claims] = projects;

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
          <div className="hero-intro">
            <p>
              Engineer, product person, automation obsessive, and professional{" "}
              <strong className="hero-quote">
                “give it to Animesh, he’ll figure it out”
              </strong>{" "}
              person.
            </p>
            <AskAnimeshLink className="hero-ask-link ask-cta-button">
              <ChatBubble /> Ask me anything
            </AskAnimeshLink>
          </div>
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
              label={`Project 01 — ${visaFile.name}`}
              linkLabel={visaFile.name}
              links={visaFile.links}
              title={visaFile.title}
              description={visaFile.description}
              meta={visaFile.meta}
              tone={visaFile.tone}
              featured={visaFile.featured}
            >
              <VisaFlowVisual />
            </ProjectShowcase>
            <div className="project-pair">
              <ProjectShowcase
                label={`Project 02 — ${concierge.name}`}
                linkLabel={concierge.name}
                links={concierge.links}
                title={concierge.title}
                description={concierge.description}
                meta={concierge.meta}
                tone={concierge.tone}
              >
                <StudioVisual />
              </ProjectShowcase>
              <ProjectShowcase
                label={`Project 03 — ${gradlyLinks.name}`}
                linkLabel={gradlyLinks.name}
                links={gradlyLinks.links}
                title={gradlyLinks.title}
                description={gradlyLinks.description}
                meta={gradlyLinks.meta}
                tone={gradlyLinks.tone}
              >
                <DataVisual />
              </ProjectShowcase>
            </div>
            <ProjectShowcase
              label={`Project 04 — ${claims.name}`}
              linkLabel={claims.name}
              links={claims.links}
              title={
                <>
                  Upload the bill.
                  <br />
                  We’ll handle the rest.
                </>
              }
              description={claims.description}
              meta={claims.meta}
              tone={claims.tone}
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
          <div className="work-ask-cta">
            <p>You’ve seen the work. Ask for the story.</p>
            <AskAnimeshLink className="ask-cta-button ask-cta-dark">
              <ChatBubble /> Ask about a project
            </AskAnimeshLink>
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
              {profile.biography.map(({ paragraphs, beat, strongBeat }) => (
                <div className="about-passage" key={paragraphs[0]}>
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {beat ? (
                    <p className="about-beat">
                      {strongBeat ? <strong>{beat}</strong> : beat}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="about-actions">
              <AskAnimeshLink className="about-ask-link ask-cta-button">
                <ChatBubble /> Know more about me
              </AskAnimeshLink>
              <a
                className="about-resume-link"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <span>PDF</span> <ArrowUpRight />
              </a>
            </div>
          </div>
          <aside className="about-side">
            <div>
              <span>BASED IN</span>
              <strong>{profile.location} ↗</strong>
            </div>
            <div>
              <span>WORKS ACROSS</span>
              <strong>{profile.worksAcross.join(", ")}</strong>
            </div>
            <div>
              <span>GOOD AT</span>
              <strong>{profile.strengths.join(", ")}</strong>
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
            {profile.current.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </li>
            ))}
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
            {notes.map(({ title, description, readingTime }, index) => (
              <a className="note-row" href="#contact" key={title}>
                <span className="note-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="note-time">{readingTime} read</span>
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
          <a className="contact-button" href={`mailto:${profile.email}`}>
            {profile.email} <ArrowUpRight />
          </a>
          <div className="footer-ask-cta">
            <p>Still have questions?</p>
            <AskAnimeshLink className="ask-cta-button ask-cta-light">
              <ChatBubble /> Ask Animesh
            </AskAnimeshLink>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Animesh Sharma</span>
            <div>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={profile.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
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
