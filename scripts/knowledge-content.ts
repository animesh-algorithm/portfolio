import { experience, profile, projects } from "../content/profile";

export function renderProfileKnowledge() {
  const biography = profile.biography
    .flatMap((section) => [...section.paragraphs, section.beat].filter(Boolean))
    .join("\n\n");
  return `# Animesh public profile

Animesh Sharma is based in ${profile.location}. He works across ${profile.worksAcross.join(", ")}. He describes himself as ${profile.headline.toLowerCase()}

${biography}

## Current interests

${profile.current.map((item) => `- ${item}`).join("\n")}

## Public contact

Email: ${profile.email}

- LinkedIn: ${profile.links.linkedin}
- GitHub: ${profile.links.github}
- X: ${profile.links.twitter}
`;
}

export function renderSelectedWorkKnowledge() {
  const work = projects
    .map(
      (project) => `## ${project.name}

${project.description}

Focus: ${project.meta}.${
        project.links.length
          ? `\n\nPublic links:\n${project.links.map((link) => `- ${link.label}: ${link.href}`).join("\n")}`
          : ""
      }`,
    )
    .join("\n\n");
  const roles = experience
    .map(
      (item) =>
        `- ${item.period}: ${item.role} at ${item.company}. ${item.description}`,
    )
    .join("\n");
  return `# Selected work

${work}

# Public website experience summary

${roles}
`;
}

export const generatedKnowledge = {
  "profile.md": renderProfileKnowledge(),
  "selected-work.md": renderSelectedWorkKnowledge(),
} as const;
