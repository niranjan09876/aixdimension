import { motion } from "framer-motion";

interface SectionTitleProps {
  badge?: string;
  title: string;
  gradientTitle?: string;
  description?: string;
}

const SectionTitle = ({ badge, title, gradientTitle, description }: SectionTitleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-10 md:mb-16 max-w-3xl mx-auto px-4 sm:px-0"
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium gradient-bg text-primary-foreground mb-4">
        {badge}
      </span>
    )}
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
      {title}{" "}
      {gradientTitle && <span className="gradient-text">{gradientTitle}</span>}
    </h2>
    {description && (
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionTitle;
