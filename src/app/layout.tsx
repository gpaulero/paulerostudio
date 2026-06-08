import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paulero Studio | Diseño & Desarrollo Web",
  description:
    "Estudio de diseño y desarrollo web. Sitios rápidos, hermosos y funcionales. E-commerce, backends robustos y experiencias digitales que convierten.",
  keywords: [
    "desarrollo web",
    "diseño web",
    "e-commerce",
    "Paulero Studio",
    "Gonzalo Paulero",
    "tienda online",
    "backend",
  ],
  authors: [{ name: "Gonzalo Paulero" }],
  icons: {
    icon: "/logo-mark.png",
  },
  openGraph: {
    title: "Paulero Studio | Diseño & Desarrollo Web",
    description:
      "Estudio de diseño y desarrollo web. Sitios rápidos, hermosos y funcionales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
