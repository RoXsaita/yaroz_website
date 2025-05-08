"use client";

import { Button, ButtonProps } from "./button";
import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/data/site";

type CTAType = "dm" | "facebook";

interface CTAButtonProps extends Omit<ButtonProps, "asChild"> {
  ctype: CTAType;
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
  external?: boolean;
}

export function CTAButton({ ctype, size = "default", showIcon = true, className, external = true, ...props }: CTAButtonProps) {
  let href = "";
  let variant = "default" as ButtonProps["variant"];
  let icon = null;
  let label = "";

  switch (ctype) {
    case "dm":
      href = siteConfig.links.instagram;
      variant = "dm";
      icon = <Instagram className="mr-2 h-4 w-4" />;
      label = "DM on Instagram";
      break;
    case "facebook":
      href = siteConfig.links.facebook;
      variant = "facebook";
      icon = <Facebook className="mr-2 h-4 w-4" />;
      label = "DM us on Facebook";
      break;
  }

  return (
    <Button
      href={href}
      external={external}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {showIcon && icon}
      {props.children || label}
    </Button>
  );
} 