import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const projects = [
  { title: "FinanceFlow", desc: "AI-powered financial dashboard for enterprise clients", color: "from-primary to-secondary", span: "md:col-span-2" },
  { title: "HealthHub", desc: "Telehealth platform connecting patients with specialists", color: "from-accent to-primary", span: "md:col-span-1" },
  { title: "EduSpark", desc: "Interactive learning platform for K-12 students", color: "from-secondary to-primary", span: "md:col-span-1" },
  { title: "ShopSync", desc: "Omnichannel retail management system", color: "from-primary to-accent", span: "md:col-span-2" },
  { title: "LogiTrack", desc: "Real-time logistics and fleet management solution", color: "from-accent to-secondary", span: "md:col-span-2" },
  { title: "CloudNest", desc: "Multi-cloud infrastructure management platform", color: "from-secondary to-accent", span: "md:col-span-1" },
];

const Portfolio = () => (
  <section id="portfolio" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Portfolio" title="Our recent" gradientTitle="work." description="A glimpse into the projects that showcase our craft and impact." />

      <BentoGrid>
        {projects.map((p, i) => (
          <BentoGridItem
            key={i}
            className={p.span}
            title={p.title}
            description={p.desc}
            header={
              <div className={`w-full h-full min-h-[10rem] bg-gradient-to-br ${p.color} opacity-80 group-hover/bento:opacity-100 transition-opacity flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/bento:opacity-100 transition-all duration-300 scale-75 group-hover/bento:scale-100">
                  <ExternalLink size={18} className="text-white" />
                </div>
              </div>
            }
          />
        ))}
      </BentoGrid>

    </div>
  </section>
);

export default Portfolio;
