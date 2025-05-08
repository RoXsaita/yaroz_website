# Yaroz Sweets – Modern, Elegant Cakes & Catering Website

A visually appealing, responsive website for Yaroz Sweets bakery, built with Next.js, TypeScript, and Tailwind CSS. The site is optimized for GitHub Pages deployment.

![Yaroz Sweets Screenshot](public/images/screenshot.jpg)

## Features

- Responsive, mobile-first design
- Component-driven architecture
- Smooth animations with Framer Motion
- Image gallery with lightbox
- GitHub Pages compatibility with proper configuration
- SEO optimization
- Fast performance and accessibility focus

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom UI components
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yaroz-sweets.git
   cd yaroz-sweets
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
yaroz-sweets/
├── public/             # Static assets
│   ├── images/         # Image files
│   └── videos/         # Video files
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Page sections
│   │   └── ui/         # Reusable UI components
│   ├── data/           # Data files
│   └── lib/            # Utility functions
├── .github/            # GitHub configuration
│   └── workflows/      # GitHub Actions workflows
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Adding New Content

### Adding Images & Videos

1. Place new images in the `public/images/` directory
2. Use descriptive filenames for better SEO and accessibility
3. For videos, place them in the `public/videos/` directory (keep them under 10MB)

### Adding a New Service

1. Open `src/data/services.ts`
2. Add a new service object to the `services` array:
   ```typescript
   {
     id: "new-service",
     title: "New Service Title",
     description: "Description of the new service.",
     images: [
       "/images/new_service_1.jpg",
       "/images/new_service_2.jpg",
       "/images/new_service_3.jpg",
     ],
     slug: "new-service",
   }
   ```

## Deployment

The site is configured for GitHub Pages deployment. When you push to the main branch, the GitHub Actions workflow will automatically build and deploy the site.

### Manual Deployment

1. Build the site:
   ```bash
   npm run build
   ```

2. The output will be in the `out` directory, which can be deployed to any static hosting service.

## Customization

- To change the color scheme, update the colors in `tailwind.config.js`
- To modify the typography, update the font settings in `src/app/layout.tsx`
- To change site metadata, update the `siteConfig` object in `src/data/site.ts`

## Accessibility

This site is built with accessibility in mind, including:
- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation
- Sufficient color contrast
- Alt text for images

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Font families: [Inter](https://fonts.google.com/specimen/Inter) and [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) from Google Fonts
- Icons: [Lucide](https://lucide.dev/)
- UI Components: Custom built with inspiration from [shadcn/ui](https://ui.shadcn.com/)
Last rebuild: 2025-05-08 20:54:21
