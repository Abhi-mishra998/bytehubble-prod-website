"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Footer from "@/sections/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function ContactPage() {
  const { openModal } = useConsultationModal();
  
  return (
    <>
      <div className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-background">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-dark-accent mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-dark-accent/70 leading-relaxed mb-8">
                Have questions about ByteHubble? Our team is here to help you transform 
                your database operations with AI-powered intelligence.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Options */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Email */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-accent mb-3">Email Us</h3>
                <p className="text-dark-accent/60 leading-relaxed mb-4">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:support@bytehubble.ai" 
                  className="text-primary font-semibold hover:underline"
                >
                  support@bytehubble.ai
                </a>
              </div>

              {/* Location */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-accent mb-3">Our Offices</h3>
                <div className="text-dark-accent/60 leading-relaxed">
                  <p className="font-semibold">USA</p>
                  <p>42381 Dogwood Glen Sq</p>
                  <p className="mb-2">Sterling, VA 20166, USA</p>
                  
                  <p className="font-semibold mt-4">India</p>
                  <p>Elite Business Center, 13th Floor</p>
                  <p>Manjeera Trinity Corporate, KPHB Phase-3</p>
                  <p>Hyderabad - 500072</p>
                </div>
              </div>

              {/* Schedule Consultation */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-accent mb-3">Schedule a Demo</h3>
                <p className="text-dark-accent/60 leading-relaxed mb-4">
                  Book a personalized demo to see ByteHubble in action
                </p>
                <button 
                  onClick={() => openModal()}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Schedule Consultation →
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Container>
            <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Database Operations?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join leading engineering teams who trust ByteHubble to automate, optimize, and secure their PostgreSQL infrastructure.
              </p>
              <a
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-white rounded-xl hover:bg-background transition-colors"
              >
                Read Our Documentation
              </a>
            </div>
          </Container>
        </section>
      </div>
      <Footer />
      <ConsultationModal />
    </>
  );
}

