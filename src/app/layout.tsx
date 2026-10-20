import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { portfolioData } from "@/data/portfolioData";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { DEFAULT_LOCALE } from "@/types/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { meta } = portfolioData;
const defaultTitle = meta.defaultTitle[DEFAULT_LOCALE];
const defaultDescription = meta.description[DEFAULT_LOCALE];
const defaultKeywords = meta.keywords[DEFAULT_LOCALE];

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: meta.author }],
  openGraph: {
    type: "website",
    url: meta.siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: meta.siteName,
    images: [{ url: meta.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [meta.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <ThemeProvider>
            <Header developerName={portfolioData.profile.name} />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
