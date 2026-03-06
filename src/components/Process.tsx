import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const steps = [
  { icon: Search, step: "01", title: "Discovery", desc: "We dive deep into your business, audience, and goals to form a strategic foundation." },
  { icon: PenTool, step: "02", title: "Design", desc: "Wireframes, prototypes, and pixel-perfect designs that bring your vision to life." },
  { icon: Code2, step: "03", title: "Development", desc: "Clean, scalable code built with modern tech stacks and best practices." },
  { icon: Rocket, step: "04", title: "Deployment", desc: "Launch, monitor, and iterate — ensuring peak performance from day one." },
];

const Process = () => (
  <section id="process" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Process" title="How we" gradientTitle="work." description="A proven methodology that turns complex challenges into elegant solutions." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <GlassCard className="text-center h-full relative">
              <span className="absolute top-4 right-4 text-5xl font-heading font-bold text-muted-foreground/10">{s.step}</span>
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5">
                <s.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
