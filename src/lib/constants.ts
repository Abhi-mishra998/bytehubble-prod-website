export const SITE_CONFIG = {
  name: "ByteHubble",
  tagline: "DB Intelligence Platform",
  description:
    "ByteHubble is the AI intelligence layer your PostgreSQL stack is missing — combining enterprise knowledge RAG, autonomous DB agents, self-healing incident AI, and world-class database training.",
  url: "https://bytehubble.com",
};

export const NAV_LINKS = {
  solutions: {
    label: "Solutions",
    items: [
      {
        title: "Runbook GPT",
        href: "/blog",
        description: "AI-powered runbook automation for database operations",
      },
      {
        title: "DB Agents",
        href: "/blog",
        description: "Autonomous agents that monitor and manage your databases",
      },
      {
        title: "Incident AI",
        href: "/blog",
        description: "Self-healing incident detection and resolution",
      },
      {
        title: "Performance Tuning",
        href: "/services/support",
        description: "AI-driven query optimization and performance analysis",
      },
      {
        title: "Cost Optimization",
        href: "/services",
        description: "Reduce infrastructure costs with intelligent resource management",
      },
    ],
  },
  services: {
    label: "Services",
    items: [
      // SUPPORT Group
      {
        title: "Database Support",
        href: "/services/support",
        description: "24/7 expert database support for mission-critical systems",
        group: "SUPPORT",
      },
      {
        title: "Performance Tuning",
        href: "/services/support#performance",
        description: "Optimize your database performance with expert analysis",
        group: "SUPPORT",
      },
      {
        title: "Incident Response",
        href: "/services/support#incident",
        description: "Rapid incident response to minimize downtime",
        group: "SUPPORT",
      },
      {
        title: "Monitoring & Reliability",
        href: "/services/support#monitoring",
        description: "Proactive monitoring and reliability engineering",
        group: "SUPPORT",
      },
      // Service Offerings
      {
        title: "Data Migration",
        href: "/services#migration",
        description: "Seamless migration services with zero downtime",
        group: "SERVICES",
      },
      {
        title: "Database Optimization",
        href: "/services#optimization",
        description: "Comprehensive database optimization services",
        group: "SERVICES",
      },
      {
        title: "Cloud Architecture",
        href: "/services#cloud",
        description: "Design and implement scalable cloud architectures",
        group: "SERVICES",
      },
      {
        title: "DevOps Automation",
        href: "/services#devops",
        description: "Automate your database operations with DevOps practices",
        group: "SERVICES",
      },
      {
        title: "Cost Optimization",
        href: "/services#cost",
        description: "Reduce infrastructure costs with intelligent optimization",
        group: "SERVICES",
      },
    ],
  },
  training: {
    label: "Training",
    items: [
      {
        title: "Applied AI Engineer Mastery",
        href: "/training/applied-ai-mastery",
        description: "Stanford-inspired 7-phase AI program for fresh graduates — 16 weeks",
        group: "TRAINING",
      },
      {
        title: "MongoDB DBA Mastery",
        href: "/training/mongodb-dba",
        description: "Complete NoSQL administration — replication, sharding, cloud deployment — 12 weeks",
        group: "TRAINING",
      },
      {
        title: "MS SQL Server DBA",
        href: "/training/mssql-dba",
        description: "Industry-ready SQL Server DBA program with DP-300 certification prep — 12 weeks",
        group: "TRAINING",
      },
      {
        title: "PostgreSQL Migration",
        href: "/training/postgresql-migration",
        description: "Master enterprise migrations from Oracle & MSSQL to PostgreSQL — 15 weeks",
        group: "TRAINING",
      },
      {
        title: "Master Claude AI",
        href: "/training/master-claude-ai",
        description: "Complete Claude mastery for CTOs, Employees & Developers — 60 days, 15 modules, certification",
        group: "TRAINING",
      },
      {
        title: "PostgreSQL Mastery",
        href: "/training",
        description: "Master PostgreSQL from fundamentals to advanced internals",
      },
      {
        title: "DBA Training",
        href: "/training#dba",
        description: "Professional database administration certification program",
      },
      {
        title: "AI/ML for Engineers",
        href: "/training#ai-ml",
        description: "Applied AI and ML techniques for infrastructure engineers",
      },
      {
        title: "SRE Training",
        href: "/training#sre",
        description: "Site reliability engineering for database platforms",
      },
      {
        title: "Enterprise Training",
        href: "/training#enterprise",
        description: "Custom training programs for enterprise teams",
      },
    ],
  },
  resources: {
    label: "Resources",
    items: [
      {
        title: "Intelligence Hub",
        href: "/blog",
        description: "Research, whitepapers, and industry analysis",
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest insights on database management and AI",
      },
      {
        title: "Documentation",
        href: "/blog",
        description: "Technical documentation and API references",
      },
    ],
  },
};

export const PLATFORM_FEATURES = [
  {
    title: "Incident & HA AI",
    description:
      "Autonomous incident triage and high-availability orchestration for mission-critical PostgreSQL systems.",
    icon: "shield",
    href: "/blog",
  },
  {
    title: "Query & Index Intelligence AI",
    description:
      "AI-driven query performance optimization and automated index lifecycle management.",
    icon: "cpu",
    href: "/services/support",
  },
  {
    title: "Capacity & FinOps AI",
    description:
      "Predict database growth, orchestrate disaster recovery, and continuously optimize infrastructure costs.",
    icon: "chart",
    href: "/services",
  },
  {
    title: "Runbook GPT & Security AI",
    description:
      "Enterprise knowledge intelligence and security automation for PostgreSQL operations.",
    icon: "book",
    href: "/blog",
  },
];

export const POSTGRES_FEATURES = [
  {
    title: "Automated Query Optimization",
    description:
      "AI analyzes slow queries, suggests index strategies, and automatically tunes your PostgreSQL configuration for peak performance.",
  },
  {
    title: "Intelligent Vacuum Management",
    description:
      "Smart autovacuum tuning that adapts to your workload patterns, preventing table bloat and maintaining query speed.",
  },
  {
    title: "Replication Monitoring",
    description:
      "Real-time monitoring of streaming replication lag, automatic failover detection, and replica health assessment.",
  },
  {
    title: "Connection Pooling Intelligence",
    description:
      "Dynamic connection pool management that scales based on traffic patterns and prevents connection exhaustion.",
  },
  {
    title: "Backup & Recovery Automation",
    description:
      "Automated backup scheduling, point-in-time recovery testing, and disaster recovery validation.",
  },
  {
    title: "Security & Compliance",
    description:
      "Continuous security auditing, role-based access analysis, and compliance reporting for your database infrastructure.",
  },
];

export const TRAINING_PROGRAMS = [
  {
    id: "01",
    title: "Enterprise RAG + Agents Platform",
    description: "Multi-source document Q&A with agentic follow-up, citations, and role-based access control. Deployed on AWS.",
    topics: ["LangChain", "Pinecone", "FastAPI", "Docker", "AWS"],
    category: "Enterprise",
  },
  {
    id: "02",
    title: "Autonomous Multi-Agent Workflow",
    description: "Orchestrator + specialist agents solving complex multi-step tasks. Real-time monitoring via LangSmith dashboard.",
    topics: ["LangGraph", "CrewAI", "FastAPI", "Redis"],
    category: "Enterprise",
  },
  {
    id: "03",
    title: "Fine-Tuned Domain AI Assistant",
    description: "Custom LLM fine-tuned on industry dataset. LoRA adapter training, evaluation pipeline, and production serving.",
    topics: ["QLoRA", "HuggingFace", "vLLM", "Gradio"],
    category: "Fine-Tuned",
  },
  {
    id: "04",
    title: "Multimodal RAG Pipeline",
    description: "Image, table, and text retrieval from complex documents. PDF layout-aware extraction with ColPali visual embeddings.",
    topics: ["ColPali", "Weaviate", "GPT-4o", "Streamlit"],
    category: "Multimodal",
  },
  {
    id: "05",
    title: "AI-Powered REST API Backend",
    description: "Production FastAPI service with LLM integration, streaming responses, token tracking, and rate limiting.",
    topics: ["FastAPI", "PostgreSQL", "Docker", "Celery"],
    category: "Backend",
  },
  {
    id: "06+",
    title: "Phase Mini Projects",
    description: "Additional hands-on builds across each phase: prompt pipelines, vector search apps, RL reward models, and more.",
    topics: ["LangChain", "PyTorch", "ChromaDB", "Plotly"],
    category: "Phase Mini Projects",
  },
];

export const BLOG_POSTS = [
  {
    title: "PostgreSQL Is Not What You Think",
    excerpt:
      "A deep exploration of PostgreSQL internals including MVCC snapshots, WAL-based CDC, JIT compilation, and vector search architecture.",
    category: "Database Engineering",
    date: "2026-03-10",
    readTime: "8 min read",
    slug: "postgresql-deep-dive",
    image: "/blog/blog1.png",
  },
  {
    title: "Understanding PostgreSQL MVCC Internals",
    excerpt:
      "Learn how PostgreSQL implements multi-version concurrency control and snapshot isolation under the hood.",
    category: "Database Internals",
    date: "2026-03-08",
    readTime: "6 min read",
    slug: "postgres-mvcc-explained",
    image: "/blog/blog2.png",
  },
  {
    title: "PostgreSQL as AI Infrastructure",
    excerpt:
      "Using PostgreSQL, pgvector, and relational architecture to power modern AI pipelines and RAG systems.",
    category: "AI Engineering",
    date: "2026-03-05",
    readTime: "7 min read",
    slug: "postgres-ai-infrastructure",
    image: "/blog/blog3.png",
  },
];

export const ACADEMIC_PARTNERS = [
  {
    name: "JNTU Hyderabad",
    fullName: "Jawaharlal Nehru Technological University Hyderabad",
    description: "Partner institution for enterprise database engineering and advanced PostgreSQL training programs.",
  },
  {
    name: "Amity University",
    fullName: "Amity University",
    description: "Academic collaboration for cloud-native architecture and modern data engineering practices.",
  },
  {
    name: "Mohan Babu University",
    fullName: "Mohan Babu University (MBU), Tirupati",
    description: "Partner for industry-focused database engineering and DevOps training initiatives.",
  },
];
