import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="relative rounded-3xl bg-brand-gradient px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Database Operations?
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Join leading engineering teams who trust ByteHubble to automate,
              optimize, and secure their PostgreSQL infrastructure. Get started
              with a personalized demo today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/blog"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
                size="lg"
              >
                Read Documentation
              </Button>
              
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
