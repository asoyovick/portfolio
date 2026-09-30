/**
 * CV content — edit this file to update the resume.
 * The page renders these structures directly; no database involved.
 * To offer a PDF, drop it in `public/cv/Victor-Ouma-CV.pdf` — the
 * Download button links to it automatically.
 */

export const cvProfile = {
  name: "Victor Ouma",
  role: "Software · AI · Backend Developer",
  location: "Kisumu, Kenya",
  email: "oumaasoyoh@gmail.com",
  github: "https://github.com/asoyovick",
  githubHandle: "@asoyovick",
  linkedin: "https://linkedin.com/in/victorouma",
  summary:
    "Developer and builder focused on backend systems, practical AI and security-minded engineering. I learn by shipping: Go services, APIs and products like VECAI and Chemichemi, built for real-world constraints rather than demo conditions.",
};

export interface CVExperience {
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const cvExperience: CVExperience[] = [
  {
    role: "Independent Developer & Builder",
    organization: "VECAI / Chemichemi",
    startDate: "2025",
    endDate: "Present",
    description:
      "Designing and building AI-powered construction intelligence (VECAI) and a community water information and alerting system (Chemichemi) — Go APIs, data pipelines and product surfaces.",
  },
  {
    role: "Peer-driven Software Training",
    organization: "Zone01 Kisumu",
    startDate: "2023",
    endDate: "2025",
    description:
      "Intensive project-based training in Go: algorithms, web forums with SQLite, system programming and peer design reviews. Built and shipped a dozen evaluated projects.",
  },
  {
    role: "Freelance & Community Projects",
    organization: "Kenya",
    startDate: "2022",
    endDate: "2023",
    description:
      "Small websites, tooling and automation for local clients and community initiatives — first exposure to shipping for real users.",
  },
];

export interface CVEducation {
  qualification: string;
  institution: string;
  period: string;
  detail: string;
}

export const cvEducation: CVEducation[] = [
  {
    qualification: "Software Engineering Program",
    institution: "Zone01 Kisumu",
    period: "2023 — 2025",
    detail:
      "Peer-driven, project-based curriculum: Go, algorithms, backend systems, databases and security fundamentals.",
  },
  {
    qualification: "Kenya Certificate of Secondary Education",
    institution: "Kenya",
    period: "2018 — 2022",
    detail: "Sciences and mathematics; first contact with programming.",
  },
];

export const cvSkills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Go", "TypeScript", "JavaScript", "SQL", "Python (basics)"],
  },
  {
    group: "Backend",
    items: [
      "REST APIs",
      "Auth & sessions",
      "SQLite / Postgres",
      "WebSockets",
      "System design",
    ],
  },
  {
    group: "AI & Data",
    items: ["Applied LLMs", "Data pipelines", "Model integration"],
  },
  {
    group: "Security",
    items: [
      "Secure coding",
      "Threat modelling",
      "Password hashing (bcrypt)",
      "Input validation",
    ],
  },
  {
    group: "Tooling",
    items: ["Git", "Linux", "Docker (basics)", "CI basics", "Next.js"],
  },
];

export interface CVProject {
  name: string;
  description: string;
  stack: string[];
}

export const cvProjects: CVProject[] = [
  {
    name: "VECAI",
    description:
      "AI-powered construction intelligence platform — planning, monitoring and site workflows.",
    stack: ["Go", "AI", "Construction"],
  },
  {
    name: "Chemichemi",
    description:
      "Community water information and alerting system built for low-connectivity environments.",
    stack: ["Go", "APIs", "Systems"],
  },
  {
    name: "Forum",
    description:
      "Go-based discussion platform with sessions, secure auth and SQLite storage.",
    stack: ["Go", "SQLite", "Web"],
  },
  {
    name: "Lem-in",
    description:
      "Graph pathfinding project: routing flows through constrained networks.",
    stack: ["Go", "Algorithms", "Graphs"],
  },
];

export const cvCertifications: { name: string; issuer: string; year: string }[] =
  [
    {
      name: "Zone01 Kisumu — Software Engineering Track",
      issuer: "Zone01",
      year: "2025",
    },
    {
      name: "Cybersecurity Fundamentals (self-directed)",
      issuer: "Self-study",
      year: "2024",
    },
  ];
