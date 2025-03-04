import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactUsSection from "@/components/ContactUsSection";


const ContactUs = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-svh max-w-7xl mx-auto pt-0 px-6 flex items-center justify-center">
        <ContactUsSection />
      </div>
      <Footer />
    </>
  )
}

export default ContactUs;
