import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import ConsultationModal from "@/components/ConsultationModal";
import { ConsultationModalProvider } from "@/context/ConsultationModalContext";
import PopupProvider from "@/components/PopupProvider";
import "./globals.css";

// Lazy load the Chatbot component - loads with a placeholder while hydrating
const Chatbot = dynamic(() => import("@/components/Chatbot"), {
  loading: () => null,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "ByteHubble";
const SITE_URL = "https://bytehubble.com";
const SITE_DESCRIPTION =
  "ByteHubble is the AI intelligence layer your PostgreSQL stack is missing — combining enterprise knowledge RAG, autonomous DB agents, self-healing incident AI, and world-class database training.";
const SITE_KEYWORDS = [
  "PostgreSQL",
  "database automation",
  "AI agents",
  "DB intelligence",
  "database operations",
  "DBA training",
  "incident AI",
  "runbook automation",
  "database optimization",
  "AI-powered database management",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2E2A8F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Agents That Run Your Databases`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "ByteHubble" }],
  creator: "ByteHubble",
  publisher: "ByteHubble",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/company.jpeg",
    apple: "/company.jpeg",
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
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Agents That Run Your Databases`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI-Powered Database Intelligence Platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — DB Intelligence Platform`,
    description: SITE_DESCRIPTION,
    creator: "@bytehubble",
    images: ["/og-image.png"],
  },
  category: "technology",
  classification: "AI-powered database management platform",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      sameAs: [
        "https://twitter.com/bytehubble",
        "https://linkedin.com/company/bytehubble",
        "https://github.com/bytehubble",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@bytehubble.ai",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "ByteHubble",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cloud, Web",
      description: SITE_DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ConsultationModalProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Chatbot />
          <ConsultationModal />
          <PopupProvider />
        </ConsultationModalProvider>
      </body>
    </html>
  );
}
