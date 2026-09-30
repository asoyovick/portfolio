/**
 * Gallery content — edit this file to add or change photos.
 * Images live in `public/` (or `public/images/`) and are referenced
 * by path, e.g. "/images/drives.jpg". No database involved.
 */

export interface GalleryItem {
  title: string;
  description: string;
  /** Path under `public/`, e.g. "/images/drives.jpg". */
  image: string;
  category: string;
  /** Optional external link (project repo, certificate, event page…). */
  link?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    title: "VECAI — construction intelligence",
    description:
      "Product surface of VECAI, an AI platform for construction workflows.",
    image: "/vecai.png",
    category: "Projects",
  },
  {
    title: "Chemichemi",
    description:
      "Community water information and alert system — interface overview.",
    image: "/chemichemi.jpeg",
    category: "Projects",
  },
  {
    title: "Forum",
    description:
      "Go-based discussion platform — thread and session layout.",
    image: "/forum.jpeg",
    category: "Projects",
  },
  {
    title: "Push Swap",
    description:
      "Algorithm visual for a stack-sorting exercise built in Go.",
    image: "/push-swap.jpeg",
    category: "Algorithms",
  },
  {
    title: "Micro-template",
    description:
      "Lightweight templating engine — rendered output sample.",
    image: "/micro-template.jpeg",
    category: "Projects",
  },
  {
    title: "Speaking at KijaniSpace",
    description:
      "Presenting software and AI work at a community tech event.",
    image: "/images/hero.jpg",
    category: "Events",
  },
  {
    title: "Field work",
    description: "On-site, documenting systems in the environments they serve.",
    image: "/IMG_3834.JPG",
    category: "Professional",
  },
  {
    title: "Team session",
    description: "Working session with collaborators on a product build.",
    image: "/IMG_3835.JPG",
    category: "Professional",
  },
  {
    title: "Drives landscape",
    description: "A quiet frame from a day spent building outdoors.",
    image: "/images/drives.jpg",
    category: "Events",
  },
  {
    title: "Uploaded work 01",
    description: "Gallery photograph from the project archive.",
    image: "/uploads/4752546e-031b-49f8-b338-6b4e98f36881.JPG",
    category: "Professional",
  },
  {
    title: "Uploaded work 02",
    description: "Gallery photograph from the project archive.",
    image: "/uploads/5276ac95-68d1-4d3f-af7e-2bb3452d3e82.JPG",
    category: "Professional",
  },
  {
    title: "Uploaded work 03",
    description: "Gallery photograph from the project archive.",
    image: "/uploads/6d88ee59-2681-40fb-875a-eef369a4abb6.jpeg",
    category: "Events",
  },
  {
    title: "Uploaded work 04",
    description: "Gallery photograph from the project archive.",
    image: "/uploads/7f7008c2-2ea2-4c06-a03f-a88132a34b7f.JPG",
    category: "Events",
  },
  {
    title: "Uploaded work 05",
    description: "Gallery photograph from the project archive.",
    image: "/uploads/d0750c72-9575-4e33-8ccd-e89a6ff5fca6.JPG",
    category: "Events",
  },
];

/** Distinct categories in order of first appearance. */
export const galleryCategories: string[] = Array.from(
  new Set(galleryItems.map((item) => item.category)),
);
