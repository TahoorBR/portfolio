import type { Metadata } from "next";
import { Exo_2 } from "next/font/google"; // import Exo 2
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: "400",       // normal weight
  variable: "--font-exo2", 
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
      <body className={`${exo2.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
