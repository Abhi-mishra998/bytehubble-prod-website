"use client";

import { motion } from "framer-motion";
import LogoItem from "./LogoItem";
import {
  PostgreSQLLogo,
  MySQLLogo,
  MongoDBLogo,
  RedisLogo,
  AWSLogo,
  GoogleCloudLogo,
  AzureLogo,
  CloudflareLogo,
  DockerLogo,
  KubernetesLogo,
  TerraformLogo,
  NginxLogo,
  PrometheusLogo,
  GrafanaLogo,
  GitHubLogo,
  LinuxLogo,
  PatroniLogo,
  LangChainLogo,
} from "@/components/logos";
import { useMarquee } from "@/hooks/useMarquee";

interface LogoEntry {
  name: string;
  component: React.ReactNode;
}

const logos: LogoEntry[] = [
  { name: "PostgreSQL", component: <PostgreSQLLogo className="h-full w-auto" /> },
  { name: "MySQL", component: <MySQLLogo className="h-full w-auto" /> },
  { name: "MongoDB", component: <MongoDBLogo className="h-full w-auto" /> },
  { name: "Redis", component: <RedisLogo className="h-full w-auto" /> },
  { name: "AWS", component: <AWSLogo className="h-full w-auto" /> },
  { name: "Google Cloud", component: <GoogleCloudLogo className="h-full w-auto" /> },
  { name: "Azure", component: <AzureLogo className="h-full w-auto" /> },
  { name: "Cloudflare", component: <CloudflareLogo className="h-full w-auto" /> },
  { name: "Docker", component: <DockerLogo className="h-full w-auto" /> },
  { name: "Kubernetes", component: <KubernetesLogo className="h-full w-auto" /> },
  { name: "Terraform", component: <TerraformLogo className="h-full w-auto" /> },
  { name: "Nginx", component: <NginxLogo className="h-full w-auto" /> },
  { name: "Prometheus", component: <PrometheusLogo className="h-full w-auto" /> },
  { name: "Grafana", component: <GrafanaLogo className="h-full w-auto" /> },
  { name: "Patroni", component: <PatroniLogo className="h-full w-auto" /> },
  { name: "LangChain", component: <LangChainLogo className="h-full w-auto" /> },
  { name: "GitHub", component: <GitHubLogo className="h-full w-auto" /> },
  { name: "Linux", component: <LinuxLogo className="h-full w-auto" /> },
];

export default function LogoRow() {
  const {
    containerRef,
    duplicatedItems,
    handleMouseEnter,
    handleMouseLeave,
    animationStyle,
    animationTransition,
  } = useMarquee(logos, { duration: 25 });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-10 sm:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={animationTransition}
        style={animationStyle}
      >
        {duplicatedItems.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} name={logo.name}>
            {logo.component}
          </LogoItem>
        ))}
      </motion.div>
    </div>
  );
}

