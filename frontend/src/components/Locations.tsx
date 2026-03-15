import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

const offices = [
  { city: "Hyderabad", country: "India", status: "HQ" },
  { city: "Bangalore", country: "India", status: "Engineering" },
  { city: "London", country: "UK", status: "Europe" },
  { city: "New York", country: "USA", status: "Americas" },
];

const Locations = () => (
  <section id="locations" className="section-padding">
    <div className="container mx-auto">
      <SectionTitle badge="Global" title="Our" gradientTitle="offices." description="A global team delivering local expertise." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offices.map((o, i) => (
          <motion.div
            key={o.city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg">{o.city}</h3>
              <p className="text-sm text-muted-foreground">{o.country}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{o.status}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Locations;
