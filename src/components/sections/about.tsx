"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, getGithubPagesUrl } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  const [activeMedia, setActiveMedia] = useState(0);
  const autoRotationRef = useRef<NodeJS.Timeout | null>(null);
  const videoControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to determine if a source is a video
  const isVideo = (src: string) => {
    return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');
  };
  
  // Rearranged to put the video as the last item
  const aboutMedia = [
    getGithubPagesUrl("images/aboutus/Aboutus_1.jpg"),
    getGithubPagesUrl("images/aboutus/Aboutus_2.jpg"),
    getGithubPagesUrl("images/aboutus/Aboutus_4.jpg"),
    getGithubPagesUrl("images/aboutus/Aboutus_5.jpg"),
    getGithubPagesUrl("images/aboutus/Aboutus_3.mp4"), // Video is now the last item
  ];

  const currentMedia = aboutMedia[activeMedia];
  const currentIsVideo = isVideo(currentMedia);
  
  // Set up auto-rotation that stops when reaching the video
  useEffect(() => {
    // Clear any existing interval when component mounts or activeMedia changes
    if (autoRotationRef.current) {
      clearInterval(autoRotationRef.current);
      autoRotationRef.current = null;
    }
    
    // Only set up auto-rotation if not currently on a video
    if (!currentIsVideo) {
      autoRotationRef.current = setInterval(() => {
        // Calculate next index
        const nextIndex = (activeMedia + 1) % aboutMedia.length;
        
        // Check if next media is a video
        if (isVideo(aboutMedia[nextIndex])) {
          // If so, move to the video and then stop auto-rotation
          setActiveMedia(nextIndex);
          if (autoRotationRef.current) {
            clearInterval(autoRotationRef.current);
            autoRotationRef.current = null;
          }
        } else {
          // Otherwise, just move to the next image
          setActiveMedia(nextIndex);
        }
      }, 5000); // Change every 5 seconds
    }
    
    // Clean up interval on unmount
    return () => {
      if (autoRotationRef.current) {
        clearInterval(autoRotationRef.current);
        autoRotationRef.current = null;
      }
    };
  }, [activeMedia, currentIsVideo, aboutMedia]);
  
  // Function to handle hover/pause on media
  const handleMediaHover = () => {
    // Pause auto-rotation on hover
    if (autoRotationRef.current) {
      clearInterval(autoRotationRef.current);
      autoRotationRef.current = null;
    }
  };
  
  // Function to handle hover end
  const handleMediaLeave = () => {
    // Resume auto-rotation if not on a video
    if (!currentIsVideo && autoRotationRef.current === null) {
      autoRotationRef.current = setInterval(() => {
        const nextIndex = (activeMedia + 1) % aboutMedia.length;
        if (isVideo(aboutMedia[nextIndex])) {
          setActiveMedia(nextIndex);
          if (autoRotationRef.current) {
            clearInterval(autoRotationRef.current);
            autoRotationRef.current = null;
          }
        } else {
          setActiveMedia(nextIndex);
        }
      }, 5000);
    }
  };

  // Clean up any timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (videoControlsTimeoutRef.current) {
        clearTimeout(videoControlsTimeoutRef.current);
        videoControlsTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <section 
      id="about"
      className={cn("relative overflow-hidden py-24", className)}
    >
      <div className="absolute inset-0 opacity-5 bg-sprinkle-pattern"></div>
      
      {/* Add subtle decorative circles */}
      <div className="absolute -top-64 -right-48 w-96 h-96 rounded-full opacity-5 bg-gradient-to-br from-pink-200 to-pink-100"></div>
      <div className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full opacity-5 bg-gradient-to-br from-purple-200 to-purple-100"></div>
      
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading 
          title="About Yaroz Sweets" 
          subtitle="Our story of passion and creativity" 
          accentColor="pink"
        />
        
        <div className="mt-16 grid gap-16 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div 
              className="aspect-square relative rounded-lg overflow-hidden shadow-xl"
              onMouseEnter={handleMediaHover}
              onMouseLeave={handleMediaLeave}
            >
              {/* Thumbnails for other about media - moved to the top */}
              <div className="absolute top-4 left-0 right-0 flex justify-center gap-3 px-4 z-10">
                {aboutMedia.map((media, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveMedia(index)}
                    className={cn(
                      "w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300",
                      activeMedia === index 
                        ? "border-white scale-110 shadow-lg" 
                        : "border-transparent opacity-70 hover:opacity-100 hover:border-white/50"
                    )}
                  >
                    {isVideo(media) ? (
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <img 
                        src={media} 
                        alt={`About us thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {currentIsVideo ? (
                <div className="relative h-full w-full bg-black group">
                  <video
                    src={currentMedia}
                    className="h-full w-full object-cover"
                    autoPlay
                    playsInline
                    controls
                    muted
                    loop
                    // Improved handling for video controls
                    onMouseOver={(e) => {
                      if (e.currentTarget) {
                        e.currentTarget.controls = true;
                      }
                      // Clear any existing timeout for hiding controls
                      if (videoControlsTimeoutRef.current) {
                        clearTimeout(videoControlsTimeoutRef.current);
                        videoControlsTimeoutRef.current = null;
                      }
                    }}
                    onMouseOut={(e) => {
                      // Keep controls visible for 3 seconds after mouse leaves
                      // This gives time to interact with the controls
                      if (videoControlsTimeoutRef.current) {
                        clearTimeout(videoControlsTimeoutRef.current);
                      }
                      
                      videoControlsTimeoutRef.current = setTimeout(() => {
                        // Only hide controls if video is playing
                        if (e.currentTarget && !e.currentTarget.paused) {
                          e.currentTarget.controls = true; // Keep them visible anyway
                        }
                        videoControlsTimeoutRef.current = null;
                      }, 3000);
                    }}
                    // Add specific control interaction handler
                    onClick={(e) => {
                      // Ensure controls remain visible when clicked
                      if (e.currentTarget) {
                        e.currentTarget.controls = true;
                      }
                      
                      // Clear any existing timeout
                      if (videoControlsTimeoutRef.current) {
                        clearTimeout(videoControlsTimeoutRef.current);
                        videoControlsTimeoutRef.current = null;
                      }
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Video
                  </div>
                </div>
              ) : (
                <img 
                  src={currentMedia}
                  alt="Yaroz Sweets kitchen and team" 
                  className="object-cover h-full w-full transition-opacity duration-500"
                />
              )}
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-primary-200 hidden md:block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              
              <motion.div 
                className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-secondary-200 hidden md:block" 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Family-Crafted Confections
            </h3>
            
            <motion.p 
              className="text-gray-700 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Since our founding, Yaroz Sweets has been dedicated to creating extraordinary confections that blend artistic design with exceptional taste. Our family-run bakery brings together traditional techniques with innovative ideas.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Each cake, pastry, and sweet treat is carefully crafted with premium ingredients and meticulous attention to detail. We believe that every celebration deserves something special, and we take pride in being part of your most cherished moments.
            </motion.p>
            
            <motion.div
              className="mt-6 w-16 h-1 bg-primary-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 