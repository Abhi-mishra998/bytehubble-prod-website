import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Services — ByteHubble",
  description: "Comprehensive database services including support, migration, optimization, and cloud architecture.",
};

const services = [
  {
    id: "migration",
    title: "Data Migration",
    description: "Seamless migration services with zero downtime. Our experts ensure your data moves safely and efficiently to any target platform.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    features: [
      "Zero-downtime migration",
      "Pre-migration assessment",
      "Data validation & verification",
      "Post-migration support"
    ]
  },
  {
    id: "optimization",
    title: "Database Optimization",
    description: "Comprehensive database optimization services to improve performance, reduce latency, and maximize resource efficiency.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: [
      "Query performance analysis",
      "Index optimization",
      "Configuration tuning",
      "Storage optimization"
    ]
  },
  {
    id: "cloud",
    title: "Cloud Architecture",
    description: "Design and implement scalable, secure, and cost-effective cloud architectures tailored to your business needs.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    features: [
      "Cloud-native architecture design",
      "Multi-cloud strategy",
      "Security best practices",
      "Cost optimization"
    ]
  },
  {
    id: "devops",
    title: "DevOps Automation",
    description: "Automate your database operations with DevOps practices to achieve continuous delivery and reliable deployments.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    features: [
      "CI/CD pipeline setup",
      "Infrastructure as Code",
      "Automated testing",
      "Deployment automation"
    ]
  },
  {
    id: "cost",
    title: "Cost Optimization",
    description: "Reduce infrastructure costs with intelligent resource management and optimization strategies.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      "Resource right-sizing",
      "Reserved instance planning",
      "Cost monitoring & alerts",
      "Waste identification"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-accent mb-6">
              Database Services
            </h1>
            <p className="text-lg text-dark-accent/70 leading-relaxed mb-8">
              Comprehensive database services to help you build, scale, and optimize your data infrastructure. 
              From migration to ongoing support, our experts are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Schedule Consultation
              </Button>
              <Button href="/services/support" variant="outline" size="lg">
                View Support Options
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <Container>
          <SectionHeading
            label="Our Services"
            title="End-to-End Database Solutions"
            description="From initial consultation to ongoing support, we provide comprehensive services tailored to your needs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
            {services.map((service) => (
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

      {/* Support Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-accent mb-6">
                Expert Support When You Need It
              </h2>
              <p className="text-dark-accent/70 leading-relaxed mb-6">
                Our team of database experts provides 24/7 support for mission-critical systems. 
                From routine maintenance to emergency response, we&apos;ve got you covered.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">24/7 monitoring and support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Rapid incident response</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Proactive performance tuning</span>
                </li>
              </ul>
              <Button href="/services/support" variant="outline">
                Learn More About Support
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-dark-accent/70">Support Availability</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Database Operations?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our experts to discuss your specific needs and challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-white rounded-xl hover:bg-background transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

