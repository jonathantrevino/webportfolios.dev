import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Developer Portfolios - Showcase & Explore Real Developer Portfolios",
    template: "%s - webportfolios.dev",
  },
  description:
    "Easily upload your portfolio with a single URL and see how it performs with handy analytics. Discover inspiration from fellow developers and showcase your unique work. Let's share and grow together!",
  keywords:
    "developer portfolios, software engineer portfolios examples, web developer portfolios examples, portfolios, portfolio resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta property="og:image" content="/opengraph-image.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className + ' max-w-[1440px] mx-auto'}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
