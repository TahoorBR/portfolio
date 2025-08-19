import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google"; // import Bebas Neue
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",       // normal weight
  variable: "--font-bebas", 
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
      <body className={`${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
