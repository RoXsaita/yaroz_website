"use client";

import { motion } from "framer-motion";
import { ServiceItem } from "@/data/services";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Play } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  className?: string;
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  // State to track media load errors
  const [mainMediaError, setMainMediaError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<{[key: number]: boolean}>({});

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing function (cubic bezier)
      },
    }),
  };

  // Function to determine if a source is a video
  const isVideo = (src: string) => {
    return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');
  };

  // Handle media load errors
  const handleMainMediaError = () => {
    setMainMediaError(true);
  };

  const handleThumbnailError = (index: number) => {
    setThumbnailErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <motion.div
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <div className="relative h-60 w-full overflow-hidden">
        {service.images && service.images[0] && (
          <>
            {isVideo(service.images[0]) ? (
              <div className="relative h-full w-full">
                <video
                  src={service.images[0]}
                  className="h-full w-full object-cover"
                  onError={handleMainMediaError}
                  muted
                  loop
                  playsInline
                  autoPlay
                  style={{
                    backgroundColor: mainMediaError ? '#f5f5f5' : 'transparent'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white bg-opacity-70 p-2 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={service.images[0]}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={handleMainMediaError}
                style={{
                  backgroundColor: mainMediaError ? '#f5f5f5' : 'transparent'
                }}
              />
            )}
          </>
        )}
        {mainMediaError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
            {service.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{service.title}</h3>
        <p className="mb-4 text-gray-600 leading-relaxed">{service.description}</p>
        
        <div className="mt-auto flex flex-wrap gap-2">
          {service.images && service.images.slice(1, 4).map((image: string, imgIndex: number) => (
            <div 
              key={imgIndex} 
              className="relative h-16 w-16 overflow-hidden rounded shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              {isVideo(image) ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                  <Play className="h-6 w-6 text-white" />
                </div>
              ) : (
                <img
                  src={image}
                  alt={`${service.title} example ${imgIndex + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => handleThumbnailError(imgIndex)}
                  style={{
                    backgroundColor: thumbnailErrors[imgIndex] ? '#f5f5f5' : 'transparent'
                  }}
                />
              )}
              {thumbnailErrors[imgIndex] && !isVideo(image) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-xs text-gray-500">
                  Image {imgIndex + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 