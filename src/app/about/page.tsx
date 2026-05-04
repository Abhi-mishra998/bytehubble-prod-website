import About from "@/sections/About";
import Footer from "@/sections/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export const metadata = {
  title: "About Us | ByteHubble",
  description: "Learn about ByteHubble - the Autonomous PostgreSQL Intelligence Platform",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Footer />
      <ConsultationModal />
    </>
  );
}

