import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import companyLogo from "@/assets/company.jpeg";

const footerLinks = {
  solutions: {
    title: "Solutions",
    links: [
      { label: "Runbook GPT", href: "/blog" },
      { label: "DB Agents", href: "/blog" },
      { label: "Incident AI", href: "/blog" },
      { label: "Performance Tuning", href: "/services/support" },
      { label: "Cost Optimization", href: "/services" },
    ],
  },
  training: {
    title: "Training",
    links: [
      { label: "PostgreSQL Mastery", href: "/services/training" },
      { label: "DBA Training", href: "/services/training#dba" },
      { label: "AI-ML for Engineers", href: "/services/training#ai-ml" },
      { label: "SRE Training", href: "/services/training#sre" },
      { label: "Enterprise Training", href: "/services/training#enterprise" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Intelligence Hub", href: "/blog" },
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/blog" },
      { label: "API Reference", href: "/blog" },
      { label: "Status Page", href: "/blog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
    ],
  },
};

// Location data
const locations = [
  {
    city: "USA",
    address: "42381 Dogwood Glen Sq",
    state: "Sterling, VA 20166, USA",
  },
  {
    city: "Hyderabad",
    address: "Elite Business Center, 13th Floor #12A02B",
    state: "Manjeera Trinity Corporate, KPHB Phase-3, Hyderabad - 500072",
  },
  {
    city: "JNTUH Innovation Foundation",
    address: "Ground Floor, New Admission Block",
    state: "Kukatpally, Hyderabad - 500085",
  },
];

// SVG Icons as components
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-primary/10">
      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
            {/* Brand column */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-0 mb-4">
                <div className="relative w-32 sm:w-36 md:w-40 h-10 sm:h-11 md:h-12">
                  <Image
                    src={companyLogo}
                    alt="ByteHubble"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </Link>
              
              {/* Brand Domains */}
              <div className="flex items-center gap-2 mb-4">
                <GlobeIcon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  bytehubble.ai
                </span>
                <span className="text-foreground/30">|</span>
                <span className="text-sm font-medium text-foreground">
                  bytehubble.com
                </span>
              </div>
              
              <p className="text-sm text-foreground/70 leading-relaxed mb-6 max-w-xs">
                The AI intelligence layer your PostgreSQL stack is missing.
                Automate, optimize, and transform your database operations.
              </p>

              {/* Contact Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Contact Us
                </h4>
                
                {/* Email */}
                <a
                  href="mailto:support@bytehubble.ai"
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MailIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      support@bytehubble.ai
                    </p>
                  </div>
                </a>

                {/* Locations */}
                {locations.map((location) => (
                  <div key={location.city} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                      <MapPinIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {location.city}
                      </p>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {location.address}
                        <br />
                        {location.state}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-primary/10">
                {[
                  { label: "Twitter", href: "#" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/bytehubbleai/?viewAsMember=true" },
                  { label: "GitHub", href: "https://github.com/Abhi-mishra998" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-foreground/60 hover:text-accent transition-colors text-sm font-medium"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns - spread across remaining columns */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {footerLinks.solutions.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.solutions.links.map((link, index) => (
                  <li key={`solutions-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {footerLinks.training.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.training.links.map((link, index) => (
                  <li key={`training-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {footerLinks.resources.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.links.map((link, index) => (
                  <li key={`resources-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {footerLinks.company.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.links.map((link, index) => (
                  <li key={`company-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} ByteHubble. All rights reserved.
          </p>
          <p className="text-sm text-foreground/50">DB Intelligence Platform</p>
        </div>
      </Container>
    </footer>
  );
}

