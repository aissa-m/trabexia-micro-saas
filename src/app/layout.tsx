import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Trabexia | Candidaturas",
  description: "Trabaja como conductor. Candidaturas para Trabexia.",
  icons: {
    icon: [
      { url: "/img/logo.svg", type: "image/png" },
      { url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/img/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "icon",
        url: "/img/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/img/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-sans antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
