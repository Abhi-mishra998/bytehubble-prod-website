import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { BLOG_POSTS } from "@/lib/constants";

// Force static generation at build time
export const dynamic = "force-static";
export const dynamicParams = true;

export const metadata = {
  title: "Engineering Blog — ByteHubble",
  description:
    "Deep technical insights on PostgreSQL internals, database engineering, AI infrastructure, and modern data platforms.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-background to-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <Container>
          <div className="text-center max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Engineering Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-accent mb-6 leading-tight">
              Engineering Blog
            </h1>
            <p className="text-lg md:text-xl text-dark-accent/70 leading-relaxed max-w-2xl mx-auto">
              Deep technical insights on database internals, AI infrastructure, 
              and building production-ready systems at scale.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-gray-100 bg-white hover:bg-white hover:shadow-2xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Blog Image */}
                <div className="h-52 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/15 group-hover:to-accent/15 transition-all duration-300" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-accent/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/10">
                      {post.category}
                    </span>
                    <span className="text-xs text-dark-accent/50 font-medium">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-dark-accent mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-dark-accent/60 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Read article</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <Container>
          <div className="max-w-2xl mx-auto text-center relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark-accent mb-4">
              Stay Updated with ByteHubble
            </h2>
            <p className="text-dark-accent/60 mb-8 leading-relaxed">
              Get the latest insights on database engineering and AI infrastructure delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-dark-accent/40 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

