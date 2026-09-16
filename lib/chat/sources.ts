import type { ChatSource } from "./types";

const trustedSources: Record<string, ChatSource> = {
  "profile.md": { id: "profile", label: "Profile note", href: "/#about" },
  "selected-work.md": { id: "website", label: "Website", href: "/#work" },
  "resume.md": { id: "resume", label: "Résumé", href: "/resume.pdf" },
};

export function mapTrustedSources(filenames: readonly string[]) {
  const mapped = filenames
    .map((filename) => trustedSources[filename])
    .filter((source): source is ChatSource => Boolean(source));
  return [...new Map(mapped.map((source) => [source.id, source])).values()];
}
