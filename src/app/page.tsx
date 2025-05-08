import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { Gallery } from "@/components/sections/gallery";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/ui/section-divider";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      
      <SectionDivider variant="wave" color="light" />
      
      <About />
      
      <SectionDivider variant="dots" color="primary" />
      
      <CategoryShowcase />
      
      <SectionDivider variant="minimal" color="secondary" />
      
      <Testimonials />
      
      <SectionDivider variant="dots" color="primary" />
      
      <Services />
      
      <SectionDivider variant="dots" color="secondary" />
      
      <Gallery />
      
      <SectionDivider variant="wave" inverted />
      
      <Contact />
    </>
  );
}
