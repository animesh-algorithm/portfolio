export type KnowledgeCategory = "profile" | "work" | "resume";

export interface KnowledgeSource {
  id: string;
  title: string;
  category: KnowledgeCategory;
  sourceUrl: string;
  updatedAt: string;
  visibility: "public";
  file: string;
  sourcePdf?: string;
  sourcePdfSha256?: string;
}

export const knowledgeManifest: readonly KnowledgeSource[] = [
  {
    id: "profile",
    title: "Animesh public profile",
    category: "profile",
    sourceUrl: "/#about",
    updatedAt: "2026-09-16",
    visibility: "public",
    file: "profile.md",
  },
  {
    id: "selected-work",
    title: "Selected work",
    category: "work",
    sourceUrl: "/#work",
    updatedAt: "2026-09-16",
    visibility: "public",
    file: "selected-work.md",
  },
  {
    id: "resume",
    title: "Public résumé",
    category: "resume",
    sourceUrl: "/resume.pdf",
    updatedAt: "2026-09-16",
    visibility: "public",
    file: "resume.md",
    sourcePdf: "public/resume.pdf",
    sourcePdfSha256:
      "adc009d781128879736b0a47e4d9622545124c4d1f4a01fea231e574a57ffa65",
  },
];
