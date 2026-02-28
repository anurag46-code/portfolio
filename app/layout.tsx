import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./styles/effects.css";
import "./styles/animations.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag Mundada | Portfolio",
  description: "Software engineer portfolio - retro terminal theme",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-mono antialiased`}>
        <a href="#about" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
