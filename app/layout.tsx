import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishwa Infra",
  description: "Creating value since 1992",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
