import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import ClientBody from "./ClientBody";
import NavBar from "@/components/NavBar";
import { ExerciseBoundary } from "@/components/ExerciseBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codedex | Start Your Coding Adventure ⋆˙⟡",
  description: "Codedex is a new way to learn to code for kids and adults alike. Journey through the fantasy land of Python, HTML, CSS, or JavaScript, earn experience points (XP) to unlock new regions, and collect all the badges at your own pace. Start your adventure today.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        <div className="min-h-screen flex flex-col bg-codedex-darkNavy">
          <NavBar user={session?.user} />
          <main className="flex-grow">
            <ExerciseBoundary>
              {children}
            </ExerciseBoundary>
          </main>
        </div>
      </ClientBody>
    </html>
  );
}
