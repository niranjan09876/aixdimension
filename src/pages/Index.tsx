import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Careers from "@/components/Careers";
import Locations from "@/components/Locations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <Hero />

    <About />
    <Services />
    <Industries />
    <Portfolio />
    <Process />
    <Testimonials />
    <Careers />
    <Locations />
    <Contact />
    <Footer />
  </>
);

export default Index;
