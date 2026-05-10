import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ScrollProgress from "@/components/layout/ScrollProgress";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SpaceBackground from "@/components/ui/SpaceBackground";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-heading", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Rahul Designs | Premium Digital Marketing & Design Studio",
  description: "Rahul Designs is a premium creative growth studio specializing in strategic digital marketing, high-converting design, and modern brand systems. Founded by Rahul Iniyan.",
  keywords: "digital marketing, graphic design, brand identity, creative strategy, Rahul Iniyan, RahulDesigns",
  openGraph: {
    title: "Rahul Designs | Premium Digital Marketing & Design Studio",
    description: "Strategic digital marketing and high-converting design for ambitious businesses.",
    type: "website",
    locale: "en_IN",
    siteName: "Rahul Designs",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} overflow-x-hidden`}>
      <body className="min-h-screen w-full flex flex-col bg-black text-white font-[var(--font-body)] antialiased overflow-x-hidden cursor-none">
        <CustomCursor />
        <LoadingScreen />
        <ScrollProgress />
        <SpaceBackground />
        <Navbar />
        <main className="relative z-10 flex-1 w-full flex flex-col items-center pt-[80px] overflow-x-hidden">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
