// Instructions: Update layout to remove default styling and use clean layout

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "A clone of the ChatGPT interface built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
