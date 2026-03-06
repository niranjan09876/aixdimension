import { motion } from "framer-motion";
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const industries = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Landmark, name: "FinTech" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: GraduationCap, name: "Education" },
  { icon: Truck, name: "Logistics" },
];

const Industries = () => (
  <section id="industries" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Industries" title="Industries we" gradientTitle="serve." description="Deep domain expertise across high-growth verticals." />
      <div className="flex flex-wrap justify-center gap-6">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="glass-card hover-glow flex flex-col items-center gap-3 px-8 py-6 min-w-[140px]"
          >
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
              <ind.icon size={24} className="text-primary-foreground" />
            </div>
            <span className="font-heading font-semibold text-sm">{ind.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
