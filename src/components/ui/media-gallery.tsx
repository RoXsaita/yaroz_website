"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Play } from "lucide-react";

// Define media item interface
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  className?: string;
}

export function MediaGallery({ items, className }: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [mediaErrors, setMediaErrors] = useState<{[key: number]: boolean}>({});
  const videoControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMediaError = (index: number) => {
    setMediaErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {items.map((item, index) => (
        <Dialog key={`media-${index}`} open={selectedItem?.src === item.src} onOpenChange={(isOpen: boolean) => !isOpen && setSelectedItem(null)}>
          <DialogTrigger asChild>
            <motion.div
              className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    className="h-full w-full object-cover"
                    onError={() => handleMediaError(index)}
                    playsInline
                    muted
                    loop
                    style={{
                      backgroundColor: mediaErrors[index] ? '#f5f5f5' : 'transparent'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white bg-opacity-80 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || `Gallery item ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={() => handleMediaError(index)}
                  style={{
                    backgroundColor: mediaErrors[index] ? '#f5f5f5' : 'transparent'
                  }}
                />
              )}
              
              {mediaErrors[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                  Media {index + 1}
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-20" />
            </motion.div>
          </DialogTrigger>
          
          {selectedItem && (
            <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
              <div className="relative h-[80vh] w-full">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.src}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    onError={() => {
                      // Handle error for enlarged video if needed
                    }}
                    // Ensure controls stay visible on hover and for a few seconds after mouse leaves
                    onMouseOver={(e) => {
                      if (e.currentTarget) {
                        e.currentTarget.controls = true;
                      }
                      // Clear any existing timeout
                      if (videoControlsTimeoutRef.current) {
                        clearTimeout(videoControlsTimeoutRef.current);
                        videoControlsTimeoutRef.current = null;
                      }
                    }}
                    onMouseOut={(e) => {
                      // Set a timeout to hide controls after a delay to give user time to interact
                      if (videoControlsTimeoutRef.current) {
                        clearTimeout(videoControlsTimeoutRef.current);
                      }
                      
                      // Keep controls visible for 3 seconds after mouse leaves
                      videoControlsTimeoutRef.current = setTimeout(() => {
                        // Only hide if user isn't interacting with the video
                        if (e.currentTarget && !e.currentTarget.paused) {
                          e.currentTarget.controls = false;
                        }
                        videoControlsTimeoutRef.current = null;
                      }, 3000);
                    }}
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.alt || "Enlarged gallery image"}
                    className="h-full w-full object-contain"
                    onError={() => {
                      // Handle error for enlarged image if needed
                    }}
                  />
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  );
} 