"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategorySlider } from "@/components/ui/category-slider";
import { cn, getGithubPagesUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryShowcaseProps {
  className?: string;
}

// Helper function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to ensure video items are included in the selection
function getRandomWithVideos(images: string[], videos: string[], count: number): string[] {
  // If there are no videos, just return random images
  if (!videos.length) {
    return getRandomItems(images, count);
  }
  
  // Always include videos, then fill the rest with random images
  const videosToInclude = videos.length > 2 
    ? getRandomItems(videos, Math.min(2, videos.length)) // Include at most 2 videos if many available
    : videos; // Include all videos if only a few
    
  // Remove any images that match video paths to avoid duplicates
  const filteredImages = images.filter(img => !videos.includes(img));
  
  // Select random images to fill the remaining slots
  const randomImages = getRandomItems(
    filteredImages, 
    count - videosToInclude.length
  );
  
  // Combine videos and images, then shuffle the result
  return getRandomItems([...videosToInclude, ...randomImages], count);
}

export function CategoryShowcase({ className }: CategoryShowcaseProps) {
  // State to store the final categories with random images
  const [randomizedCategories, setRandomizedCategories] = useState<any[]>([]);
  // State to track the currently active image for each category
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 0, 0]);

  // Define the image and video pools separately
  const fullImagePools = {
    cakes: {
      images: Array.from({ length: 64 }, (_, i) => getGithubPagesUrl(`images/Cakes/cake_${i + 1}.jpg`)),
      videos: [] // No videos in cakes category
    },
    sweets: {
      images: Array.from({ length: 13 }, (_, i) => getGithubPagesUrl(`images/Sweets/Sweets_${i + 1}.jpg`)),
      videos: [
        getGithubPagesUrl(`images/Sweets/Sweets_14.mp4`), // Make sure videos are explicitly defined
      ]
    },
    catering: {
      images: Array.from({ length: 10 }, (_, i) => getGithubPagesUrl(`images/Catering/catering_${i + 1}.jpg`)),
      videos: [] // No videos in catering category
    }
  };

  // Use effect to generate random images on mount
  useEffect(() => {
    const categories = [
      {
        id: "cakes",
        title: "Exquisite Cakes",
        description: "Our signature custom cakes are perfect for any celebration, from elegant weddings to fun birthdays.",
        images: getRandomWithVideos(
          fullImagePools.cakes.images, 
          fullImagePools.cakes.videos, 
          6
        )
      },
      {
        id: "sweets",
        title: "Delightful Sweets",
        description: "From cookies to pastries, our delightful sweet creations add a special touch to your events.",
        images: getRandomWithVideos(
          fullImagePools.sweets.images, 
          fullImagePools.sweets.videos, 
          6
        )
      },
      {
        id: "catering",
        title: "Full-Service Catering",
        description: "Let us handle your entire event with our comprehensive catering services tailored to your needs.",
        images: getRandomWithVideos(
          fullImagePools.catering.images, 
          fullImagePools.catering.videos, 
          6
        )
      }
    ];
    
    setRandomizedCategories(categories);
  }, []);
  
  // Function to update the active index for a specific category
  const handleThumbnailClick = (categoryIndex: number, imageIndex: number) => {
    setActiveIndices(prev => {
      const newIndices = [...prev];
      newIndices[categoryIndex] = imageIndex;
      return newIndices;
    });
  };

  if (randomizedCategories.length === 0) {
    return null; // Still loading
  }

  // Check if categories have videos for debugging
  const categoryHasVideo = (category: any) => {
    return category.images.some((src: string) => src.toLowerCase().includes('.mp4') || src.toLowerCase().endsWith('.webm'));
  };

  return (
    <section
      id="categories"
      className={cn("relative overflow-hidden bg-primary-50 py-20", className)}
    >
      <div className="absolute inset-0 opacity-10 bg-sprinkle-pattern"></div>
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Our Specialties"
          subtitle="Discover our range of sweet creations"
        />

        <div className="mt-16 flex flex-col gap-20">
          {randomizedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={cn(
                "grid gap-8 items-center",
                index % 2 === 0 ? "lg:grid-cols-[3fr,2fr]" : "lg:grid-cols-[2fr,3fr] lg:grid-flow-dense"
              )}
            >
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                {/* Pass the active index to the slider instead of using its own state */}
                <CategorySlider 
                  images={category.images} 
                  interval={5000}
                  className="shadow-lg"
                  currentIndex={activeIndices[index]}
                  setCurrentIndex={(newIndex) => handleThumbnailClick(index, newIndex)}
                />
              </div>
              
              <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                <h3 className="text-2xl font-bold mb-4 lg:text-3xl">{category.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{category.description}</p>
                
                {/* Thumbnails - simplified without pagination controls */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {category.images.map((image: string, imgIndex: number) => (
                    <div 
                      key={imgIndex}
                      className={cn(
                        "w-16 h-16 relative rounded-md overflow-hidden shadow cursor-pointer transition-all duration-200",
                        activeIndices[index] === imgIndex ? "ring-2 ring-primary-400 scale-105" : "hover:opacity-80"
                      )}
                      onClick={() => handleThumbnailClick(index, imgIndex)}
                    >
                      {image.toLowerCase().endsWith('.mp4') || image.toLowerCase().endsWith('.webm') ? (
                        <div className="relative h-full w-full bg-black/30">
                          {/* Create a thumbnail from the video */}
                          <video 
                            src={image}
                            className="object-contain w-full h-full"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          {/* Play icon overlay to indicate it's a video */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-5 w-5 text-white drop-shadow-md" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={image} 
                          alt={`${category.title} thumbnail ${imgIndex + 1}`}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 