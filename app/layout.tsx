import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Jayesh Bairagi — Aspiring Software Developer";
const description =
  "Portfolio of Jayesh Bairagi, a Computer Science student learning, building, and growing toward a career in full-stack software development.";
const GITHUB_URL = "https://github.com/BugWithJayesh";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "jayesh-bairagi.dev";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title,
    description,
    applicationName: "Jayesh Bairagi Portfolio",
    authors: [{ name: "Jayesh Bairagi", url: GITHUB_URL }],
    creator: "Jayesh Bairagi",
    keywords: ["Jayesh Bairagi", "software developer", "computer science student", "developer portfolio", "internship"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName: "Jayesh Bairagi",
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jayesh Bairagi — Aspiring Software Developer" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

const themeScript = `
  try {
    const saved = localStorage.getItem('theme');
    const dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
