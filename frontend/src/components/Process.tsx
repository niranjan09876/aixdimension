import { Search, PenTool, Code2, Rocket } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { FeaturePanel } from "./ui/FeaturePanel";

const steps = [
  { icon: Search, title: "Discovery & Strategy", desc: "We dive deep into your business, audience, and goals to form a strategic foundation. By understanding your core challenges, we roadmap solutions that drive growth.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" },
  { icon: PenTool, title: "UX/UI Design", desc: "Our design team crafts wireframes, interactive prototypes, and pixel-perfect interfaces that bring your vision to life, ensuring optimal user experience and high conversion.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80" },
  { icon: Code2, title: "Development Engineering", desc: "Clean, scalable code built with modern technology stacks. We engineer robust logic backends and incredibly fast, responsive frontends.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
  { icon: Rocket, title: "Launch & Iterate", desc: "Deployment is just the beginning. We manage a flawless launch, continuously monitor performance, and iterate to ensure peak capability from day one.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
];

const Process = () => (
  <section id="process" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Process" title="How we" gradientTitle="work." description="A proven methodology that turns complex challenges into elegant solutions." />

      <div className="mt-16">
        {steps.map((s, i) => {
          const isReversed = i % 2 !== 0; // Alternate layout
          const Icon = s.icon;
          return (
            <FeaturePanel
              key={s.title}
              title={s.title}
              description={s.desc}
              reversed={isReversed}
              actionText={`Step 0${i + 1}`}
              illustration={
                <div className="relative w-full h-full flex items-center justify-center group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                  <div className="relative z-10 w-20 h-20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Icon size={36} className="text-white drop-shadow-lg" />
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

    </div>
  </section>
);

export default Process;
