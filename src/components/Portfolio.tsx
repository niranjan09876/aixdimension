import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { useNavigate } from "react-router-dom";

const projects = [
  { title: "FinanceFlow", desc: "AI-powered financial dashboard for enterprise clients", color: "from-primary to-secondary", span: "md:col-span-2", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", link: "/finance-flow" },
  { title: "HealthHub", desc: "Telehealth platform connecting patients with specialists", color: "from-accent to-primary", span: "md:col-span-1", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
  { title: "EduSpark", desc: "Interactive learning platform for K-12 students", color: "from-secondary to-primary", span: "md:col-span-1", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
  { title: "ShopSync", desc: "Omnichannel retail management system", color: "from-primary to-accent", span: "md:col-span-2", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" },
  { title: "LogiTrack", desc: "Real-time logistics and fleet management solution", color: "from-accent to-secondary", span: "md:col-span-2", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" },
  { title: "CloudNest", desc: "Multi-cloud infrastructure management platform", color: "from-secondary to-accent", span: "md:col-span-1", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle badge="Portfolio" title="Our recent" gradientTitle="work." description="A glimpse into the projects that showcase our craft and impact." />

        <BentoGrid>
          {projects.map((p, i) => (
            <BentoGridItem
              key={i}
              className={`${p.span} ${p.link ? "cursor-pointer" : ""}`}
              onClick={() => p.link && navigate(p.link)}
              title={p.title}
              description={p.desc}
              header={
                <div
                  className={`w-full h-full min-h-[10rem] md:min-h-[12rem] bg-cover bg-center bg-no-repeat relative group/image overflow-hidden bg-muted`}
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover/image:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/bento:opacity-100 transition-all duration-300 scale-75 group-hover/bento:scale-100">
                      <ExternalLink size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </BentoGrid>

      </div>
    </section>
  );
};

export default Portfolio;
