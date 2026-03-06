import { Zap, Github, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

const XIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="currentColor" />
  </svg>
);

const Footer = () => (
  <footer className="border-t border-border/50 py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 font-heading font-bold text-xl mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap size={16} className="text-primary-foreground" />
            </div>
            AI X Dimension
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Crafting digital experiences that drive growth for ambitious companies.
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            {[
              { Icon: XIcon, href: "https://x.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Github, href: "https://github.com" },
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Youtube, href: "https://youtube.com" }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center hover:text-primary transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Services", items: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Infrastructure"] },
          { title: "Company", items: ["About", "Careers", "Blog", "Contact"] },
          { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/50 pt-8 text-center">
        <p className="text-sm text-muted-foreground">© 2026 AI X Dimension. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
