import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const testimonials = [
  { name: "Sarah Chen", company: "TechVenture Inc.", text: "NexusFlow transformed our digital presence entirely. Their attention to detail and strategic thinking exceeded all our expectations.", rating: 5 },
  { name: "Marcus Johnson", company: "FinanceFlow", text: "Working with NexusFlow was a game-changer. They delivered a complex financial platform on time and beyond what we imagined.", rating: 5 },
  { name: "Priya Sharma", company: "HealthHub", text: "The team's expertise in healthcare tech is unmatched. They built us a platform that our patients and doctors genuinely love.", rating: 5 },
  { name: "David Kim", company: "EduSpark", text: "From concept to launch, NexusFlow was a true partner. Their product strategy helped us find product-market fit faster.", rating: 5 },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section id="testimonials" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle badge="Testimonials" title="What clients" gradientTitle="say." description="Don't just take our word for it — hear from the people we've worked with." />
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <GlassCard hover={false} className="text-center py-10">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="w-12 h-12 rounded-full gradient-bg mx-auto mb-3 flex items-center justify-center text-primary-foreground font-bold">
                  {t.name[0]}
                </div>
                <p className="font-heading font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={prev} className="p-3 rounded-xl glass-card"><ChevronLeft size={18} /></motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={next} className="p-3 rounded-xl glass-card"><ChevronRight size={18} /></motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
