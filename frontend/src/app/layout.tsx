// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default:
      "Sydney Funeral Printing | Memorial Cards, Bookmarks & Order of Service",
    template: "%s | Sydney Funeral Printing",
  },
  description:
    "Professional funeral printing services in Sydney. Create beautiful, personalised memorial cards, bookmarks, order of service booklets and thank you cards that honour your loved one’s life and legacy.",

  keywords:
    "funeral printing Sydney, memorial cards Sydney, order of service printing, funeral bookmarks, sympathy thank you cards, funeral stationery Australia",

  openGraph: {
    title: "Sydney Funeral Printing",
    description:
      "Fast, compassionate funeral stationery printing in Sydney. Custom memorial cards, booklets & more – easy online templates.",
    url: baseUrl,
    siteName: "Sydney Funeral Printing",
    images: [
      {
        url: `${baseUrl}/og/og-home.jpg`, // ← correct absolute URL
        width: 1200,
        height: 630,
        alt: "Sydney Funeral Printing – Personalised memorial cards and funeral stationery",
      },
    ],
    locale: "en_AU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sydney Funeral Printing",
    description:
      "Personalised funeral cards & booklets – Sydney’s trusted printer",
    images: [`${baseUrl}/og/og-home.jpg`],
  },

  alternates: {
    canonical: baseUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
