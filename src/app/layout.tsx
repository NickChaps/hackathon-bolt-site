import type { Metadata } from "next";
import { Inter, Orbitron, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
});
const syne = Syne({
  subsets: ["latin"],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: "Hackathon.dev | Le plus grand hackathon mondial",
  description: "Rejoignez le plus grand hackathon mondial avec plus de $1M de prix, 72h de coding intense et des participants de plus de 100 pays.",
  openGraph: {
    title: "Hackathon.dev | Le plus grand hackathon mondial",
    description: "Rejoignez le plus grand hackathon mondial avec plus de $1M de prix, 72h de coding intense et des participants de plus de 100 pays.",
    images: [
      {
        url: "/images/hackathon-poster.svg",
        width: 1200,
        height: 627,
        alt: "Hackathon.dev Banner",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathon.dev | Le plus grand hackathon mondial",
    description: "Rejoignez le plus grand hackathon mondial avec plus de $1M de prix, 72h de coding intense et des participants de plus de 100 pays.",
    images: ["/images/hackathon-poster.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preload" href="/images/hackathon-poster.svg" as="image" />
        <link rel="preload" href="/images/world-map-dots.svg" as="image" />
      </head>
      <body className={`${inter.className} ${orbitron.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
