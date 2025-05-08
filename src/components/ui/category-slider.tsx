"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

interface CategorySliderProps {
  images: string[];
  interval?: number; // Time in ms between slides
  className?: string;
  currentIndex?: number; // Optional controlled index
  setCurrentIndex?: (index: number) => void; // Optional callback to control index
}

export function CategorySlider({ 
  images, 
  interval = 5000, 
  className,
  currentIndex: controlledIndex,
  setCurrentIndex: setControlledIndex
}: CategorySliderProps) {
  // Use internal state only if not controlled externally
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine if we're using controlled or uncontrolled behavior
  const isControlled = controlledIndex !== undefined && setControlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  // Function to update the current index safely
  const updateCurrentIndex = (newIndex: number) => {
    if (isControlled) {
      setControlledIndex(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      updateCurrentIndex((currentIndex + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [images.length, interval, isPaused, currentIndex, isControlled]);

  const handlePrev = () => {
    updateCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    updateCurrentIndex((currentIndex + 1) % images.length);
  };

  // Function to determine if the current item is a video or image
  const isVideo = (src: string) => {
    if (!src) return false;
    return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle video load events
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // If video loaded, ensure controls are visible
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  if (!images.length) return null;

  const currentSrc = images[currentIndex];
  const currentIsVideo = isVideo(currentSrc);

  return (
    <div 
      className={cn("relative overflow-hidden rounded-lg", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider - Changed aspect ratio from aspect-video to aspect-square for better image display */}
      <div className="relative aspect-square w-full bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentIsVideo ? (
              // Video element for video files
              <div className="relative h-full w-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={currentSrc}
                  className="max-h-full max-w-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={true}
                  onLoadedData={handleVideoLoad}
                  // Ensure controls remain visible when hovering
                  onMouseOver={(e) => {
                    if (e.currentTarget) {
                      e.currentTarget.controls = true;
                    }
                  }}
                  onMouseOut={(e) => {
                    // Keep controls visible
                    if (e.currentTarget) {
                      e.currentTarget.controls = true;
                    }
                  }}
                />
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                    <div className="animate-pulse text-white flex flex-col items-center">
                      <Play size={40} className="mb-2" />
                      <span>Loading video...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Image element for image files - Using object-contain with proper centering
              <div className="h-full w-full flex items-center justify-center bg-gray-50">
                <img
                  src={currentSrc}
                  alt={`Category image ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback for image loading errors
                    console.error('Image failed to load:', currentSrc);
                    e.currentTarget.src = 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22300%22%20viewBox%3D%220%200%20300%20300%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23f5f5f5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2224%22%20fill%3D%22%23999%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EImage%20not%20found%3C%2Ftext%3E%3C%2Fsvg%3E';
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Video indicator */}
      {currentIsVideo && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Video
        </div>
      )}
      
      {/* Navigation controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
      
      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => updateCurrentIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === currentIndex ? "bg-white" : "bg-white/50",
                isVideo(src) ? "ring-2 ring-white/50" : "" // Add ring around video indicators
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 