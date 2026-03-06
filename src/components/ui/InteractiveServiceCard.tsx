import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";

interface InteractiveServiceCardProps {
    icon: React.ElementType;
    title: string;
    desc: string;
    details?: string[];
    className?: string;
}

export const InteractiveServiceCard = ({
    icon: Icon,
    title,
    desc,
    details = ["Strategy", "Design", "Development", "Launch"],
    className,
}: InteractiveServiceCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Tilt effects
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={cn("relative group perspective-[1000px]", className)}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 rounded-2xl blur-md transition duration-500 z-0"></div>

            <GlassCard
                hover={false}
                className="relative z-10 h-full flex flex-col justify-start overflow-hidden transition-all duration-300 group-hover:bg-black/90 group-hover:border-primary/50"
            >
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full">
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                        className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5"
                    >
                        <Icon size={22} className="text-primary-foreground" />
                    </motion.div>

                    <h3 className="font-heading text-lg font-semibold mb-2 text-white">{title}</h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{desc}</p>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 border-t border-white/10 mt-2">
                            <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Includes:</p>
                            <ul className="grid grid-cols-2 gap-2">
                                {details.map((detail, idx) => (
                                    <li key={idx} className="text-xs text-gray-400 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-secondary"></span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors w-full">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </GlassCard>
        </motion.div>
    );
};
