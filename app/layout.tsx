import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://robocode-learning.dang-bui2810at.chatgpt.site"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  title: "RoboLearn — Master Robotics",
  description: "Nền tảng học code tương tác dành cho AI Perception, Control, Simulation và Humanoid Robotics.",
  openGraph: {
    title: "RoboLearn — Master Robotics",
    description: "Learn AI Perception, Control and Simulation through code.",
    images: [{ url: "/og-v2.png", width: 1536, height: 1024, alt: "RoboLearn robotics learning platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoboLearn — Master Robotics",
    description: "Learn AI Perception, Control and Simulation through code.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
