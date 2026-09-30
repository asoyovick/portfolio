import type { MetadataRoute } from "next";
import { sortedArticles } from "@/lib/articles";

const SITE_URL = "https://victorouma.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cv`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = sortedArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
