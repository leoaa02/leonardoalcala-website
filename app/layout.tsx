import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://leonardoalcala-website.vercel.app"
  ),
  title: {
    default: "Leonardo Alcala — Essays, Notes, Projects",
    template: "%s | Leonardo Alcala",
  },
  description:
    "A premium editorial site exploring technology, creativity, AI, marketing, and meaningful living.",
  keywords: [
    "Leonardo Alcala",
    "Technology",
    "Writing",
    "Personal Brand",
    "Editorial",
    "Essays",
    "Projects",
    "Notes",
  ],
  authors: [{ name: "Leonardo Alcala" }],
  creator: "Leonardo Alcala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Leonardo Alcala — Essays, Notes, Projects",
    description:
      "A premium editorial site exploring technology, creativity, AI, marketing, and meaningful living.",
    siteName: "Leonardo Alcala",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Alcala — Essays, Notes, Projects",
    description:
      "A premium editorial site exploring technology, creativity, AI, marketing, and meaningful living.",
    creator: "@leonardoalcala",
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body
        className={`${inter.variable} ${serif.variable} font-sans antialiased text-foreground selection:bg-primary/10 selection:text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
