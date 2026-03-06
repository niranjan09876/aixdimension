import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Cloud, Brain, Target } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const services = [
  { icon: Globe, title: "Web Development", desc: "Full-stack web applications built with modern frameworks, optimized for performance and scalability." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile applications that deliver seamless experiences across devices." },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design that balances aesthetics with functionality to create intuitive interfaces." },
  { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud architecture and DevOps solutions for reliable, high-performance systems." },
  { icon: Brain, title: "AI Solutions", desc: "Custom AI and machine learning solutions that automate processes and unlock insights." },
  { icon: Target, title: "Product Strategy", desc: "Data-driven product strategy and roadmapping to align your vision with market opportunity." },
];

const Services = () => (
  <section id="services" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Services" title="What we" gradientTitle="deliver." description="End-to-end digital solutions tailored to your unique challenges and goals." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard className="h-full group">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
