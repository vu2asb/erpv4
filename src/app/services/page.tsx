import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Services from "@/components/Services"

// Only for testing the spinner and loading.tsx
const wait = async (ms:number)=>{
  return new Promise(resolve=> setTimeout(resolve, ms));
  } 

const About = async() => {
  await wait(500); // Only for testing the spinner and loading.tsx
    return (
      <>
        <NavBar />
        <div className="min-h-svh max-w-7xl mx-auto pt-5 px-6">
         <Services />
        </div>
        <Footer />
      </>
    );
  };
  
  export default About;
