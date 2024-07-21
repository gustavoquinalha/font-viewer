import { ThemeProvider } from "@/components/theme-provider";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- HTML Meta Tags --> */}
        <base href="/" />
        <title>Font Viewer - Explore your installed fonts with ease</title>
        <link rel="canonical" href="https://font-viewer.vercel.app/" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Discover and visualize a variety of styles directly in your browser."
        />
        <meta name="author" content="Gustavo Quinalha" />
        <meta name="theme-color" content="dark" />

        {/* <!-- Google Search Engine --> */}
        <meta itemProp="name" content="Font Viewer" />
        <meta
          itemProp="description"
          content="Discover and visualize a variety of styles directly in your browser."
        />
        <meta
          itemProp="image"
          content="https://font-viewer.vercel.app/image.png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://font-viewer.vercel.app/" />
        <meta property="og:type" content="website" />
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
        <meta property="og:locale" content="en_US" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Font Viewer - Explore your installed fonts with ease"
        />
        <meta name="twitter:site" content="@gustavoquinalha" />
        <meta
          name="twitter:description"
          content="Discover and visualize a variety of styles directly in your browser."
        />
        <meta
          name="twitter:image"
          content="https://font-viewer.vercel.app/image.png"
        />
        <meta name="twitter:image:alt" content="Font Viewer logo" />
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
