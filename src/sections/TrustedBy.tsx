"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import chatbucket from "@/assets/partners/chatbucket.png";
import cloudcontrol from "@/assets/partners/cloudcontrol.png";
import infospoke from "@/assets/partners/inforspoke.png";
import opensourcedb from "@/assets/partners/opensourcedb.png";
import paycio from "@/assets/partners/paycio.png";
import pcom from "@/assets/partners/pcom.png";
import superlogix from "@/assets/partners/superlogix.png";
import lowtouch from "@/assets/partners/lowtouch.ai.png";
import tentacletech from "@/assets/partners/tentacle-tech.png";

interface Partner {
  name: string;
  logo: typeof chatbucket;
}

const partners: Partner[] = [
  { name: "ChatBucket", logo: chatbucket },
  { name: "CloudControl", logo: cloudcontrol },
  { name: "Infospoke", logo: infospoke },
  { name: "OpenSourceDB", logo: opensourcedb },
  { name: "Paycio", logo: paycio },
  { name: "PCOM", logo: pcom },
  { name: "Superlogix", logo: superlogix },
  { name: "Low Touch.ai", logo: lowtouch },
  { name: "Tentacle Tech", logo: tentacletech },
];

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "",
  duration = 2 
}: { 
  value: number; 
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustedBy() {
  // Duplicate partners for seamless infinite scroll (single line)
  const allPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-8 md:py-12 lg:py-14 overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 md:mb-8 px-4"
      >
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm font-semibold tracking-widest text-primary/70 uppercase mb-2"
        >
          Trusted By Industry Leaders
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-3xl lg:text-4xl font-bold text-[#2E2A8F]"
        >
          Our Clients & Partners
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mt-2 md:mt-3 w-14 md:w-20 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full"
        />
      </motion.div>

      {/* Single Line Infinite Scrolling Marquee - Responsive */}
      <div className="relative mb-6 md:mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          className="flex gap-4 md:gap-6 lg:gap-8"
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {allPartners.map((partner, index) => (
            <motion.div
              key={`marquee-${partner.name}-${index}`}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex-shrink-0 flex items-center justify-center p-2.5 md:p-4 lg:p-5 bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                className="h-6 w-auto md:h-8 lg:h-10 xl:h-12 object-contain"
                style={{ 
                  filter: partner.name === "Low Touch.ai" || partner.name === "CloudControl" ? "brightness(0) opacity(0.7)" : "none",
                  minWidth: "60px"
                }}
                unoptimized
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trust Stats - Responsive Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4"
      >
        <div className="max-w-4xl mx-auto pt-4 md:pt-6 border-t border-gray-200/60">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {/* Enterprise Clients */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="text-center py-2"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2E2A8F]">
                <AnimatedCounter value={50} />+
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-500 mt-1">
                Enterprise Clients
              </p>
            </motion.div>

            {/* Uptime SLA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="text-center py-2"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                99.9<span className="text-sm md:text-base">%</span>
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-500 mt-1">
                Uptime SLA
              </p>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="text-center py-2"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                24<span className="text-sm md:text-base">/</span>7
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-500 mt-1">
                Support
              </p>
            </motion.div>

            {/* Countries */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="text-center py-2"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">
                <AnimatedCounter value={10} />+
              </p>
              <p className="text-xs md:text-sm font-medium text-gray-500 mt-1">
                Countries
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Background Decoration */}
      <motion.div
        className="absolute top-16 md:top-20 left-0 w-40 md:w-64 h-40 md:h-64 bg-primary/5 rounded-full blur-2xl md:blur-3xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-16 md:bottom-20 right-0 w-48 md:w-72 h-48 md:h-72 bg-accent/5 rounded-full blur-2xl md:blur-3xl -z-10"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}

