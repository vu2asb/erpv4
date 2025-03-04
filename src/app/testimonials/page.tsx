import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Testimonials = () => {
  return (
    <>
      <NavBar />
      Testimonials Page content...
      <Footer />
    </>
  );
};

export default Testimonials;
