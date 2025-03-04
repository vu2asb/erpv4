import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="min-h-svh max-w-7xl mx-auto pt-20 px-6">
      <HeroSection />
      </div>
      <Footer />
    </>
  );
}
