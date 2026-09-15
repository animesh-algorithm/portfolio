# AGENTS.md

## Project

This is my personal portfolio: a place to showcase what I build and establish my professional identity across software engineering, product engineering, AI, and automation.

The portfolio should optimize for:

- showcasing real work and engineering ability
- networking with engineers, founders, recruiters, and collaborators
- career and collaboration opportunities
- subtly directing professional inquiries to a separate consulting/freelance site

This is **not an agency or freelance sales website**. The work should establish credibility without aggressive selling.

## Design

Use **Arc Browser's website design language as the primary visual inspiration**.

Take inspiration from its:

- expressive typography
- editorial layouts
- strong visual hierarchy
- generous whitespace
- bold but intentional color
- large product imagery
- asymmetric compositions
- playful details
- polished interactions and motion
- balance of simplicity and personality

Do not clone Arc's layouts, assets, graphics, or copy. Translate its design principles into an original portfolio.

Oscar Health and similarly art-directed product websites can be secondary references.

The site should feel like a **well-designed product website centered around a person and their work**, not a developer portfolio template.

Avoid generic developer aesthetics such as glowing gradients, excessive glassmorphism, skill bars, technology-logo walls, terminal intros, floating icons, excessive badges, and repetitive card grids.

## Content

Keep writing concise, specific, confident, understated, and human.

Show capability through the work rather than claims.

Prefer:

> Built X to solve Y.

over:

> Passionate engineer building innovative digital experiences.

Projects should explain what was built, why it exists, my role, interesting engineering/product decisions, constraints, and outcomes where available.

Technology should support the story, not become the story.

Never invent accomplishments, metrics, testimonials, project details, or links.

## Project Presentation

Projects are the centerpiece.

Prefer visual storytelling using:

- large screenshots
- product UI
- demos
- diagrams
- strong typography
- concise explanations

Avoid reducing every project to `card + description + tech badges`.

Important projects can have immersive, editorial-style case studies.

## Engineering

Follow the existing architecture and conventions before introducing new patterns.

Keep code:

- simple
- typed
- maintainable
- reusable where genuinely useful
- appropriately componentized

Avoid giant files and components. If a file approaches roughly 300–500 lines, consider whether responsibilities should be separated.

Do not abstract prematurely or install dependencies for functionality that can reasonably use existing tools.

Prefer Server Components in Next.js unless client-side behavior is required. Keep `"use client"` boundaries small.

Use descriptive names and avoid `any` unless genuinely necessary.

## UI

Use the existing design system and tokens consistently.

Every interface must work intentionally across mobile, tablet, laptop, and large desktop.

Use semantic HTML, accessible interactions, visible focus states, appropriate labels, sufficient contrast, and meaningful alt text.

Motion should reinforce hierarchy or interaction, not exist for decoration. Respect `prefers-reduced-motion`.

Prioritize performance. Be careful with images, video, fonts, third-party scripts, animation libraries, and unnecessary client-side JavaScript.

## Agent Workflow

Before editing:

1. Inspect the existing implementation.
2. Understand nearby patterns and components.
3. Make the smallest coherent change.
4. Reuse existing primitives where appropriate.
5. Avoid unrelated refactors.

When implementing UI, think about visual hierarchy and composition rather than mechanically assembling components.

When given a visual reference, extract its design principles instead of blindly copying it.

Do not replace intentional existing design decisions unless the task requires it.

For small ambiguities, use good judgment. Ask before making consequential architectural or product decisions.

## Quality

Before considering work complete:

- check responsive behavior
- check accessibility
- run linting
- run type checking
- run relevant tests
- verify the production build when practical
- remove dead code introduced by the change

Do not silence errors simply to make checks pass.

The final result should not merely work. It should feel intentional, polished, fast, and consistent with the rest of the portfolio.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
