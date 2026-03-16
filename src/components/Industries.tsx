import { motion } from "framer-motion";
import { HeartPulse, Landmark, ShoppingBag, GraduationCap, Truck } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const industries = [
  { icon: HeartPulse, name: "Healthcare", image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5fe3?auto=format&fit=crop&w=800&q=80" },
  { icon: Landmark, name: "FinTech", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" },
  { icon: ShoppingBag, name: "Retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
  { icon: GraduationCap, name: "Education", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
  { icon: Truck, name: "Logistics", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" },
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
            className="group glass-card hover-glow flex flex-col items-center gap-3 px-8 py-6 min-w-[140px] relative overflow-hidden"
          >
            <div
              className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center"
              style={{ backgroundImage: `url(${ind.image})` }}
            />

            <div className="relative z-10 w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
              <ind.icon size={24} className="text-primary-foreground" />
            </div>
            <span className="relative z-10 font-heading font-semibold text-sm">{ind.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
