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
  title: "Hackathon.dev | The World's Largest Hackathon",
  description: "Join the world's largest hackathon with over $1M in prizes, 72 hours of intense coding and participants from more than 100 countries.",
  openGraph: {
    title: "Hackathon.dev | The World's Largest Hackathon",
    description: "Join the world's largest hackathon with over $1M in prizes, 72 hours of intense coding and participants from more than 100 countries.",
    images: [
      {
        url: "/images/hackathon-poster.svg",
        width: 1200,
        height: 627,
        alt: "Hackathon.dev Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathon.dev | The World's Largest Hackathon",
    description: "Join the world's largest hackathon with over $1M in prizes, 72 hours of intense coding and participants from more than 100 countries.",
    images: ["/images/hackathon-poster.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
