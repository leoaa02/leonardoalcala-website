import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://leonardoalcala.com"),
  title: {
    default: "Leonardo Alcala - Technology, Writing and Creativity",
    template: "%s | Leonardo Alcala",
  },
  description:
    "I build digital experiences and share ideas about technology, programming, productivity and storytelling.",
  keywords: [
    "Leonardo Alcala",
    "Developer",
    "Portfolio",
    "Blog",
    "Technology",
    "Programming",
    "Productivity",
    "Storytelling",
  ],
  authors: [{ name: "Leonardo Alcala" }],
  creator: "Leonardo Alcala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Leonardo Alcala - Technology, Writing and Creativity",
    description:
      "I build digital experiences and share ideas about technology, programming, productivity and storytelling.",
    siteName: "Leonardo Alcala",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Alcala - Technology, Writing and Creativity",
    description:
      "I build digital experiences and share ideas about technology, programming, productivity and storytelling.",
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
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
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
      <body className={`${inter.variable} font-sans antialiased`}>
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
