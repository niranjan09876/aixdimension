import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, Cloud, Brain, Target } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import { InteractiveServiceCard } from "./ui/InteractiveServiceCard";

const services = [
  { icon: Globe, title: "Web Development", desc: "Full-stack web applications built with modern frameworks, optimized for performance and scalability.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile applications that deliver seamless experiences across devices.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design that balances aesthetics with functionality to create intuitive interfaces.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80" },
  { icon: Cloud, title: "Cloud Infrastructure", desc: "Scalable cloud architecture and DevOps solutions for reliable, high-performance systems.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
  { icon: Brain, title: "AI Solutions", desc: "Custom AI and machine learning solutions that automate processes and unlock insights.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
  { icon: Target, title: "Product Strategy", desc: "Data-driven product strategy and roadmapping to align your vision with market opportunity.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
];

const Services = () => (
  <section id="services" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Services" title="What we" gradientTitle="deliver." description="End-to-end digital solutions tailored to your unique challenges and goals." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="h-full"
          >
            <InteractiveServiceCard
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              image={s.image}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
