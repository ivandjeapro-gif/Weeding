import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NORBÉ & ERICKA — Invitation de Mariage • 21 Novembre 2026",
  description:
    "Norbé & Ericka ont l'immense plaisir de vous convier à la célébration de leur union civile et religieuse, le 21 novembre 2026 à Agnibilékrou. Touchez la grande porte pour découvrir l'invitation.",
  keywords: [
    "invitation de mariage",
    "Norbé",
    "Ericka",
    "Agnibilékrou",
    "21 novembre 2026",
    "mariage civil et religieux",
  ],
  authors: [{ name: "Norbé & Ericka" }],
  openGraph: {
    title: "NORBÉ & ERICKA — Vous êtes invités à leur mariage !",
    description:
      "Ouvrez la grande porte de célébration et découvrez l'invitation : le 21 novembre 2026 à Agnibilékrou (mairie, temple du Salut, réception).",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORBÉ & ERICKA — Invitation de Mariage",
    description:
      "Le 21 novembre 2026 à Agnibilékrou. Touchez la porte pour entrer dans l'invitation.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF4E7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Polices élégantes chargées depuis le CDN Google Fonts (navigateur du visiteur) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
