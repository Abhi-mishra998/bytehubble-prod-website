import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Database Support — ByteHubble",
  description: "24/7 expert database support for mission-critical systems. Performance tuning, incident response, and monitoring.",
};

const supportServices = [
  {
    id: "database-support",
    title: "Database Support",
    description: "24/7 expert database support for mission-critical systems. Our team of senior DBAs ensures your databases run smoothly around the clock.",
    features: [
      "24/7 monitoring and alerting",
      "Performance monitoring",
      "Security patches and updates",
      "Query optimization assistance",
      "Configuration management",
      "Health checks and audits"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  {
    id: "performance",
    title: "Performance Tuning",
    description: "Optimize your database performance with expert analysis and recommendations. We identify bottlenecks and implement solutions for peak efficiency.",
    features: [
      "Query performance analysis",
      "Index strategy optimization",
      "Configuration tuning",
      "Slow query identification",
      "Execution plan analysis",
      "Resource utilization review"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "incident",
    title: "Incident Response",
    description: "Rapid incident response to minimize downtime. Our team is available 24/7 to handle emergencies and get your systems back up quickly.",
    features: [
      "24/7 emergency support",
      "Rapid diagnosis",
      "Root cause analysis",
      "Recovery procedures",
      "Post-incident review",
      "Documentation"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    id: "monitoring",
    title: "Monitoring & Reliability",
    description: "Proactive monitoring and reliability engineering to prevent issues before they impact your users. Stay ahead of problems with intelligent alerts.",
    features: [
      "Custom dashboards",
      "Proactive alerting",
      "Trend analysis",
      "Capacity planning",
      "SLA monitoring",
      "Availability tracking"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export default function SupportPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-accent mb-6">
              Database Support
            </h1>
            <p className="text-lg text-dark-accent/70 leading-relaxed mb-8">
              24/7 expert database support for mission-critical systems. From routine maintenance 
              to emergency response, our team of senior DBAs ensures your databases run smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Get Support Now
              </Button>
              <Button href="/services" variant="outline" size="lg">
                View All Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Support Services */}
      <section className="py-20">
        <Container>
          <SectionHeading
            label="Support Services"
            title="Comprehensive Database Support"
            description="Our support services cover every aspect of database management to keep your systems running at peak performance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {supportServices.map((service) => (
              <div
                key={service.id}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-accent mb-3">
                  {service.title}
                </h3>
                <p className="text-dark-accent/60 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-dark-accent/70">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            label="Why ByteHubble"
            title="Expertise You Can Trust"
            description="Our team brings decades of combined experience in database administration and operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-8">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-dark-accent/70">Years of Experience</div>
            </div>
            <div className="text-center p-8">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-dark-accent/70">Uptime Guaranteed</div>
            </div>
            <div className="text-center p-8">
              <div className="text-4xl font-bold text-primary mb-2">{"<"}15min</div>
              <div className="text-dark-accent/70">Response Time</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Need Database Support?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to help you with any database challenges. Schedule a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-white rounded-xl hover:bg-background transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

