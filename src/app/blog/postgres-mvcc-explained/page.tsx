import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import blogArchitImage from "@/assets/blog/blog-archit/blog2-archit.png";

export const metadata: Metadata = {
  title: "Understanding PostgreSQL MVCC Internals — Deep Dive",
  description:
    "Learn how PostgreSQL implements multi-version concurrency control and snapshot isolation under the hood.",
};

export default function PostgresMVCCPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-background to-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-30 -right-30 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
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
                Database Internals
              </span>
              <span className="text-sm text-dark-accent/50">6 min read</span>
              <span className="text-sm text-dark-accent/50">•</span>
              <span className="text-sm text-dark-accent/50">March 8, 2026</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-accent mb-6 leading-tight">
              Understanding PostgreSQL MVCC Internals
            </h1>
            
            <p className="text-xl text-dark-accent/70 leading-relaxed">
              Learn how PostgreSQL implements multi-version concurrency control 
              and snapshot isolation under the hood.
            </p>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Featured Image - MVCC Architecture Diagram */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl mb-12 overflow-hidden">
              <Image
                src={blogArchitImage}
                alt="PostgreSQL MVCC Architecture Diagram"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose-blog">
              <h2>Introduction</h2>
              <p>
                Multi-Version Concurrency Control (MVCC) is the foundation of PostgreSQL&apos;s 
                ability to handle concurrent transactions without locking. Unlike traditional 
                databases that use write locks, PostgreSQL maintains multiple versions of data, 
                allowing readers and writers to operate simultaneously.
              </p>

              <h2>The Tuple Header Structure</h2>
              <p>
                Every row in PostgreSQL (called a "tuple") has a header that contains 
                critical MVCC information:
              </p>

              <pre className="code-block"><code>{`-- Tuple header fields (internal):
-- xmin: Transaction ID that created this tuple
-- xmax: Transaction ID that deleted/updated this tuple
-- cmin: Command ID within creating transaction
-- cmax: Command ID within deleting transaction
-- ctid: Physical location of this tuple version

-- View tuple information
SELECT xmin, xmax, cmin, cmax, ctid, * 
FROM your_table 
WHERE id = 1;`}</code></pre>

              <h2>Transaction IDs and Wraparound</h2>
              <p>
                PostgreSQL uses 32-bit transaction IDs (about 4 billion). While this seems 
                large, it can wrap around. PostgreSQL handles this with a special "frozen" 
                transaction ID (FrozenTransactionId).
              </p>

              <pre className="code-block"><code>{`-- Check transaction ID age
SELECT datname, age(datfrozenxid) 
FROM pg_database;

-- Freeze old tuples to prevent wraparound
VACUUM FREEZE your_table;

-- Set autovacuum freeze parameters
ALTER TABLE your_table 
SET (autovacuum_freeze_max_age = 2000000000);`}</code></pre>

              <h2>How Snapshots Work</h2>
              <p>
                A snapshot determines which tuple versions are visible to a transaction. 
                When you start a transaction, PostgreSQL captures the current transaction 
                state:
              </p>

              <pre className="code-block"><code>{`-- Get current snapshot
SELECT txid_current(), txid_current_snapshot();

-- Snapshot format: xmin:xmax:xip_list
-- Example: 100:100:0,99,98
-- xmin = 100 (oldest active tx)
-- xmax = 100 (no future transactions yet)
-- xip_list = 0,99,98 (in-progress txs)

-- The snapshot says:
-- - All txs < 100 are committed
-- - Txs 98, 99 are in-progress
-- - Tx 100 is the current transaction`}</code></pre>

              <h2>Visibility Rules</h2>
              <p>
                PostgreSQL follows specific rules to determine if a tuple is visible:
              </p>
              <ul>
                <li><strong>If xmin is in progress</strong>: Not visible (unless same transaction)</li>
                <li><strong>If xmin is committed after snapshot</strong>: Not visible</li>
                <li><strong>If xmax is committed and same tx as xmin</strong>: Not visible</li>
                <li><strong>If xmax = 0 (not deleted)</strong>: Visible</li>
                <li><strong>If xmax is in progress</strong>: Not visible</li>
              </ul>

              <pre className="code-block"><code>{`-- Examine visibility for a specific tuple
SELECT 
    xmin::text::bigint as creating_tx,
    xmax::text::bigint as deleting_tx,
    CASE WHEN xmax = 0 THEN 'alive' ELSE 'deleted' END as status,
    *,
    pg_column_size(*) as row_size
FROM users
WHERE id = 1;

-- Check which transactions are visible
SELECT xmin, xmax, * FROM t;`}</code></pre>

              <h2>Update is Delete + Insert</h2>
              <p>
                In PostgreSQL, an UPDATE doesn&apos;t modify the existing tuple. Instead, it:
              </p>
              <ol>
                <li>Marks the old tuple as deleted (sets xmax to current transaction)</li>
                <li>Creates a new tuple with the new values</li>
              </ol>

              <pre className="code-block"><code>{`-- What happens during UPDATE:
-- Original tuple: xmin=50, xmax=0
-- After UPDATE (tx 100):
--   Old tuple: xmin=50, xmax=100 (marked deleted)
--   New tuple: xmin=100, xmax=0 (new version)

-- This is why VACUUM is essential!
-- Dead tuples accumulate until vacuumed

-- Monitor dead tuples
SELECT schemaname, relname, n_dead_tup, 
       last_vacuum, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;`}</code></pre>

              <h2>VACUUM and Visibility Map</h2>
              <p>
                PostgreSQL uses two important maps to track which pages can be vacuumed:
              </p>
              <ul>
                <li><strong>Visibility Map (VM)</strong>: Tracks which pages are all-visible</li>
                <li><strong>Free Space Map (FSM)</strong>: Tracks available space in pages</li>
              </ul>

              <pre className="code-block"><code>{`-- Check visibility map
SELECT 
    relname,
    relkind,
    pg_size_pretty(pg_table_size(oid)) as size,
    n_live_tup,
    n_dead_tup,
    last_autovacuum
FROM pg_class 
JOIN pg_stat_user_tables 
ON oid = relid
WHERE relname LIKE 'users%';

-- Manual vacuum (reclaims space, updates FSM)
VACUUM your_table;

-- VACUUM FULL (rewrites table, locks heavily)
VACUUM FULL your_table;`}</code></pre>

              <h2>Production Best Practices</h2>
              <ul>
                <li><strong>Monitor dead tuples</strong>: High dead tuple counts indicate vacuum issues</li>
                <li><strong>Configure autovacuum</strong>: Tune based on write patterns</li>
                <li><strong>Use appropriate vacuum settings</strong>: For high-write tables, reduce vacuum threshold</li>
                <li><strong>Plan for transaction ID wraparound</strong>: Monitor age() on critical tables</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                Understanding MVCC is essential for PostgreSQL DBA. It explains why your tables 
                grow, why VACUUM is critical, and how PostgreSQL achieves its excellent 
                concurrency characteristics. Proper MVCC management is key to maintaining 
                performance at scale.
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

