import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NotificationToast from "@/components/ui/Notification";
import ThemeProvider from "@/components/providers/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Breezy",
    default: "Breezy",
  },
  description: "With Breezy, share your Flutter apps with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <NotificationToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
