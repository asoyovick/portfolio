/**
 * CV content — edit this file to update the resume.
 * The page renders these structures directly; no database involved.
 * To offer a PDF, drop it in `public/cv/Victor-Ouma-CV.pdf` — the
 * Download button links to it automatically.
 */

export const cvProfile = {
  name: "Victor Ouma",
  role: "Software Developer",
  email: "oumaasoyoh@gmail.com",
  phone: "0799619641",
  phoneHref: "tel:+254799619641",
  github: "https://github.com/oumaasoyoh-hue",
  githubHandle: "oumaasoyoh-hue",
  linkedin: "https://linkedin.com/in/victor-ouma-4b1b0a304",
  summary:
    "Software developer focused on backend and full-stack development. Experienced with Go, SQL, Next.js, Tailwind CSS, PostgreSQL, Docker, Git, and Linux. Build practical applications through project-based development, with current work focused on APIs, authentication, databases, and software architecture.",
};

export interface CVExperience {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export const cvExperience: CVExperience[] = [
  {
    role: "Apprentice Developer",
    organization: "Zone01 Kisumu",
    period: "Present",
    bullets: [
      "Develop software through intensive project-based learning using Go, Git, algorithms, and data structures.",
      "Debug, test, document, and improve software collaboratively.",
    ],
  },
];

export interface CVEducation {
  qualification: string;
  institution: string;
  period: string;
  detail?: string;
}

export const cvEducation: CVEducation[] = [
  {
    qualification: "BSc. Computer Science",
    institution: "Maseno University",
    period: "2023 — Present",
  },
];

export const cvSkills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Go", "SQL"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Go", "Gin", "REST APIs", "JWT"],
  },
  {
    group: "Database",
    items: ["PostgreSQL"],
  },
  {
    group: "Tools",
    items: ["Git", "Gitea", "Docker", "Linux", "VS Code"],
  },
  {
    group: "Concepts",
    items: [
      "Data Structures",
      "Algorithms",
      "API Design",
      "Authentication",
      "Database Design",
    ],
  },
];

export interface CVProject {
  name: string;
  tagline: string;
  stack: string[];
  bullets: string[];
}

export const cvProjects: CVProject[] = [
  {
    name: "VECAI",
    tagline: "Construction Technology Platform",
    stack: ["Go", "Gin", "PostgreSQL", "Next.js", "Docker"],
    bullets: [
      "Developing authentication, database models, REST APIs, and backend architecture.",
      "Designed workflows for projects, architects, quantity surveyors, suppliers, quotations, BOQs, and timelines.",
    ],
  },
  {
    name: "LEM-IN",
    tagline: "Ant Colony Pathfinding",
    stack: ["Go", "Graph Algorithms", "Data Structures"],
    bullets: [
      "Built a pathfinding program that parses ant-farm maps and determines efficient routes through a graph.",
      "Implemented graph traversal and pathfinding logic while handling rooms, tunnels, ants, and movement constraints.",
      "Applied algorithmic problem-solving, data structures, testing, and debugging in Go.",
    ],
  },
];

export const cvCertifications: { name: string; issuer: string; year: string }[] =
  [];
