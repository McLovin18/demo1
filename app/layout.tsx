import "./globals.css";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ToastProvider } from "./context/ToastContext";
import LayoutContentClient from "./components/LayoutContentClient";
import { StructuredData } from "./components/StructuredData";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Inter } from "next/font/google";

// ISR Global: Revalidar sitio cada 30 minutos
// Optimiza regeneración de página principal y otros contenidos estáticos
export const revalidate = 1800;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://grlpower.com"; // ⚠️ Reemplazar con dominio de producción
const SITE_NAME = "GRL Power";
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GRL Power | Zapatos Personalizados, Ecuador",
    template: "%s | GRL Power",
  },
  description:
    "Diseña tus propios zapatos con GRL Power. Calzado personalizado hecho a tu medida y estilo, con pick up y envíos a todo Ecuador.",
  keywords: [
    "zapatos personalizados Ecuador",
    "calzado personalizado",
    "diseña tus zapatos",
    "zapatos a medida Ecuador",
    "GRL Power",
    "girl power zapatos",
    "moda femenina Ecuador",
    "calzado hecho a mano Ecuador",
    "tenis personalizados Ecuador",
    "zapatos únicos Ecuador",
    "envíos nacionales calzado",
    "emprendimiento femenino Ecuador",
  ],
  creator: "GRL Power",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",

  // Open Graph - Redes Sociales
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "GRL Power | Zapatos Personalizados",
    description:
      "Diseña tus propios zapatos con GRL Power. Calzado personalizado hecho a tu medida, con pick up y envíos a todo Ecuador.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "GRL Power - Zapatos Personalizados",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "GRL Power | Zapatos Personalizados",
    description:
      "Calzado personalizado hecho a tu medida y estilo, 100% ecuatoriano.",
    images: [`${SITE_URL}/twitter-image.jpg`],
  },

  // Canonícal URL
  alternates: {
    canonical: SITE_URL,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Verificación
  verification: {
    google: "tu-codigo-google-search-console", // Reemplazar con tu código
  },

  // Apple
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },

  category: "Moda y Calzado",
};

// Viewport export - separate from metadata in Next.js 16
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics gtag.js - insertado justo después de <head> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K1Q0MYDSKF"></script>
        {/* ⚠️ Reemplazar G-K1Q0MYDSKF con el ID de Analytics propio de GRL Power */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K1Q0MYDSKF');
            `,
          }}
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
        <StructuredData />
      </head>
      <body className="relative">
        <ToastProvider>
          <OnboardingProvider>
            <LayoutContentClient>{children}</LayoutContentClient>
          </OnboardingProvider>
        </ToastProvider>
      </body>
    </html>
  );
}