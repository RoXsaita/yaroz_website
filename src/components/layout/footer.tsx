"use client";

import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { CTAButton } from '../ui/cta-button';
import { MapPin } from 'lucide-react';
import { getGithubPagesUrl } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-purple-50 pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
                <img 
                  src={getGithubPagesUrl("images/placeholders/logo.png")} 
                  alt="Yaroz Sweets Logo" 
                  className="h-12 w-12 object-contain rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Yaroz Sweets</h2>
            </div>
            <p className="mt-4 text-gray-600">
              Crafting elegant, delicious cakes and sweets for your special moments and celebrations.
            </p>
            <div className="mt-6 flex flex-col space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-pink-500" />
                <p>{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li><Link href="/#about" className="hover:text-pink-500">About Us</Link></li>
                <li><Link href="/#services" className="hover:text-pink-500">Our Services</Link></li>
                <li><Link href="/#gallery" className="hover:text-pink-500">Gallery</Link></li>
                <li><Link href="/#contact" className="hover:text-pink-500">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Connect With Us</h3>
            <div className="flex flex-col space-y-2">
              <CTAButton ctype="dm" showIcon={true} />
              <CTAButton ctype="facebook" showIcon={true} />
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <p>© {currentYear} Yaroz Sweets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 