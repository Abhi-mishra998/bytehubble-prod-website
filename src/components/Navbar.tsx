"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import companyLogo from "@/assets/company.jpeg";

interface DropdownItem {
  title: string;
  href: string;
  description: string;
  group?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggle: (e: React.MouseEvent) => void;
}

function DropdownMenu({ label, items, isOpen, onMouseEnter, onMouseLeave, onToggle }: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Group items by their group property
  const groupedItems = items.reduce((acc, item) => {
    const group = item.group || "OTHER";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, DropdownItem[]>);

  // Define group order
  const groupOrder = ["SUPPORT", "TRAINING", "SERVICES", "OTHER"];
  const sortedGroups = groupOrder.filter(g => groupedItems[g]);

  return (
    <div 
      ref={dropdownRef}
      className="relative h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-dark-accent/80 hover:text-primary transition-colors cursor-pointer h-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown with smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-80 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50 max-h-[70vh] overflow-y-auto"
          >
            {sortedGroups.map((group) => (
              <div key={group}>
                <div className="px-4 py-2 text-xs font-semibold text-primary uppercase tracking-wider">
                  {group}
                </div>
                {groupedItems[group].map((item, index) => (
                  <Link
                    key={`${group}-${index}`}
                    href={item.href}
                    className="block px-4 py-3 hover:bg-background transition-colors"
                  >
                    <span className="block text-sm font-semibold text-dark-accent">
                      {item.title}
                    </span>
                    <span className="block text-xs text-dark-accent/60 mt-0.5">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { openModal } = useConsultationModal();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    if (openDropdown === key) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(key);
    }
  };

  const handleMouseEnter = (key: string) => {
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5' 
          : 'bg-white/80 backdrop-blur-lg'
      } border-b border-gray-100`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="ByteHubble Home">
            <div className="relative w-32 sm:w-36 md:w-40 h-10 sm:h-11 md:h-12">
              <Image
                src={companyLogo}
                alt="ByteHubble"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            <DropdownMenu
              label={NAV_LINKS.solutions.label}
              items={NAV_LINKS.solutions.items}
              isOpen={openDropdown === "solutions"}
              onToggle={(e) => toggleDropdown(e, "solutions")}
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            />
            <DropdownMenu
              label={NAV_LINKS.services.label}
              items={NAV_LINKS.services.items}
              isOpen={openDropdown === "services"}
              onToggle={(e) => toggleDropdown(e, "services")}
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            />
            <DropdownMenu
              label={NAV_LINKS.training.label}
              items={NAV_LINKS.training.items}
              isOpen={openDropdown === "training"}
              onToggle={(e) => toggleDropdown(e, "training")}
              onMouseEnter={() => handleMouseEnter("training")}
              onMouseLeave={handleMouseLeave}
            />
            <DropdownMenu
              label={NAV_LINKS.resources.label}
              items={NAV_LINKS.resources.items}
              isOpen={openDropdown === "resources"}
              onToggle={(e) => toggleDropdown(e, "resources")}
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            />
            <Link
              href="/about"
              className="text-sm font-medium text-dark-accent/80 hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={openModal}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-dark-accent cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Solutions */}
              <MobileDropdown label="Solutions" items={NAV_LINKS.solutions.items} />
              {/* Services */}
              <MobileDropdown label="Services" items={NAV_LINKS.services.items} />
              {/* Training */}
              <MobileDropdown label="Training" items={NAV_LINKS.training.items} />
              {/* Resources */}
              <MobileDropdown label="Resources" items={NAV_LINKS.resources.items} />
              
              <Link
                href="/about"
                className="block text-sm font-medium text-dark-accent/80 py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    openModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm font-semibold text-white bg-primary rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileDropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Group items by their group property
  const groupedItems = items.reduce((acc, item) => {
    const group = item.group || "OTHER";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, DropdownItem[]>);

  // Define group order
  const groupOrder = ["SUPPORT", "TRAINING", "SERVICES", "OTHER"];
  const sortedGroups = groupOrder.filter(g => groupedItems[g]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-medium text-dark-accent/80 py-2 cursor-pointer hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-2 space-y-3 pb-2 overflow-hidden"
          >
            {sortedGroups.map((group) => (
              <div key={group}>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider py-1">
                  {group}
                </div>
                {groupedItems[group].map((item, index) => (
                  <Link
                    key={`${group}-${index}`}
                    href={item.href}
                    className="block text-sm text-dark-accent/60 hover:text-primary py-2 pl-2 transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

