"use client";

import { motion } from "framer-motion";

interface BackdropProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Backdrop({ onClick, children }: BackdropProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
