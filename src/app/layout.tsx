import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victor Ouma | Software Developer, AI Builder & Digital Creator",
  description: "Portfolio of Victor Ouma, a software developer and digital creator building practical products with software, AI, web technology, and design.",
  keywords: [
    "Victor Ouma",
    "Software Developer",
    "AI Builder",
    "Web Developer",
    "Digital Designer",
    "Go",
    "TypeScript",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Victor Ouma" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Victor Ouma Portfolio",
    title: "Victor Ouma | Software Developer, AI Builder & Digital Creator",
    description: "Portfolio of Victor Ouma, a software developer and digital creator building practical products with software, AI, web technology, and design.",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Victor Ouma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Ouma | Software Developer, AI Builder & Digital Creator",
    description: "Portfolio of Victor Ouma, a software developer and digital creator building practical products with software, AI, web technology, and design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
