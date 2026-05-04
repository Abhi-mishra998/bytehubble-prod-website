import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { BLOG_POSTS } from "@/lib/constants";

export default function Blog() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <Container>
        <SectionHeading
          label="Intelligence Hub"
          title="Insights & Research"
          description="Stay ahead with the latest research, best practices, and thought leadership in database engineering and AI operations."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-gray-100 bg-background hover:bg-white hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Blog Image */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/15 group-hover:to-accent/15 transition-all duration-300" />
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <p className="text-sm text-dark-accent/60 leading-relaxed line-clamp-2">
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

        <div className="mt-14 text-center">
          <Button href="/blog" variant="outline">
            View All Articles
          </Button>
        </div>
      </Container>
    </section>
  );
}
