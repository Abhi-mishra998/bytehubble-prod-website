import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import blogArchitImage from "@/assets/blog/blog-archit/blog1-archit.png";

export const metadata: Metadata = {
  title: "PostgreSQL Is Not What You Think — Deep Internals Exploration",
  description:
    "A deep exploration of PostgreSQL internals including MVCC snapshots, WAL-based CDC, JIT compilation, and vector search architecture.",
};

export default function PostgreSQLDeepDivePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-background to-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-30 -right-30 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <Container>
          <div className="max-w-4xl mx-auto relative">
<Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-dark-accent/60 hover:text-primary transition-colors mb-8 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-semibold rounded-full border border-primary/10">
                Database Engineering
              </span>
              <span className="text-sm text-dark-accent/50">8 min read</span>
              <span className="text-sm text-dark-accent/50">•</span>
              <span className="text-sm text-dark-accent/50">March 10, 2026</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-accent mb-6 leading-tight">
              PostgreSQL Is Not What You Think
            </h1>
            
            <p className="text-xl text-dark-accent/70 leading-relaxed">
              A deep exploration of PostgreSQL internals including MVCC snapshots, 
              WAL-based CDC, JIT compilation, and vector search architecture.
            </p>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Featured Image - PostgreSQL Architecture Diagram */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl mb-12 overflow-hidden">
              <Image
                src={blogArchitImage}
                alt="PostgreSQL Architecture Diagram"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose-blog">
              <h2>Introduction</h2>
              <p>
                PostgreSQL is often dismissed as a "traditional" database — a reliable, 
                if unexciting, choice for enterprise applications. But beneath the surface lies 
                one of the most sophisticated engineering achievements in the database world.
              </p>
              <p>
                In this article, we will explore the internals that make PostgreSQL capable of 
                handling modern workloads: from multi-version concurrency control (MVCC) to 
                Write-Ahead Logging (WAL), Just-In-Time (JIT) compilation, and the emerging 
                vector search capabilities.
              </p>

              <h2>Understanding MVCC Snapshots</h2>
              <p>
                PostgreSQL&apos;s MVCC implementation is fundamentally different from most databases. 
                Rather than using a single global transaction ID, PostgreSQL uses a combination of 
                transaction IDs and tuple visibility rules.
              </p>

              <h3>The Snapshot Architecture</h3>
              <p>
                When you execute a query, PostgreSQL takes a snapshot that determines which 
                tuples are visible to your transaction. This snapshot contains:
              </p>
              <ul>
                <li><strong>Xmin</strong>: The oldest active transaction ID</li>
                <li><strong>Xmax</strong>: The transaction ID that marks the upper boundary</li>
                <li><strong>Xip list</strong>: List of in-progress transaction IDs</li>
              </ul>

              <h3>Visibility Rules</h3>
              <pre className="code-block"><code>{`-- Tuple is visible if:
-- 1. Xmin is committed AND not in Xip list
-- 2. Xmin == current transaction ID
-- 3. Xmin is marked as committed (before snapshot time)

SELECT txid_current(),
       txid_current_snapshot();

-- Example output:
-- txid_current |      txid_current_snapshot
-- -------------+--------------------------------
--          100 | 100:100:0,99,98`}</code></pre>

              <h2>WAL-Based Change Data Capture</h2>
              <p>
                PostgreSQL&apos;s Write-Ahead Logging is the foundation for both durability 
                and replication. Every change to the database is written to the WAL before 
                being applied to the heap.
              </p>

              <h3>CDC Architecture</h3>
              <p>
                The WAL-based CDC pattern has become essential for modern data architectures:
              </p>
              <pre className="code-block"><code>{`-- Enable logical replication
ALTER SYSTEM SET wal_level = logical;

-- Create a publication
CREATE PUBLICATION my_publication FOR ALL TABLES;

-- Create a slot for CDC
CREATE_REPLICATION_SLOT slot0 LOGICAL output_plugin 'pgoutput';`}</code></pre>

              <h2>JIT Compilation</h2>
              <p>
                Since PostgreSQL 11, Just-In-Time (JIT) compilation can accelerate 
                expression evaluation and tuple deforming. This is particularly valuable 
                for analytical workloads.
              </p>

              <pre className="code-block"><code>{`-- Check JIT availability
SELECT jit_enabled, jit_above_threshold, 
       jit_optimize_above_threshold 
FROM pg_settings 
WHERE name LIKE 'jit%';

-- Enable JIT for session
SET jit = on;
SET jit_above_threshold = 10000;`}</code></pre>

              <h2>Vector Search with pgvector</h2>
              <p>
                The pgvector extension brings embedding-based similarity search to PostgreSQL, 
                enabling AI and ML applications to run directly on your relational data.
              </p>

              <pre className="code-block"><code>{`-- Create a vector column
CREATE TABLE embeddings (
    id bigserial PRIMARY KEY,
    document_id bigint,
    embedding vector(1536)
);

-- Create HNSW index for fast search
CREATE INDEX ON embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Query for similar embeddings
SELECT id, document_id, 
       1 - (embedding <=> $query_embedding) as similarity
FROM embeddings
ORDER BY embedding <=> $query_embedding
LIMIT 10;`}</code></pre>

              <h2>Production Insights</h2>
              <p>
                Running PostgreSQL in production requires understanding these internals:
              </p>
              <ul>
                <li><strong>VACUUM Strategy</strong>: Regular VACUUM is essential to reclaim space from dead tuples</li>
                <li><strong>WAL Archiving</strong>: Configure appropriate archive_timeout for your RPO requirements</li>
                <li><strong>Connection Pooling</strong>: Use PgBouncer or PgCat for high-concurrency workloads</li>
                <li><strong>Monitoring</strong>: Track vacuum progress, WAL usage, and cache hit ratios</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                PostgreSQL is far from a "simple" database. Its sophisticated internals — from 
                MVCC to WAL-based replication to JIT compilation — make it a powerhouse for 
                modern workloads. Understanding these concepts is essential for DBAs and 
                engineers building production systems.
              </p>
              <p>
                As AI and vector-based workloads become more prevalent, PostgreSQL continues 
                to evolve. With extensions like pgvector, it&apos;s positioned as a unified 
                platform for both transactional and analytical workloads.
              </p>
            </div>

            {/* Author Bio */}
            <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  BH
                </div>
                <div>
                  <p className="font-bold text-dark-accent text-lg">ByteHubble Engineering</p>
                  <p className="text-dark-accent/60">Database Intelligence Platform</p>
                  <p className="text-dark-accent/50 text-sm mt-1">Helping teams build better databases with AI-powered insights.</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="max-w-4xl mx-auto mt-12">
<Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </div>
  );
}

