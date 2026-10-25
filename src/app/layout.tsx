import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Brain OS — Universal Capture, Memory & Execution",
  description:
    "Local-first AI workspace: zero-save capture, project auto-routing, decision graph, 3-tier context injection, and a universal timeline for everything you build.",
  keywords: ["Project Brain OS", "AI workspace", "knowledge capture", "decision graph", "context injection"],
  authors: [{ name: "Project Brain OS" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Project Brain OS",
    description: "Everything you see, decide, and build — searchable, linked, and ready for AI execution.",
    siteName: "Project Brain OS",
    type: "website",
  },
};

const BrainOSLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default BrainOSLayout;
