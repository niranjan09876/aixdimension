import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { BentoGridItem } from "./ui/BentoGrid";
import { useNavigate } from "react-router-dom";

const projects = [
  { title: "Summarizer Flow", desc: "AI-powered text extraction tool", color: "from-primary to-secondary", span: "md:col-span-2", image: "/textflow_ai_banner.png", link: "/finance-flow" },

];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="pt-16 lg:pt-32 pb-8 lg:pb-12 px-4 md:px-8">
      <div className="container mx-auto">
        <SectionTitle badge="Portfolio" title="Our recent" gradientTitle="work." description="A glimpse into the projects that showcase our craft and impact." />

        <div className="flex justify-center">
          <div className="max-w-3xl w-full">
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
          </div>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
