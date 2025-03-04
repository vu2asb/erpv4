import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <NavBar />
    <div className="min-h-svh flex items-center justify-center pb-[100px]">
      { children }
    </div>
    <Footer />
    </>
  )
}

export default AuthLayout;
