import type { Metadata } from "next";
import AppConfig from "@/components/config/app-config";

export const metadata: Metadata = {
  title: "To-Do List (v2)",
  description: "Stay Organized, One Task at a Time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppConfig>{children}</AppConfig>
      </body>
    </html>
  );
}
