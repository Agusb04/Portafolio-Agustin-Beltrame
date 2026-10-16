import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { portfolioData } from "@/data/portfolioData";
import { ThemeProvider } from "@/providers/ThemeProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.defaultTitle,
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.author }],
  openGraph: {
    type: "website",
    url: meta.siteUrl,
    title: meta.defaultTitle,
    description: meta.description,
    siteName: meta.siteName,
    images: [{ url: meta.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.defaultTitle,
    description: meta.description,
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
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header developerName={portfolioData.profile.name} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
