"use client";

import { ACADEMIC_PARTNERS } from "@/lib/constants";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function AcademicPartners() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              Academic Partnerships
            </span>
            <h2 className="text-3xl font-bold text-dark-accent sm:text-4xl lg:text-5xl">
              Official Academic Partners
            </h2>
            <p className="mt-4 text-lg text-dark-accent/70 leading-relaxed max-w-2xl mx-auto">
              ByteHubble collaborates with leading universities to deliver advanced training in PostgreSQL, cloud infrastructure, and AI-powered database systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ACADEMIC_PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                {/* University Icon/Logo Placeholder */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479zm0 0l-3 3"
                    />
                  </svg>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-dark-accent mb-2">
                  {partner.name}
                </h3>
                <p className="text-dark-accent/60 leading-relaxed text-sm lg:text-base">
                  {partner.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-bl-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

