/**
 * Articles content — edit this file to publish or update articles.
 * Add an object to `articles` and it appears on /articles with its own
 * page at /articles/{slug}. Content is plain markdown-ish text: paragraphs,
 * `## headings`, `- lists` and `1. lists` are rendered by the article page.
 */

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** ISO date, e.g. "2026-09-30". */
  date: string;
  category: string;
  tags: string[];
  /** Optional path under `public/`. */
  coverImage?: string;
  /** Human-readable, e.g. "6 min read". */
  readingTime: string;
}

export const articles: Article[] = [
  {
    title: "Building Backend Systems With Go",
    slug: "building-backend-systems-with-go",
    excerpt: "My experience building backend systems with Go, from CLIs to full APIs.",
    content: `Go has become my default language for backend work, and the reasons are practical rather than fashionable.

## Why Go works for backends

The standard library covers most of what a backend needs: an HTTP server, JSON handling, timeouts and context. You can build a complete, production-shaped API without a framework, which means fewer surprises when something breaks.

- Compilation is fast enough that tests stay in the feedback loop.
- Goroutines and channels make concurrency part of the language, not an add-on.
- The type system is small but strict, so refactors become mechanical instead of risky.

## Structuring a service

I keep a simple shape: handlers parse and validate, services hold the actual rules, and storage sits behind a small interface. When storage is SQLite for a prototype or Postgres for production, the rest of the code doesn't change.

1. Define the domain types first.
2. Write the service functions against interfaces.
3. Wire real implementations in main.

## Ship boring, reliable services

Contexts should cross every network call, errors should carry context when they bubble up, and the boring solution usually ships first. Go rewards exactly that kind of restraint, and that's why it stays my pick for backend systems.`,
    date: "2026-09-30",
    category: "Backend",
    tags: ["Go", "Backend", "Architecture"],
    coverImage: "/vecai.png",
    readingTime: "6 min read",
  },
  {
    title: "AI in Construction: What VECAI Taught Me",
    slug: "ai-in-construction",
    excerpt:
      "Lessons from building AI for a low-connectivity, safety-critical industry.",
    content: `Construction looks nothing like the demo environments most AI tutorials assume, and that gap is where the real engineering happens.

## The constraints shape the product

Sites run on patchy connectivity, shared phones and safety rules that outrank any workflow. So VECAI's intelligence has to degrade gracefully: cached results, small models where latency matters, and clear fallbacks when a prediction can't be trusted.

## Practical lessons

- Solve one site workflow completely before touching the next.
- Data collection is a product feature, not a side effect. Design it in.
- A confident wrong answer is worse than an honest "not sure".

## Where I'll take it next

The interesting problems are no longer model accuracy alone; they're reliability, onboarding and trust. That's backend work as much as AI work, and it's where I keep learning.`,
    date: "2026-09-18",
    category: "AI",
    tags: ["AI", "Construction", "Product"],
    coverImage: "/chemichemi.jpeg",
    readingTime: "5 min read",
  },
  {
    title: "Learning Backend Development by Building",
    slug: "learning-backend-development",
    excerpt:
      "How peer-driven training and real projects taught me more than tutorials.",
    content: `I learned backend development at Zone01 Kisumu, where the method is simple: build the thing, defend the thing, repeat.

## Projects over tutorials

A tutorial ends when the video ends. A project ends when it works. That difference forces you to read documentation, debug for real, and make the hundred small decisions tutorials skip for you.

- Forum: sessions, cookies, passwords done properly, SQLite under load.
- Lem-in: graphs and pathfinding, the algorithmic backbone of routing.
- Push Swap: sorting with constrained operations and a hard efficiency budget.

## Peer learning compounds

Explaining your design to a peer is the fastest design review you'll ever get. Half the bugs I never shipped were caught by talking through a plan for five minutes.

## Keep the shipping habit

Ship small, ship often, and keep the system honest. Everything else, from frameworks to databases to scaling, is learnable once the habit is there.`,
    date: "2026-09-05",
    category: "Learning",
    tags: ["Learning", "Go", "Projects"],
    readingTime: "4 min read",
  },
  {
    title: "Chemichemi: Water Information for Communities",
    slug: "chemichemi-community-water-information",
    excerpt:
      "Designing an alerting system that works on the networks people actually have.",
    content: `Chemichemi is a community water information and alert system, and most of its design decisions come from one question: will this work on a bad network, on a mid-range phone, for someone in a hurry?

## Designing for the constraint

Alerts must be small, fast and legible. The API favours compact payloads, the UI renders meaningfully on slow connections, and nothing critical depends on a single synchronous request.

## Architecture notes

- A thin Go API does the alerting logic; state stays boring and explicit.
- Messages are queued and retried rather than assumed delivered.
- Every screen answers one question: what changed, and does it affect me?

## What Chemichemi changed for me

Infrastructure projects live or die on reliability, not features. Building for unreliable networks made every other system I've designed since simpler and tougher.`,
    date: "2026-08-22",
    category: "Projects",
    tags: ["Go", "Systems", "Water"],
    coverImage: "/forum.jpeg",
    readingTime: "5 min read",
  },
  {
    title: "Security Is a Design Habit",
    slug: "security-is-a-design-habit",
    excerpt:
      "Why I treat security as an architecture habit, not a final checklist.",
    content: `Cybersecurity earns its place at design time, not in a review the week before launch.

## Habits over heroics

- Validate at the boundary, trust nothing from the network.
- Hash passwords with a real KDF and never store anything plaintext.
- Fail closed, log enough to investigate, and keep secrets out of code.

## The threat model is the spec

Knowing what you're protecting and from whom turns security from vibes into requirements. A forum with public threads and a school records system share techniques but not priorities.

## Make it how the system is shaped

The habits scale. The same boundary validation, least privilege and careful secret handling that protect a small API protect a large one. Start with them and security stops being a checklist. It becomes how the system is shaped.`,
    date: "2026-08-08",
    category: "Cybersecurity",
    tags: ["Security", "Backend", "Best Practices"],
    readingTime: "4 min read",
  },
];

/** Newest first. */
export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Related = same category first, then shared tags, excluding the article itself. */
export function relatedArticles(article: Article, count = 3): Article[] {
  return sortedArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = 0;
      if (a.category === article.category) score += 2;
      score += a.tags.filter((t) => article.tags.includes(t)).length;
      return { a, score };
    })
    .filter(({ score }) => score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, count)
    .map(({ a }) => a);
}
