/**
 * Content configuration — the single source of truth for site copy.
 * Update text and links here; components only render it.
 */

export const site = {
  name: "Victor Ouma",
  tagline: "Software · AI · Backend · Cybersecurity",
  description:
    "Victor Ouma builds software, AI applications and secure systems for real-world problems.",
  /** Real links only. Email was already used in the repo; GitHub/LinkedIn point at the existing handles. */
  email: "oumaasoyoh@gmail.com",
  github: "https://github.com/asoyovick",
  githubHandle: "@asoyovick",
  linkedin: "https://linkedin.com/in/victorouma",
} as const;

export const whatIBuild = [
  {
    index: "01",
    title: "Software",
    description:
      "Backend systems, APIs and digital products built from the ground up.",
  },
  {
    index: "02",
    title: "AI",
    description:
      "Practical AI applications designed around real problems, not hype.",
  },
  {
    index: "03",
    title: "Cybersecurity",
    description:
      "Building with security in mind and exploring ways to identify and prevent risks.",
  },
  {
    index: "04",
    title: "Digital Products",
    description: "From idea to working software. Simple, useful, impactful.",
  },
];

export const howIThink = [
  { index: "01", title: "Problem", description: "Understand the real challenge." },
  { index: "02", title: "Research", description: "Explore, learn, ask better questions." },
  { index: "03", title: "Design", description: "Plan the architecture and approach." },
  { index: "04", title: "Build", description: "Turn ideas into code." },
  { index: "05", title: "Improve", description: "Test, iterate, make it better." },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  image?: string;
  /** Photo credit shown as alt context; undefined → no photo credit. */
  kind: "app" | "algorithm" | "system";
}

export const selectedWork: Project[] = [
  {
    id: "vecai",
    name: "VECAI",
    description: "AI-powered construction intelligence.",
    stack: ["Go", "AI", "Construction"],
    image: "/vecai.png",
    kind: "system",
  },
  {
    id: "lem-in",
    name: "Lem-in",
    description:
      "A graph and pathfinding project focused on algorithmic problem solving.",
    stack: ["Go", "Algorithms", "Graphs"],
    kind: "algorithm",
  },
  {
    id: "chemichemi",
    name: "Chemichemi",
    description:
      "A technology project focused on water/community information and alerts.",
    stack: ["Go", "APIs", "Systems"],
    image: "/chemichemi.jpeg",
    kind: "system",
  },
  {
    id: "forum",
    name: "Forum",
    description: "A Go-based social discussion platform.",
    stack: ["Go", "SQLite", "Web"],
    image: "/forum.jpeg",
    kind: "app",
  },
];

export const thinkingTopics = [
  "Building backend systems with Go",
  "AI applications",
  "Software architecture",
  "Cybersecurity",
  "Learning through projects",
];

export const aboutTimeline = [
  { title: "Learning programming", detail: "First language, first programs" },
  { title: "Zone01 Kisumu", detail: "Peer-driven training in Go" },
  { title: "Building with Go", detail: "APIs, CLIs and system projects" },
  { title: "Backend engineering", detail: "Auth, databases, architecture" },
  { title: "AI experimentation", detail: "AI applied to real workflows" },
  { title: "Building real products", detail: "VECAI and Chemichemi" },
  { title: "What's next?", detail: "Open to projects and collaborations" },
];

export const drivesList = [
  "AI",
  "Software",
  "Africa",
  "Cybersecurity",
  "Sustainability",
];
