import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
  visual: "ai" | "web" | "compiler" | "algorithms";
}

const projects: Project[] = [
  {
    id: "eagles-construct-ai",
    name: "Eagles Construct AI",
    description: "AI-assisted construction technology concept",
    longDescription: "A platform combining AI, construction planning, and automation. It helps with budget-aware decision making, architectural ideas, quantity surveying workflows, material planning, supplier discovery, and price comparison — all aimed at reducing material wastage and connecting construction stakeholders.",
    category: "AI & Automation",
    tags: ["Go", "AI", "Automation", "Construction Tech", "API Design"],
    links: {
      github: "#",
      demo: "#",
    },
    visual: "ai",
  },
  {
    id: "chemichemi",
    name: "Chemichemi",
    description: "Environmental and water technology project",
    longDescription: "A web application focused on water-related information and environmental technology. Built with a Go backend and a modern frontend, with deployment as part of the project goals.",
    category: "Web Application",
    tags: ["Go", "Web App", "Environmental Tech", "Deployment"],
    links: {
      github: "#",
      demo: "#",
    },
    visual: "web",
  },
  {
    id: "forum-app",
    name: "Forum Application",
    description: "Full-stack forum with authentication",
    longDescription: "A web-based forum application built with Go, featuring user authentication, posts, comments, and a SQLite database. Demonstrates practical backend development, HTML templates, and social/forum functionality.",
    category: "Web Application",
    tags: ["Go", "SQLite", "HTML Templates", "Authentication", "CRUD"],
    links: {
      github: "#",
      demo: "#",
    },
    visual: "web",
  },
  {
    id: "micro-template-compiler",
    name: "Micro-Template Compiler",
    description: "Mini template engine in Go",
    longDescription: "A small template compiler built in Go. Explores string processing, rune handling, parsing techniques, and template rendering — a hands-on look at compiler concepts applied to text templating.",
    category: "Tooling & Libraries",
    tags: ["Go", "String Processing", "Runes", "Parsing", "Templates"],
    links: {
      github: "#",
    },
    visual: "compiler",
  },
  {
    id: "push-swap",
    name: "Push-swap",
    description: "Algorithmic sorting challenge",
    longDescription: "An algorithmic project implementing stack operations and sorting. Focuses on data structures, optimization, and understanding the trade-offs involved in different sorting approaches.",
    category: "Algorithms",
    tags: ["Go", "Algorithms", "Data Structures", "Stacks", "Sorting"],
    links: {
      github: "#",
    },
    visual: "algorithms",
  },
];

function ProjectVisual({ type }: { type: Project["visual"] }) {
  switch (type) {
    case "ai":
      return (
        <div className="p-6 rounded-xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20">
          {/* Abstract AI visualization - connected nodes */}
          <svg
            viewBox="0 0 200 120"
            className="w-full h-24"
            aria-hidden="true"
          >
            {/* Central node */}
            <circle cx="100" cy="60" r="12" fill="var(--color-accent-blue)" className="animate-pulse" style={{ animationDuration: "3s" }} />
            {/* Connected nodes */}
            <circle cx="40" cy="20" r="6" fill="var(--color-blue-500)" />
            <circle cx="160" cy="20" r="6" fill="var(--color-blue-500)" />
            <circle cx="30" cy="90" r="5" fill="var(--color-accent-blue-light)" />
            <circle cx="170" cy="90" r="5" fill="var(--color-accent-blue-light)" />
            <circle cx="60" cy="40" r="4" fill="var(--color-text-muted)" />
            <circle cx="140" cy="40" r="4" fill="var(--color-text-muted)" />
            {/* Connections */}
            <line x1="100" y1="60" x2="40" y2="20" stroke="var(--color-accent-blue)" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="60" x2="160" y2="20" stroke="var(--color-accent-blue)" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="60" x2="30" y2="90" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.3" />
            <line x1="100" y1="60" x2="170" y2="90" stroke="var(--color-accent-blue)" strokeWidth="1" opacity="0.3" />
            <line x1="40" y1="20" x2="30" y2="90" stroke="var(--color-blue-500)" strokeWidth="0.5" opacity="0.3" />
            <line x1="160" y1="20" x2="170" y2="90" stroke="var(--color-blue-500)" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-muted)]">
            AI · CONNECTED
          </div>
        </div>
      );

    case "web":
      return (
        <div className="p-6 rounded-xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20">
          {/* Browser mockup */}
          <svg
            viewBox="0 0 200 120"
            className="w-full h-24"
            aria-hidden="true"
          >
            {/* Browser frame */}
            <rect x="10" y="10" width="180" height="100" rx="4" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
            {/* Title bar */}
            <rect x="10" y="10" width="180" height="16" rx="4" fill="var(--color-bg-card)" />
            <circle cx="22" cy="18" r="3" fill="var(--color-accent-red)" />
            <circle cx="32" cy="18" r="3" fill="var(--color-blue-400)" />
            <circle cx="42" cy="18" r="3" fill="var(--color-accent-green)" />
            {/* Content blocks */}
            <rect x="25" y="40" width="60" height="12" rx="2" fill="var(--color-accent-blue)" opacity="0.6" />
            <rect x="25" y="60" width="150" height="8" rx="2" fill="var(--color-border)" />
            <rect x="25" y="75" width="120" height="8" rx="2" fill="var(--color-border)" />
            <rect x="25" y="90" width="40" height="6" rx="2" fill="var(--color-blue-400)" opacity="0.6" />
          </svg>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-muted)]">
            WEB · RESPONSIVE
          </div>
        </div>
      );

    case "compiler":
      return (
        <div className="p-6 rounded-xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20 font-mono text-xs" aria-hidden="true">
          <div className="text-[var(--color-accent-green)]">$</div>
          <div className="text-[var(--color-text-primary)]"> micro-templ source.tpl --output result.html</div>
          <div className="mt-2 text-[var(--color-text-muted)]">
            <span className="text-[var(--color-blue-400)]">Parsing</span> template tokens...
          </div>
          <div className="text-[var(--color-text-muted)]">
            <span className="text-[var(--color-accent-blue)]">Processing</span> runes...
          </div>
          <div className="text-[var(--color-text-muted)]">
            <span className="text-[var(--color-accent-green)]">Rendering</span> output...
          </div>
          <div className="mt-2 text-[var(--color-accent-green)]">✓ Compiled successfully</div>
        </div>
      );

    case "algorithms":
      return (
        <div className="p-6 rounded-xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20">
          {/* Stack visualization */}
          <svg
            viewBox="0 0 200 120"
            className="w-full h-24"
            aria-hidden="true"
          >
            {/* Stack A */}
            <rect x="30" y="20" width="15" height="15" fill="var(--color-accent-blue)" />
            <rect x="30" y="38" width="15" height="15" fill="var(--color-accent-blue)" opacity="0.8" />
            <rect x="30" y="56" width="15" height="15" fill="var(--color-accent-blue)" opacity="0.6" />
            <rect x="30" y="74" width="15" height="15" fill="var(--color-accent-blue)" opacity="0.4" />
            <text x="37" y="105" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">A</text>
            {/* Stack B */}
            <rect x="155" y="60" width="15" height="15" fill="var(--color-blue-500)" />
            <rect x="155" y="78" width="15" height="15" fill="var(--color-blue-500)" opacity="0.8" />
            <text x="162" y="105" textAnchor="middle" fill="var(--color-text-muted)" fontSize="10">B</text>
            {/* Arrow */}
            <path d="M 48 60 Q 92 40 150 65" fill="none" stroke="var(--color-accent-blue)" strokeWidth="1" strokeDasharray="4 2" />
            <text x="100" y="35" textAnchor="middle" fill="var(--color-text-muted)" fontSize="8">swap</text>
          </svg>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-muted)]">
            ALGORITHMS · OPTIMIZATION
          </div>
        </div>
      );

    default:
      return null;
  }
}

function ProjectCard({ project }: { project: Project }) {
  const isFeatured = project.featured;

  return (
    <article
      className={`group relative flex flex-col ${
        isFeatured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Card background */}
      <div
        className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
          isFeatured
            ? "bg-[var(--color-blue-500)]/5 border-[var(--color-blue-500)]/30 shadow-xl shadow-[var(--color-blue-500)]/5 card-hover"
            : "bg-[var(--color-blue-500)]/5 border-[var(--color-blue-500)]/20 card-hover"
        }`}
      >
        {/* Visual area */}
        <div
          className={`relative ${isFeatured ? "h-64 sm:h-80" : "h-48 sm:h-56"} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[var(--color-bg-tertiary)]" />
          <ProjectVisual type={project.visual} />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 text-xs font-medium rounded bg-[var(--color-bg-primary)]/80 backdrop-blur-sm text-[var(--color-text-secondary)] border border-[var(--color-border)]">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-blue-500)] text-white">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-blue-light)] transition-colors">
            {project.name}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm mb-4">
            {project.description}
          </p>

          <p className={`text-[var(--color-text-secondary)] leading-relaxed ${isFeatured ? "text-base" : ""}`}>
            {project.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, isFeatured ? undefined : 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono rounded bg-[var(--color-blue-500)]/5 text-[var(--color-text-muted)] border border-[var(--color-blue-500)]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-auto pt-6">
            {project.links.github && (
              <a
                href={project.links.github}
                className="text-sm text-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue-light)] transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Code
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="text-sm text-[var(--color-blue-400)] hover:text-[var(--color-blue-300)] transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            <button
              type="button"
              className="btn btn-primary text-sm px-4 py-2 ml-auto"
              aria-label={`View more about ${project.name}`}
            >
              View Project
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 lg:py-32 relative">


      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[var(--color-blue-500)] text-sm font-medium tracking-widest uppercase font-mono">
              Selected Work
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 text-[var(--color-text-primary)]">
              Projects I&apos;ve built
            </h2>
            <div className="accent-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-base sm:text-lg font-mono text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              Each project represents a specific challenge I enjoyed solving — from AI-assisted platforms to
              algorithmic problems and full-stack web applications.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured project grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 100}
              className={project.featured ? "lg:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link href="#contact" className="btn btn-secondary text-base px-8 py-3">
            Want to build something together?
          </Link>
        </div>
      </div>
    </section>
  );
}
