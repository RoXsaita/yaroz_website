/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoName = '';
const isCustomDomain = true; // Set to true since you're using a custom domain

// Only attempt to get the repository name from environment if in GitHub Actions
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY || '';
  repoName = repo.split('/')[1] || '';
}

const nextConfig = {
  output: 'export',
  // Configure base path for GitHub Pages - empty with custom domain
  basePath: isCustomDomain ? '' : isGithubActions ? `/${repoName}` : '',
  assetPrefix: isCustomDomain ? '' : isGithubActions ? `/${repoName}/` : '',
  
  // Image optimization settings
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'], // Add webp support when not using unoptimized
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Used to direct root path to /index.html (for GitHub Pages)
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
  
  // Environment variables
  env: {
    NEXT_PUBLIC_GITHUB_PAGES: isGithubActions ? 'true' : 'false',
    NEXT_PUBLIC_REPO_NAME: repoName,
    NEXT_PUBLIC_CUSTOM_DOMAIN: isCustomDomain ? 'true' : 'false',
  },
};

module.exports = nextConfig; 