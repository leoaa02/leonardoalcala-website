import type { Metadata, Viewport } from "next"
import { Newsreader, Lora, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display-stack",
  weight: ["400", "500", "600"],
  display: "swap",
})

const body = Lora({
  subsets: ["latin"],
  variable: "--font-body-stack",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-stack",
  weight: ["400", "500"],
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
  icons: [{ rel: "icon", url: "/A.png" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Leonardo Alcala — Essays, Notes, Projects",
    description:
      "A premium editorial site exploring technology, creativity, AI, marketing, and meaningful living.",
    siteName: "Leonardo Alcala",
    images: ["/images/leonardo-alcala.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Alcala — Essays, Notes, Projects",
    description:
      "A premium editorial site exploring technology, creativity, AI, marketing, and meaningful living.",
    creator: "@leoaa02",
    images: ["/images/leonardo-alcala.jpg"],
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
        className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased text-foreground selection:bg-[var(--green)]/10 selection:text-foreground`}
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
