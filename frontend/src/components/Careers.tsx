import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const jobs = [
  { title: "Senior Frontend Engineer", location: "Remote / Hyderabad", type: "Full-time" },
  { title: "UI/UX Designer", location: "Bangalore", type: "Full-time" },
  { title: "Product Manager", location: "London", type: "Full-time" },
  { title: "Cloud Architect", location: "New York", type: "Contract" },
];

const Careers = () => (
  <section id="careers" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Careers" title="Join our" gradientTitle="team." description="We're always looking for talented people who share our passion for building great products." />
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {jobs.map((j, i) => (
          <motion.div
            key={j.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard className="group">
              <h3 className="font-heading font-semibold text-lg mb-3">{j.title}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin size={14} /> {j.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} /> {j.type}</span>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Apply Now <ArrowRight size={14} />
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Careers;
