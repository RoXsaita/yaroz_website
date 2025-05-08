import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { SectionDivider } from "../ui/section-divider";

interface ServicesProps {
  className?: string;
}

export function Services({ className }: ServicesProps) {
  return (
    <section
      id="services"
      className={cn("relative overflow-hidden bg-primary-50 py-20", className)}
    >
      <div className="absolute inset-0 opacity-10 bg-sprinkle-pattern"></div>
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Our Services"
          subtitle="Discover our range of specialty confections and catering options"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom decorative divider */}
      <div className="mt-16">
        <SectionDivider />
      </div>
    </section>
  );
} 