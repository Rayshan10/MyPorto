import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rayshan Gani Putra — Fullstack Web Developer",
    template: "%s — Rayshan Gani Putra",
  },
  description:
    "Portofolio Rayshan Gani Putra, fullstack web developer asal Bandung. Membangun sistem web dengan Laravel, React, dan Node.js — dari basis data sampai deployment.",
  keywords: [
    "Rayshan Gani Putra",
    "Fullstack Developer",
    "Web Developer Bandung",
    "Laravel Developer",
    "React Developer",
    "Portofolio",
  ],
  authors: [{ name: "Rayshan Gani Putra", url: siteUrl }],
  creator: "Rayshan Gani Putra",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Rayshan Gani Putra",
    title: "Rayshan Gani Putra — Fullstack Web Developer",
    description:
      "Membangun sistem web yang menyelesaikan masalah operasional nyata. Laravel, React, Node.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayshan Gani Putra — Fullstack Web Developer",
    description:
      "Membangun sistem web yang menyelesaikan masalah operasional nyata.",
  },
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rayshan Gani Putra",
  jobTitle: "Fullstack Web Developer",
  url: siteUrl,
  email: "mailto:rayshangp@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressCountry: "ID",
  },
  sameAs: [
    "https://github.com/Rayshan10",
    "https://www.linkedin.com/in/rayshannn/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
