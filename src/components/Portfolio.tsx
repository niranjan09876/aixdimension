import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const projects = [
  { title: "FinanceFlow", desc: "AI-powered financial dashboard for enterprise clients", color: "from-primary to-secondary" },
  { title: "HealthHub", desc: "Telehealth platform connecting patients with specialists", color: "from-accent to-primary" },
  { title: "EduSpark", desc: "Interactive learning platform for K-12 students", color: "from-secondary to-primary" },
  { title: "ShopSync", desc: "Omnichannel retail management system", color: "from-primary to-accent" },
  { title: "LogiTrack", desc: "Real-time logistics and fleet management solution", color: "from-accent to-secondary" },
  { title: "CloudNest", desc: "Multi-cloud infrastructure management platform", color: "from-secondary to-accent" },
];

const Portfolio = () => (
  <section id="portfolio" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Portfolio" title="Our recent" gradientTitle="work." description="A glimpse into the projects that showcase our craft and impact." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group cursor-pointer"
          >
            <div className="glass-card overflow-hidden hover-glow">
              <div className={`h-48 bg-gradient-to-br ${p.color} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
