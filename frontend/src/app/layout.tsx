// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Sydney Funeral Printing | Memorial Cards, Booklets & More",
    template: "%s | Sydney Funeral Printing",
  },

  description:
    "Professional funeral printing services in Sydney. Create beautiful, personalised memorial cards, order of service booklets and funeral stationery with fast turnaround.",

  keywords:
    "funeral printing Sydney, memorial cards, funeral order of service, funeral program printing, bookmarks, thank you cards, funeral stationery Australia",

  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: "Sydney Funeral Printing",
    description:
      "Personalised funeral stationery in Sydney. Custom memorial cards, order of service booklets & more.",
    url: baseUrl,
    siteName: "Sydney Funeral Printing",
    images: [
      {
        url: "/og/og-home.jpg", // resolved via metadataBase → becomes absolute
        width: 1200,
        height: 630,
        alt: "Sydney Funeral Printing – Memorial cards & funeral stationery",
      },
    ],
    type: "website",
    locale: "en_AU",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sydney Funeral Printing",
    description:
      "Beautiful, personalised memorial cards and funeral stationery in Sydney.",
    images: ["/og/og-home.jpg"],
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

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* JSON-LD Schema (SEO BOOST) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Sydney Funeral Printing",
              url: baseUrl,
              image: `${baseUrl}/og/og-home.jpg`,
              description:
                "Professional funeral printing services in Sydney including memorial cards, order of service booklets and funeral stationery.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sydney",
                addressRegion: "NSW",
                addressCountry: "AU",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
