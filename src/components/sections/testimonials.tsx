"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, getGithubPagesUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  const [testimonialImages, setTestimonialImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6; // Number of testimonials to show per page
  
  // Generate paths for all testimonial images
  useEffect(() => {
    const images = Array.from({ length: 28 }, (_, i) => 
      getGithubPagesUrl(`images/testemonials/Testemonial_${i + 1}.png`)
    );
    setTestimonialImages(images);
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(testimonialImages.length / itemsPerPage);
  
  // Handle navigation
  const goToNextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const goToPrevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page items
  const currentTestimonials = testimonialImages.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Open the lightbox with the selected image
  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  // Close the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = ''; // Ensure scroll is restored on unmount
    };
  }, []);

  // Animation variants - improved for smoother transitions
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80, // Reduced distance for smoother effect
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80, // Reduced distance for smoother effect
      opacity: 0.4,
      transition: {
        opacity: { duration: 0.3 } // Slightly faster opacity fade
      }
    }),
  };

  const pageTransition = {
    type: "spring", // Spring physics for more natural movement
    stiffness: 250,
    damping: 30,
    duration: 0.5,
  };

  if (testimonialImages.length === 0) {
    return null; // Still loading
  }

  return (
    <section
      id="testimonials"
      className={cn("relative overflow-hidden bg-white py-24", className)}
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Customer Love"
          subtitle="What our clients say about our sweet creations"
          accentColor="purple"
        />
        
        <div className="mt-16 relative overflow-hidden" ref={containerRef}>
          {/* Animated page container */}
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="pb-10" // Added padding to prevent cutoff during scale animation
            >
              {/* Image grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentTestimonials.map((image, index) => {
                  // Create a unique index across all pages
                  const globalIndex = currentPage * itemsPerPage + index;
                    
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                      onClick={() => openLightbox(image)}
                    >
                      {/* Card container with hover effect */}
                      <div className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 
                                       hover:scale-[1.03] cursor-pointer">
                        {/* Zoom indicator that appears on hover */}
                        <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <ZoomIn size={16} className="text-gray-600" />
                        </div>
                        
                        {/* Decorative frame for the image */}
                        <div className="relative overflow-hidden rounded-lg p-2 bg-gradient-to-br from-pink-50 to-purple-50">
                          {/* Decorative corners */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary-300 rounded-tl-md"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary-300 rounded-tr-md"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary-300 rounded-bl-md"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary-300 rounded-br-md"></div>
                          
                          {/* The image itself */}
                          <div className="overflow-hidden rounded-md">
                            <img 
                              src={image} 
                              alt={`Client testimonial ${globalIndex + 1}`}
                              className="w-full max-h-[280px] object-contain transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2 relative z-30">
              <button
                onClick={goToPrevPage}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-1 px-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentPage ? 1 : -1);
                      setCurrentPage(i);
                    }}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      currentPage === i ? "bg-primary-500 scale-110" : "bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNextPage}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 p-2 text-white bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            
            {/* Enlarged image container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-[85vw] max-h-[85vh] bg-white rounded-xl p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative frame for lightbox */}
              <div className="relative p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                {/* Decorative corners - larger for the lightbox */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-primary-400 rounded-tl-md"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-400 rounded-tr-md"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-400 rounded-bl-md"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-primary-400 rounded-br-md"></div>
                
                {/* The enlarged image */}
                <div className="overflow-hidden rounded-md">
                  <img 
                    src={selectedImage} 
                    alt="Enlarged testimonial" 
                    className="max-w-full max-h-[75vh] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 