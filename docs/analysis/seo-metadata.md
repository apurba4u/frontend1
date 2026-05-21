# SEO Strategy & Metadata Analysis

## Overview
StudyNook utilizes Next.js's built-in Metadata API to manage SEO. This approach ensures that metadata is statically generated or dynamically updated for each route, improving search engine crawlability.

## Current Implementation

### 1. Global Metadata (`src/app/layout.jsx`)
- **Title Template**: Uses `%s | StudyNook`, allowing individual pages to provide specific titles while maintaining brand consistency.
- **Default Description**: Provides a broad but relevant description of the service.
- **Keywords**: Basic keywords are defined globally.
- **Viewport & Icons**: Managed automatically by Next.js or via `favicon.ico`.

### 2. Page-Specific Metadata
- Currently, individual pages (like `/rooms/[id]`) should implement `generateMetadata` to provide specific room names and descriptions for better social sharing (OpenGraph) and search relevance.

## Strengths
- **Next.js Metadata API**: Centralized and type-safe way to manage tags.
- **Dynamic Titles**: The title template is a best practice for consistent branding.

## Areas for Improvement
- **OpenGraph (OG) Tags**: Missing explicit OG tags for images, which are crucial for link previews on social media (Facebook, Twitter/X, LinkedIn).
- **Robots.txt & Sitemap**: Need a `robots.js` and `sitemap.js` file to guide search engine crawlers.
- **Structured Data (JSON-LD)**: Adding `Product` or `Place` schema for room listings would enable rich snippets in Google search results.
- **Dynamic Meta for Rooms**: Ensure `src/app/rooms/[id]/page.jsx` fetches the room name and uses it in the meta title.

## Conclusion
The foundation for SEO is solid. To move from "functional" to "competitive," the project needs more detailed OpenGraph configuration and structured data for the listing pages.
