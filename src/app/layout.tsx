import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// Métadonnées pour le SEO et l'identité visuelle (Favicons/Manifest)
export const metadata: Metadata = {
  title: "MYRESTOMIAM | L'Expérience Kebab du Futur",
  description: "Découvrez le kebab réinventé en 2026. Saveurs brutes, technologie pure, goût radical.",
  // Chargement des icônes présentes dans ton dossier public
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Liaison avec le fichier de configuration Web App (Android)
  manifest: "/site.webmanifest",
};

// Configuration de l'affichage mobile et de la couleur du navigateur
export const viewport: Viewport = {
  themeColor: "#ff4d00", // Ton orange néon pour la barre d'adresse mobile
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Empêche le zoom accidentel sur mobile pour garder l'aspect "App"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased selection:bg-brand-orange selection:text-black">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}