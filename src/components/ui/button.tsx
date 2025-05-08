"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-md hover:translate-y-[-1px]",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md hover:translate-y-[-1px]",
        outline: "border border-primary-200 bg-white text-primary-700 hover:bg-primary-50 hover:border-primary-300",
        secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200",
        ghost: "text-primary-700 hover:bg-primary-50",
        link: "text-primary-600 underline-offset-4 hover:underline",
        subtle: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
        accent: "bg-gradient-to-r from-secondary-600 to-primary-600 text-white hover:shadow-md hover:translate-y-[-1px]",
        call: "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-md hover:translate-y-[-1px]",
        dm: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md hover:translate-y-[-1px]",
        facebook: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-md hover:translate-y-[-1px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 py-3 text-base",
        xl: "h-14 rounded-xl px-10 py-3.5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, external = false, ...props }, ref) => {
    // Extract onClick handler for type safety
    const { onClick, ...restProps } = props;
    
    if (href) {
      // Add special handling for hash links
      const isHashLink = href.startsWith('#');
      
      // Custom click handler for hash links only, not for external links
      const handleClick = isHashLink ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        // Update URL hash
        window.history.pushState({}, '', href);
        
        // Smoothly scroll to the element
        const element = document.querySelector(href);
        if (element) {
          // Add offset for fixed header if needed
          const headerOffset = 80; // Approximate height of your header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({ 
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } : undefined; // For external links, don't use a custom handler
      
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant, size, className }),
            "relative group overflow-hidden"
          )}
          {...(external ? { 
            target: "_blank", 
            rel: "noopener noreferrer",
          } : {})}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            // For hash links use our custom handler
            if (handleClick) {
              handleClick(e);
            } 
            // For normal links, add any click behavior here if needed
            if (onClick) {
              // We know this is unsafe but it's the only way to preserve onClick functionality
              // while satisfying TypeScript in this component architecture
              (onClick as any)(e);
            }
          }}
        >
          <span className="relative z-10 flex items-center justify-center w-full h-full">
            {restProps.children}
          </span>
          
          {/* Add subtle shimmer effect on hover for gradient buttons */}
          {(variant === 'default' || variant === 'call' || variant === 'dm' || variant === 'facebook' || variant === 'accent') && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shine"></span>
          )}
        </Link>
      );
    }
    
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative group overflow-hidden"
        )}
        ref={ref}
        onClick={onClick}
        {...restProps}
      >
        <span className="relative z-10 flex items-center justify-center w-full h-full">
          {restProps.children}
        </span>
        
        {/* Add subtle shimmer effect on hover for gradient buttons */}
        {(variant === 'default' || variant === 'call' || variant === 'dm' || variant === 'facebook' || variant === 'accent') && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shine"></span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 