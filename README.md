# Bitcoin Mining Insider

A static website showcasing Bitcoin mining news, guides, and insights. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Static Blog**: No backend required - all content is static
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Search Functionality**: Find articles quickly with the search feature
- **Category Filtering**: Browse articles by category
- **Modern UI**: Clean, Bitcoin-themed design with smooth animations
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 📁 Project Structure

```
BitcoinMiningInsider/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and static data
│   │   └── hooks/         # Custom React hooks
│   └── index.html         # Main HTML file
├── shared/                # Shared TypeScript types
├── .github/workflows/     # GitHub Actions for deployment
└── dist/                  # Built static files (generated)
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/BitcoinMiningInsider.git
cd BitcoinMiningInsider
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with TypeScript

## 🌐 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The site will automatically deploy when you push to main

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `dist/` directory

3. Deploy the `dist/` folder to your web server

## 📝 Adding Content

### Blog Posts

To add new blog posts, edit `client/src/lib/static-data.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 6, // Unique ID
    title: "Your Article Title",
    slug: "your-article-slug",
    excerpt: "Brief description of the article...",
    content: "<p>Your article content in HTML...</p>",
    imageUrl: "https://your-image-url.com/image.jpg",
    category: "Hardware Review", // Must match existing category
    readTime: 8, // Reading time in minutes
    authorName: "Author Name",
    authorAvatar: "https://author-avatar-url.com/avatar.jpg",
    publishedAt: new Date("2024-12-20"),
    featured: false, // Set to true to feature on homepage
    tags: ["tag1", "tag2", "tag3"]
  }
];
```

### Categories

To add new categories, edit the `categories` array in the same file:

```typescript
export const categories: Category[] = [
  {
    id: 6,
    name: "New Category",
    slug: "new-category",
    description: "Description of the new category"
  }
];
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors: Edit `tailwind.config.ts`
- Components: Modify files in `client/src/components/`
- Layout: Update `client/src/App.tsx`

### Theme

The site uses a Bitcoin-themed color scheme with orange accents. You can modify the colors in:

- `tailwind.config.ts` - Color definitions
- Component files - Individual styling

## 🔧 Configuration

### Base Path

If deploying to a subdirectory, update the base path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/your-repo-name/", // Change this for your repository
  // ... other config
});
```

### Package.json

Update the homepage field in `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/BitcoinMiningInsider"
}
```

## 📊 Performance

The site is optimized for performance:

- Static generation - no server-side rendering
- Optimized images and assets
- Minimal JavaScript bundle
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify your Node.js version is 18+
4. Create an issue in the repository

---

Built with ❤️ for the Bitcoin mining community 