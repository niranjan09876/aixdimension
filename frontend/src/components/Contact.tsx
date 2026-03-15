import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Message sent! We'll be in touch soon.");
    reset();
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground";

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle badge="Contact" title="Let's build" gradientTitle="together." description="Have a project in mind? We'd love to hear about it." />
        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input {...register("name", { required: true })} placeholder="Your Name" className={inputClasses} />
                  <input {...register("email", { required: true })} type="email" placeholder="Email Address" className={inputClasses} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input {...register("phone")} placeholder="Phone (optional)" className={inputClasses} />
                  <select {...register("service")} className={inputClasses}>
                    <option value="">Select Service</option>
                    <option>Web Development</option>
                    <option>Mobile Apps</option>
                    <option>UI/UX Design</option>
                    <option>Cloud Infrastructure</option>
                    <option>AI Solutions</option>
                  </select>
                </div>
                <textarea {...register("message", { required: true })} rows={5} placeholder="Tell us about your project..." className={inputClasses} />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold gradient-bg text-primary-foreground flex items-center justify-center gap-2"
                >
                  Send Message <Send size={16} />
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@AI X Dimension.io" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "HQ", value: "Hyderabad, India" },
            ].map((c) => (
              <GlassCard key={c.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-medium text-sm">{c.value}</p>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
