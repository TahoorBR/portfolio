import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Tahoor Bin Rauf | Portfolio",
  description: "Personal portfolio showcasing projects, skills, and AI experiments.",
  authors: [{ name: "Muhammad Tahoor Bin Rauf" }],
  keywords: [
    "Portfolio",
    "Muhammad Tahoor Bin Rauf",
    "AI",
    "Next.js",
    "Full Stack",
    "Web Developer",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Muhammad Tahoor Bin Rauf | Portfolio",
    description: "Personal portfolio showcasing projects, skills, and AI experiments.",
    url: "https://portfolio-sigma-dun-zixzbign8y.vercel.app",
    siteName: "Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
