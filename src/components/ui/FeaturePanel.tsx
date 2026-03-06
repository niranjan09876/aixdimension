import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";

interface FeaturePanelProps {
    title: string;
    description: string;
    illustration?: ReactNode;
    reversed?: boolean;
    actionText?: string;
    className?: string;
}

export const FeaturePanel = ({
    title,
    description,
    illustration,
    reversed = false,
    actionText = "Learn More",
    className,
}: FeaturePanelProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className={cn("mb-20 last:mb-0", className)}
        >
            <GlassCard
                hover={false}
                className={cn(
                    "grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12 overflow-hidden relative",
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 blur-3xl pointer-events-none" />

                <motion.div
                    className={cn("flex flex-col z-10", reversed && "lg:order-2")}
                    variants={{
                        hidden: { opacity: 0, x: reversed ? 40 : -40 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
                    }}
                >
                    <motion.h3
                        className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight leading-tight"
                    >
                        {title}
                    </motion.h3>
                    <motion.p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                        {description}
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold gradient-bg text-primary-foreground text-sm transition-shadow hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                    >
                        {actionText} <ArrowRight size={16} />
                    </motion.button>
                </motion.div>

                <motion.div
                    className={cn("relative w-full aspect-square md:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden glass-card flex items-center justify-center p-8 bg-black/40", reversed && "lg:order-1")}
                    variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 30 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                    }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                >
                    {illustration || (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-pulse">
                            <span className="text-muted-foreground/50 text-sm font-medium tracking-widest uppercase">Illustration Placeholder</span>
                        </div>
                    )}
                </motion.div>
            </GlassCard>
        </motion.div>
    );
};
