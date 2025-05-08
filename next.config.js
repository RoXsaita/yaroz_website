/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  
  // No basePath or assetPrefix needed with custom domain
  // The custom domain is handled through the CNAME file
  
  // Image optimization settings
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Used to ensure proper file structure for GitHub Pages
  trailingSlash: true,
  
  // Optimization settings
  swcMinify: true, // Use SWC minifier for better performance
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Performance and accessibility improvements
  reactStrictMode: true,
};

module.exports = nextConfig; 