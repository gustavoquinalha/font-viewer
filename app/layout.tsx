import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "Font Viewer - Explore your installed fonts with ease",
  description:
    "Discover and visualize a variety of styles directly in your browser.",
  applicationName: "Font Viewer",
  // opengraph.image: "https://font-viewer.vercel.app/image.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://font-viewer.vercel.app" />
        <meta property="og:site_name" content="Font Viewer" />
        <meta
          property="og:title"
          content="Font Viewer - Explore your installed fonts with ease"
        />
        <meta
          property="og:description"
          content="Discover and visualize a variety of styles directly in your browser."
        />
        <meta
          property="og:image"
          content="https://font-viewer.vercel.app/image.png"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans text-base antialiased overflow-y-scroll overflow-x-hidden",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
