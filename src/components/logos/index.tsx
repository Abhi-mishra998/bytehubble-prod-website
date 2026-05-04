/**
 * Technology logo components for the Logo Cloud section.
 * Each renders a recognizable SVG icon + wordmark at the brand color.
 * Shared LogoProps interface keeps the API consistent.
 */

interface LogoProps {
  className?: string;
}

// Re-export the logo components
export { default as PostgreSQLLogo } from "./PostgreSQLLogo";
export { default as MySQLLogo } from "./MySQLLogo";

// Placeholder logos for technologies not yet implemented
// These can be replaced with actual SVG implementations later

export function MongoDBLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4l2 12c0 4-1 8-2 12-1-4-2-8-2-12L14 4z" fill="#00ED64" />
      <path d="M14 4c3 4 5 8 5 14s-2 10-5 14" fill="none" stroke="#001E2B" strokeWidth="1.5" />
      <path d="M14 4c-3 4-5 8-5 14s2 10 5 14" fill="none" stroke="#001E2B" strokeWidth="1.5" />
      <text x="24" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#001E2B">MongoDB</text>
    </svg>
  );
}

export function RedisLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6l12 6-12 6-12-6 12-6z" fill="#DC382D" />
      <path d="M14 18l12 6-12 6-12-6 12-6z" fill="#DC382D" opacity="0.7" />
      <text x="30" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#DC382D">Redis</text>
    </svg>
  );
}

export function AWSLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 24L14 8l8 16" stroke="#232F3E" strokeWidth="2.5" fill="none" />
      <path d="M9 19h10" stroke="#FF9900" strokeWidth="2.5" />
      <text x="28" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#232F3E">AWS</text>
    </svg>
  );
}

export function GoogleCloudLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="6" fill="none" stroke="#4285F4" strokeWidth="3" />
      <circle cx="14" cy="18" r="3" fill="#EA4335" />
      <path d="M18 14l4-4" stroke="#FBBC05" strokeWidth="2" />
      <path d="M18 22l4 4" stroke="#34A853" strokeWidth="2" />
      <text x="26" y="24" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="14" fill="#5F6368">Google Cloud</text>
    </svg>
  );
}

export function AzureLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 28L14 6l6 14L28 28H4z" fill="#0078D4" />
      <text x="34" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#0078D4">Azure</text>
    </svg>
  );
}

export function CloudflareLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 22c0-5 4-9 9-9 4 0 7 2 8 5h3c3 0 5 2 5 5H6z" fill="#F48120" />
      <text x="34" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#404040">Cloudflare</text>
    </svg>
  );
}

export function DockerLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="16" width="5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="8" y="16" width="5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="14" y="16" width="5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="8" y="11" width="5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="14" y="11" width="5" height="4" rx="0.5" fill="#2496ED" />
      <rect x="14" y="6" width="5" height="4" rx="0.5" fill="#2496ED" />
      <path d="M0 22c2-1 4-1 21-1 1-3 0-6-1-8 0 0 3 1 5 3 2-1 4-3 5-4-1 2-1 4 0 6 4 1 7 4 8 7-7 8-18 8-28 2-4-1-7-3-10-5z" fill="#2496ED" />
      <text x="38" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#2496ED">Docker</text>
    </svg>
  );
}

export function KubernetesLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4l10 6v12l-10 6-10-6V10l10-6z" fill="#326CE5" />
      <path d="M14 10v12M8 13l6 9M20 13l-6 9" stroke="#fff" strokeWidth="1.5" />
      <circle cx="14" cy="18" r="2" fill="#fff" />
      <text x="28" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#326CE5">Kubernetes</text>
    </svg>
  );
}

export function TerraformLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 8l8 4.5v9L10 17V8z" fill="#7B42BC" />
      <path d="M20 12.5l8 4.5v9l-8-4.5v-9z" fill="#7B42BC" />
      <path d="M20 3l8 4.5v9l-8-4.5V3z" fill="#7B42BC" opacity="0.6" />
      <text x="34" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#7B42BC">Terraform</text>
    </svg>
  );
}

export function NginxLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4l10 6v16l-10 6-10-6V10l10-6z" fill="#009639" />
      <path d="M10 24V12l8 12V12" stroke="#fff" strokeWidth="2" />
      <text x="28" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#009639">Nginx</text>
    </svg>
  );
}

export function PrometheusLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="12" fill="#E6522C" />
      <path d="M8 22h12M8 18h12M8 14h12" stroke="#fff" strokeWidth="1.5" />
      <path d="M10 26h8" stroke="#fff" strokeWidth="2" />
      <text x="30" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#E6522C">Prometheus</text>
    </svg>
  );
}

export function GrafanaLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="12" fill="#F46800" />
      <circle cx="14" cy="18" r="6" fill="#fff" />
      <circle cx="14" cy="18" r="3" fill="#F46800" />
      <text x="30" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#F46800">Grafana</text>
    </svg>
  );
}

export function GitHubLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 4C8.477 4 4 8.477 4 14c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608 1.003.07 1.069-.608.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0114 9.525c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C21.137 22.163 24 18.418 24 14c0-5.523-4.477-10-10-10z"
        fill="#24292F"
      />
      <text x="30" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#24292F">GitHub</text>
    </svg>
  );
}

export function LinuxLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 90 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="16" rx="8" ry="10" fill="#333" />
      <ellipse cx="14" cy="14" rx="5" ry="6" fill="#FCC624" />
      <circle cx="12" cy="13" r="1" fill="#333" />
      <circle cx="16" cy="13" r="1" fill="#333" />
      <path d="M12 16c0 0 1 2 2 2s2-2 2-2" stroke="#333" strokeWidth="0.8" fill="none" />
      <text x="26" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#333">Linux</text>
    </svg>
  );
}

export function PatroniLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="10" fill="#249CDB" />
      <path d="M10 18l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="28" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#249CDB">Patroni</text>
    </svg>
  );
}

export function LangChainLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10l6 8-6 8 6 0 8-8-8-8-6 0z" fill="#1A1A1A" />
      <path d="M18 10l6 8-6 8 6 0 8-8-8-8-6 0z" fill="#333333" />
      <path d="M30 10l6 8-6 8 6 0 8-8-8-8-6 0z" fill="#4D4D4D" />
      <path d="M42 10l6 8-6 8 6 0 8-8-8-8-6 0z" fill="#666666" />
      <text x="58" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="#1A1A1A">LangChain</text>
    </svg>
  );
}

