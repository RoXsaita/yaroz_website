"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook } from "lucide-react";

interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  return (
    <section
      id="contact"
      className={cn("relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24", className)}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 bg-sprinkle-pattern"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary-200 mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-secondary-200 mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <SectionHeading
          title="Get in Touch"
          subtitle="Let's create something sweet together"
          accentColor="pink"
          centered={true}
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-8 shadow-elegant relative overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-24 h-24">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-100 to-transparent opacity-50 rounded-tl-2xl"></div>
              <div className="absolute top-[12px] left-[12px] w-6 h-6 border-t-2 border-l-2 border-primary-300 rounded-tl-md"></div>
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-8 text-neutral-900">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start group">
                <div className="p-2 rounded-full bg-primary-50 text-primary-500 mr-4 group-hover:bg-primary-100 transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500 mb-1">Location</h4>
                  <p className="text-neutral-800">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
            
            <h4 className="text-lg font-display font-semibold mb-6 text-neutral-800">Message us directly:</h4>
            
            {/* Social media buttons with luxury design */}
            <div className="flex flex-col space-y-4 mt-4">              
              {/* Instagram DM button */}
              <button 
                onClick={() => {
                  console.log("Instagram button clicked");
                  window.open('https://www.instagram.com/yaroz_sweets', '_blank');
                }}
                className="group relative overflow-hidden rounded-xl py-4 px-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="Direct message us on Instagram"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <span className="font-medium">DM us on Instagram</span>
                </div>
              </button>

              {/* Facebook DM button */}
              <button 
                onClick={() => {
                  console.log("Facebook button clicked");
                  window.open('https://www.facebook.com/profile.php?id=100063774739476', '_blank');
                }}
                className="group relative overflow-hidden rounded-xl py-4 px-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="Direct message us on Facebook"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <span className="font-medium">DM us on Facebook</span>
                </div>
              </button>
            </div>
            
            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24">
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-secondary-100 to-transparent opacity-50 rounded-br-2xl"></div>
              <div className="absolute bottom-[12px] right-[12px] w-6 h-6 border-b-2 border-r-2 border-secondary-300 rounded-br-md"></div>
            </div>
          </motion.div>
          
          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[400px] rounded-2xl overflow-hidden shadow-elegant relative"
          >
            {/* Map Title Overlay */}
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/40 to-transparent p-4 z-10">
              <h4 className="text-white font-medium">Amman, Jordan</h4>
            </div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108711.79724973918!2d35.83155825!3d31.956398500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1682700314436!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yaroz Sweets Location"
              className="filter saturate-[0.85] contrast-[1.1]"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 