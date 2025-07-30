import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { FavoritesProvider } from "@/contexts/favorites-context";

// Primary font for body text - Modern, highly readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Display font for headings - Elegant serif with personality
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Accent font for modern touches - Contemporary sans-serif
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BlackPodPlug - Your Gateway to Black Excellence in Podcasting",
  description: "Discover the most powerful Black voices in podcasting. One platform, endless stories, infinite inspiration. Explore comedy, news, culture, business, and more from Black creators.",
  keywords: [
    "Black podcasts",
    "African American podcasts",
    "Black voices",
    "podcast discovery",
    "Black culture",
    "diversity in media",
    "Black creators",
    "podcast platform"
  ],
  authors: [{ name: "BlackPodPlug Team" }],
  creator: "BlackPodPlug",
  publisher: "BlackPodPlug",
  openGraph: {
    title: "BlackPodPlug - Your Gateway to Black Excellence in Podcasting",
    description: "Discover the most powerful Black voices in podcasting. One platform, endless stories, infinite inspiration.",
    url: "https://blackpodplug.com",
    siteName: "BlackPodPlug",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackPodPlug - Your Gateway to Black Excellence in Podcasting",
    description: "Discover the most powerful Black voices in podcasting. One platform, endless stories, infinite inspiration.",
    creator: "@blackpodplug",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <meta name="theme-color" content="#D4AF37" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} font-inter antialiased min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950`}
      >
        {/* Ambient Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#FF1B6B]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00D4FF]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <QueryProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </QueryProvider>
        </div>

        {/* Grain Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0ibm9pc2VGaWx0ZXIiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlRmlsdGVyKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')]" />
      </body>
    </html>
  );
}
