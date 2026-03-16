import { motion } from "framer-motion";

const companies = ["Google", "Microsoft", "Amazon", "Stripe", "Netflix", "Spotify", "Airbnb", "Uber"];

const TrustedCompanies = () => (
  <section className="py-16 overflow-hidden border-y border-border/50">
    <div className="container mx-auto px-4 mb-8">
      <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-widest">Trusted by industry leaders</p>
    </div>
    <div className="relative">
      <div className="flex animate-marquee gap-16 items-center">
        {[...companies, ...companies].map((c, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.1 }}
            className="text-2xl md:text-3xl font-heading font-bold text-muted-foreground/40 hover:text-foreground/60 transition-colors whitespace-nowrap cursor-default select-none"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedCompanies;
