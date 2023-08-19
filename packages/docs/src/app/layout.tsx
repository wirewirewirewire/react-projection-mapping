import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@un/styles/styles.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// TODO: Add theme

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polyxo Studios GmbH",
  description: "Softwaredevelopment and Exhibition Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
