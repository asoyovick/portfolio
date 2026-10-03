import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://victorouma.dev";
const TITLE = "Victor Ouma | Software, AI & Backend Developer";
const DESCRIPTION =
  "Victor Ouma builds software, AI applications and secure systems for real-world problems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Victor Ouma",
    "Software Developer",
    "Backend Engineer",
    "AI Developer",
    "Cybersecurity",
    "Go",
    "Kenya",
  ],
  authors: [{ name: "Victor Ouma" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Victor Ouma",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Victor Ouma — Software, AI, Backend, Cybersecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Ouma",
  url: SITE_URL,
  jobTitle: "Software Developer",
  description: DESCRIPTION,
  knowsAbout: ["Software", "AI", "Backend Engineering", "Cybersecurity"],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
