import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Manual Incident Response",
    description:
      "Teams spend hours diagnosing database incidents manually, leading to extended downtime and frustrated stakeholders.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance Blind Spots",
    description:
      "Slow queries and configuration drift go undetected until they cascade into production-impacting issues.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Spiraling Cloud Costs",
    description:
      "Over-provisioned databases and unoptimized queries silently drain budgets without clear visibility or control.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "DBA Talent Shortage",
    description:
      "Finding experienced PostgreSQL engineers is increasingly difficult, leaving teams understaffed and overworked.",
  },
];

export default function Problem() {
  return (
    <section id="problem-section" className="py-16 lg:py-20 bg-white scroll-mt-24">
      <Container>
        <SectionHeading
          label="The Challenge"
          title="Database Operations Are Broken"
          description="Enterprise teams struggle with reactive database management. The gap between what databases need and what teams can deliver is growing wider every day."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 rounded-2xl border border-gray-100 bg-background hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {problem.icon}
              </div>
              <h3 className="text-lg font-semibold text-dark-accent mb-2">
                {problem.title}
              </h3>
              <p className="text-dark-accent/60 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
