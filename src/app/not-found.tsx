import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <h1 className="text-[150px] lg:text-[200px] font-bold text-primary/10 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-dark-accent mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-dark-accent/70 leading-relaxed mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been 
            moved or deleted, or you may have typed the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" size="lg">
              Go Home
            </Button>
            <Button href="/blog" variant="outline" size="lg">
              Read Documentation
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-dark-accent mb-4 uppercase tracking-wider">
              Popular Pages
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/about" 
                className="text-primary hover:underline"
              >
                About Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                href="/services" 
                className="text-primary hover:underline"
              >
                Services
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                href="/services/training" 
                className="text-primary hover:underline"
              >
                Training
              </Link>
              <span className="text-gray-300">•</span>
              <Link 
                href="/services/support" 
                className="text-primary hover:underline"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

