import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const stats = [
  { value: 100, suffix: "+", label: "Clients Worldwide" },
  { value: 80, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "", label: "Countries Served" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const mv = { val: 0 };
          const ctrl = animate(mv, { val: value }, {
            duration: 2,
            ease: "easeOut",
            onUpdate: () => setDisplay(Math.round(mv.val)),
          });
          observer.disconnect();
          return () => ctrl.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold gradient-text">{display}{suffix}</div>;
};

const About = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="About Us" title="We're on a mission to" gradientTitle="redefine digital." description="AI X Dimension is a full-service digital agency that combines strategy, design, and engineering to build products people love." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="text-center py-8">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard className="h-full">
            <h3 className="font-heading text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower businesses with innovative digital solutions that drive growth, efficiency,
              and meaningful connections with their audiences.
            </p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard className="h-full">
            <h3 className="font-heading text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the world's most trusted digital partner, known for crafting experiences
              that push boundaries and set new industry standards.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
