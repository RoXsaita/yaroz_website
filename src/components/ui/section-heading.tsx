"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
  centered?: boolean;
  accentColor?: "pink" | "purple" | "gold" | "default";
  tag?: "h1" | "h2" | "h3";
  subtitleTag?: "h3" | "h4" | "p";
  hasDecoration?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  id,
  centered = true,
  accentColor = "default",
  tag: HeadingTag = "h2",
  subtitleTag: SubtitleTag = "p",
  hasDecoration = true
}: SectionHeadingProps) {
  const accentClasses = {
    default: "bg-primary-300",
    pink: "bg-pink-300",
    purple: "bg-secondary-300",
    gold: "bg-gold-300"
  };

  return (
    <motion.div
      className={cn(
        "mb-12 relative",
        centered ? "text-center" : "text-left",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      id={id}
    >
      {/* Optional decorative elements */}
      {hasDecoration && (
        <>
          <motion.span 
            className={cn(
              "inline-block relative",
              centered ? "mx-auto" : ""
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={cn(
              "absolute -top-3 -left-3 w-2 h-2 rounded-full",
              accentColor === "default" ? "bg-primary-300" : 
              accentColor === "pink" ? "bg-pink-300" :
              accentColor === "purple" ? "bg-secondary-300" : 
              "bg-gold-300"
            )}></span>
            <span className={cn(
              "absolute -bottom-1 -right-4 w-3 h-3 rounded-full",
              accentColor === "default" ? "bg-primary-200" : 
              accentColor === "pink" ? "bg-pink-200" :
              accentColor === "purple" ? "bg-secondary-200" : 
              "bg-gold-200"
            )}></span>
          </motion.span>
        </>
      )}
      
      {/* Main heading */}
      <HeadingTag className={cn(
        "mb-4 text-3xl font-bold tracking-tight font-display md:text-4xl lg:text-5xl",
        accentColor === "default" ? "text-neutral-900" : 
        accentColor === "pink" ? "text-primary-950" :
        accentColor === "purple" ? "text-secondary-950" : 
        "text-gold-800"
      )}>
        {/* Optional decorative colored element for title */}
        {hasDecoration && (
          <span className="inline-block relative">
            <span className={cn(
              "absolute -z-10 bottom-1 left-0 right-0 h-3 opacity-20 transform -skew-x-6",
              accentColor === "default" ? "bg-primary-300" : 
              accentColor === "pink" ? "bg-pink-300" :
              accentColor === "purple" ? "bg-secondary-300" : 
              "bg-gold-300"
            )}></span>
          </span>
        )}
        {title}
      </HeadingTag>
      
      {/* Optional subtitle */}
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            "relative",
            centered && "mx-auto"
          )}
        >
          <SubtitleTag
            className={cn(
              "mt-3 text-lg text-neutral-600 md:text-xl max-w-3xl",
              centered && "mx-auto"
            )}
          >
            {subtitle}
          </SubtitleTag>
        </motion.div>
      )}
      
      {/* Decorative underline */}
      {hasDecoration && (
        <motion.div
          className={cn(
            "mt-6 h-1 w-24 rounded-full", 
            accentClasses[accentColor],
            centered ? "mx-auto" : ""
          )}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: centered ? "6rem" : "5rem", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        />
      )}
    </motion.div>
  );
} 