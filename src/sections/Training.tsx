"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { TRAINING_PROGRAMS, ACADEMIC_PARTNERS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Training() {
  return (
    <section className="pt-24 pb-20 lg:pt-28 lg:pb-28 bg-background/50">
      <Container>
        <SectionHeading
          label="Training Program"
          title="Applied AI Engineer Training"
          description="A rigorous, project-driven curriculum designed to transform engineers into elite AI practitioners through hands-on architecture and deployment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {TRAINING_PROGRAMS.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-300" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl font-black text-primary/30 group-hover:text-primary/50 transition-colors duration-300 italic select-none">
                    {program.id}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {program.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-dark-accent mb-3 group-hover:text-primary transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-dark-accent/60 leading-relaxed mb-6 text-sm">
                  {program.description}
                </p>

                {/* Tech Stack / Topics */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {program.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-md bg-background text-[11px] font-semibold text-dark-accent/70 border border-gray-100"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button 
                    href="/services/training" 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn p-0 hover:bg-transparent text-primary font-bold"
                  >
                    Explore Project <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Button>
                </div>
              </div>
          </motion.div>
        ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/services/training#enterprise" variant="primary" size="lg" className="shadow-xl shadow-primary/20">
            Download Program Syllabus
          </Button>
        </div>

        {/* Official Academic Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 lg:mt-24"
        >
          <div className="text-center mb-10 lg:mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-3">
              Academic Partnerships
            </span>
            <h2 className="text-2xl font-bold text-dark-accent sm:text-4xl lg:text-5xl">
              Official Academic Partners
            </h2>
            <p className="mt-4 text-lg text-dark-accent/70 leading-relaxed max-w-2xl mx-auto">
              ByteHubble collaborates with leading universities to deliver advanced training in PostgreSQL, cloud infrastructure, and AI-powered database systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
