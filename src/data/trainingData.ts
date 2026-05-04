export interface TrainingCategory {
  title: string;
  slug: string;
  description: string;
  courses: string[];
}

export const trainingData: TrainingCategory[] = [
  {
    title: "Database Administration (DBA)",
    slug: "dba",
    description: "Master relational and NoSQL database administration.",
    courses: [
      "PostgreSQL DBA",
      "PostgreSQL Advanced DBA with DevOps",
      "PostgreSQL Performance Tuning",
      "PostgreSQL Migration (Oracle → PostgreSQL, MSSQL → PostgreSQL)",
      "MongoDB DBA",
      "Redis DBA",
      "Cassandra DBA",
      "Microsoft SQL Server (MSSQL) DBA",
      "MySQL DBA",
      "Oracle DBA",
      "Oracle 23c AI DBA",
      "Oracle 26 AI DBA",
      "Oracle Exadata Administration",
      "Oracle GoldenGate",
    ],
  },
  {
    title: "Data Platforms & Modern Databases",
    slug: "data-platforms",
    description: "Work with modern distributed data systems.",
    courses: [
      "Elasticsearch Engineering",
      "Apache Kafka (Streaming & Event Systems)",
      "ClickHouse DBA",
      "Snowflake DBA",
    ],
  },
  {
    title: "AI for Database & Data Professionals",
    slug: "ai-for-data",
    description: "Apply AI to database and data workflows.",
    courses: [
      "AI for DBAs",
      "AI for Data Engineering",
      "Applied AI for Engineering Roles",
      "AI for SRE / DevOps",
      "AI for Productivity",
      "AI for Entrepreneurs",
    ],
  },
  {
    title: "Architecture & Engineering Roles",
    slug: "architecture",
    description: "Design scalable and intelligent systems.",
    courses: [
      "Database Architect",
      "AI Data / Platform Solution Architect",
      "AI Solution Architect",
      "Cloud AI Architect (AWS, Azure, GCP)",
      "Claude Architect",
      "AWS Solution Architect",
      "OCI Architect",
    ],
  },
  {
    title: "Data Engineering & Analytics",
    slug: "data-engineering",
    description: "Build modern data pipelines and analytics systems.",
    courses: [
      "Data Engineer (Azure Databricks)",
      "Data Engineering with Modern AI Tools",
    ],
  },
  {
    title: "AI & Machine Learning Engineering",
    slug: "ai-ml",
    description: "Develop AI/ML systems end-to-end.",
    courses: ["AI/ML Engineer", "Full Stack AI Engineer"],
  },
  {
    title: "Product & Leadership",
    slug: "product",
    description: "Lead AI-driven products and teams.",
    courses: ["AI Product Manager"],
  },
  {
    title: "DevOps & SRE",
    slug: "devops",
    description: "Operate scalable and reliable systems.",
    courses: ["DevOps / SRE Engineering"],
  },
  {
    title: "Programming & Query Languages",
    slug: "programming",
    description: "Master core query and programming languages.",
    courses: ["SQL & PL/SQL"],
  },
];

export function getCategoryBySlug(slug: string): TrainingCategory | undefined {
  return trainingData.find((c) => c.slug === slug);
}
