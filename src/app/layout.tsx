import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/theme-provider";

export const metadata: Metadata = {
  title: "Chat for fun",
  description: "Real time chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
