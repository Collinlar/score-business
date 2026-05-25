import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:       "Ghana Business Score · Free Digital Health Check for Ghanaian SMEs",
  description: "Find out how your business looks online. 8 questions. A personalised score out of 100. The exact gaps holding you back, and what to fix first. Free from BVM Digital.",
  openGraph: {
    title:       "Ghana Business Score",
    description: "How does your business look online? Get your free score in 3 minutes.",
    url:         "https://score.b-vm.com",
    siteName:    "BVM Digital",
    locale:      "en_GH",
    type:        "website",
  },
  twitter: {
    card:  "summary_large_image",
    title: "Ghana Business Score · Free Digital Health Check",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
