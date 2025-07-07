import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renart Case Study",
  description: "A case study for Renart",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}
