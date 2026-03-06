import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => (
  <motion.div
    whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={cn("glass-card p-6 hover-glow", className)}
  >
    {children}
  </motion.div>
);

export default GlassCard;
