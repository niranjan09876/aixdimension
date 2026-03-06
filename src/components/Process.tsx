import { Search, PenTool, Code2, Rocket } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { FeaturePanel } from "./ui/FeaturePanel";

const steps = [
  { icon: Search, title: "Discovery & Strategy", desc: "We dive deep into your business, audience, and goals to form a strategic foundation. By understanding your core challenges, we roadmap solutions that drive growth." },
  { icon: PenTool, title: "UX/UI Design", desc: "Our design team crafts wireframes, interactive prototypes, and pixel-perfect interfaces that bring your vision to life, ensuring optimal user experience and high conversion." },
  { icon: Code2, title: "Development Engineering", desc: "Clean, scalable code built with modern technology stacks. We engineer robust logic backends and incredibly fast, responsive frontends." },
  { icon: Rocket, title: "Launch & Iterate", desc: "Deployment is just the beginning. We manage a flawless launch, continuously monitor performance, and iterate to ensure peak capability from day one." },
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
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center animate-pulse rounded-full blur-3xl" />
                  <Icon size={80} className="text-white relative z-10 drop-shadow-2xl opacity-90" />
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
