import { Suspense, lazy } from "react";
import Hero from "@/sections/Hero";
import TrustedBy from "@/sections/TrustedBy";
import Problem from "@/sections/Problem";
import PlatformOverview from "@/sections/PlatformOverview";
import Blog from "@/sections/Blog";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";

// Lazy load components below the fold for better performance
const LogoCloud = lazy(() => import("@/components/logo-cloud/LogoCloud"));

// Loading skeleton for lazy components
function SectionLoader() {
  return (
    <div className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Problem />
      <PlatformOverview />
      <Suspense fallback={<SectionLoader />}>
        <LogoCloud />
      </Suspense>
      <Blog />
      <NewsletterSection />
      <CTA />
      <Footer />
    </>
  );
}

