import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AcademicPartners from "@/components/sections/AcademicPartners";

export const metadata = {
  title: "Training Programs — ByteHubble",
  description: "World-class database training programs. PostgreSQL Mastery, DBA Training, AI/ML for Engineers, SRE Training, and Enterprise Training.",
};

const trainingPrograms = [
  {
    id: "postgresql-mastery",
    title: "PostgreSQL Mastery",
    href: "/services/training#postgresql-mastery",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    description: "Master PostgreSQL from fundamentals to advanced internals. Learn core architecture, query optimization, replication, and production operations.",
    topics: ["Core Architecture", "Query Optimization", "Replication", "Security", "High Availability", "Performance Tuning"]
  },
  {
    id: "dba",
    title: "DBA Training",
    href: "/services/training#dba",
    duration: "8 weeks",
    level: "Intermediate",
    description: "Professional database administration certification program covering day-to-day operations, monitoring, backup, and disaster recovery.",
    topics: ["Administration", "Monitoring", "Backup & Recovery", "Troubleshooting", "Security", "Automation"]
  },
  {
    id: "ai-ml",
    title: "AI/ML for Engineers",
    href: "/services/training#ai-ml",
    duration: "10 weeks",
    level: "Intermediate to Advanced",
    description: "Learn to apply AI and machine learning techniques to database operations and infrastructure management.",
    topics: ["ML Fundamentals", "Anomaly Detection", "Predictive Scaling", "NLP for Ops", "AI Agents", "Automation"]
  },
  {
    id: "sre",
    title: "SRE Training",
    href: "/services/training#sre",
    duration: "6 weeks",
    level: "Advanced",
    description: "Site reliability engineering principles applied to database platforms. Build resilient, self-healing systems.",
    topics: ["SLOs & SLIs", "Incident Response", "Chaos Engineering", "Observability", "Post-Mortems", "Automation"]
  },
  {
    id: "enterprise",
    title: "Enterprise Training",
    href: "/services/training#enterprise",
    duration: "Custom",
    level: "All Levels",
    description: "Custom training programs designed for enterprise teams. Tailored to your specific infrastructure and requirements.",
    topics: ["Custom Curriculum", "Hands-on Labs", "Team Workshops", "Certification", "Ongoing Support", "Best Practices"]
  }
];

export default function TrainingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-accent mb-6">
              Training Programs
            </h1>
            <p className="text-lg text-dark-accent/70 leading-relaxed mb-8">
              Upskill your team with industry-leading training programs designed by PostgreSQL experts 
              and senior database engineers. From fundamentals to advanced internals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Enroll Now
              </Button>
              <Button href="/services" variant="outline" size="lg">
                View All Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Training Programs */}
      <section className="py-20">
        <Container>
          <SectionHeading
            label="Our Programs"
            title="Comprehensive Training Curriculum"
            description="Choose from our range of training programs designed to take your skills to the next level."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {trainingPrograms.map((program) => (
              <div
                key={program.id}
                id={program.id === "dba" ? "dba" : program.id === "ai-ml" ? "ai-ml" : program.id === "sre" ? "sre" : program.id === "enterprise" ? "enterprise" : undefined}
                className="relative p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Duration & Level badges */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-xs font-semibold text-primary">
                    {program.duration}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-xs font-semibold text-accent">
                    {program.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-dark-accent mb-3">
                  {program.title}
                </h3>
                <p className="text-dark-accent/60 leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-lg bg-background text-xs font-medium text-dark-accent/70"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <Button href={program.href} variant="ghost" size="sm">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Our Training */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-accent mb-6">
                Why Choose ByteHubble Training?
              </h2>
              <p className="text-dark-accent/70 leading-relaxed mb-6">
                Our training programs are designed by industry experts with real-world experience 
                in managing enterprise-grade database systems. You&apos;ll learn practical skills 
                that you can apply immediately.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Hands-on labs with real databases</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Expert instructors with enterprise experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Flexible online learning format</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-dark-accent/70">Certification upon completion</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-dark-accent/70">Engineers Trained</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Official Academic Partners Section */}
      <AcademicPartners />

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Upskill Your Team?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Enroll in our training programs today and take your database skills to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Contact Us
              </Button>
              <Button href="/services/support" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Support Services
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

