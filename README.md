# Digital Citizen Engagement Platform

A pixel-perfect recreation of the Ministry of Corporate Affairs eConsult Analytics platform. This is a static website implementation with responsive design, accessibility features, and interactive elements.

## 🚀 Quick Start

### Local Development
1. Open `index.html` in your web browser
2. No build process required - it's ready to use!

### For Production
Use the minified versions for better performance:
- Replace `css/main.css` with `css/main.min.css` in `index.html`
- Replace `js/main.js` with `js/main.min.js` in `index.html`

## 📁 Project Structure

```
ditto-site/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Development CSS (unminified)
│   └── main.min.css       # Production CSS (minified)
├── js/
│   ├── main.js            # Development JavaScript (unminified)
│   └── main.min.js        # Production JavaScript (minified)
├── assets/
│   ├── images/
│   │   └── ashoka-emblem.svg  # Government of India emblem
│   └── icons/             # Icon assets (if any)
├── favicon.ico            # Favicon placeholder
├── README.md              # This file
└── CHANGELOG.md           # Change log
```

## 🌐 Deployment Instructions

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files maintaining the folder structure
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at: `https://[username].github.io/[repository-name]`

### Netlify

1. Create a Netlify account at https://netlify.com
2. Drag and drop the `ditto-site` folder to Netlify dashboard
3. Your site will be instantly deployed with a unique URL
4. Optional: Configure a custom domain in Site settings

### Replit

1. Create a new HTML/CSS/JS Repl on Replit
2. Upload all files to the Repl
3. Click "Run" to preview
4. Your site will be available at the Replit-provided URL

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the project folder
3. Run: `vercel`
4. Follow the prompts
5. Your site will be deployed to a Vercel URL

## 🎨 Features

- **Responsive Design**: Optimized for desktop (1280px), tablet (768px), and mobile (375px)
- **Accessibility**: WCAG 2.1 compliant with semantic HTML, ARIA labels, and keyboard navigation
- **Interactive Elements**: 
  - Modal dialogs for citizen and official login
  - Form validation with real-time feedback
  - Aadhaar number input with auto-advance
  - Smooth animations and transitions
- **Performance Optimized**: Minified CSS/JS for production
- **Cross-browser Compatible**: Works on Chrome, Firefox, Safari, and Edge

## 🔧 Customization

### Colors
Edit CSS variables in `:root` selector in `css/main.css`:
```css
--primary-purple: #6366F1;
--green-accent: #10B981;
--orange-accent: #FB923C;
```

### Content
- Edit text directly in `index.html`
- Modify statistics in the hero section
- Update footer links and copyright

### API Integration
To connect to real backend APIs:
1. Edit `js/main.js`
2. Replace the form submission handlers (lines 189-245)
3. Add actual API endpoints for:
   - Aadhaar verification
   - Official portal authentication
   - Data retrieval for statistics

## 🛠️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This is a recreation for demonstration purposes. All rights for the original design belong to the Ministry of Corporate Affairs, Government of India.

## 🤝 Support

For issues or questions about deployment, please refer to the platform-specific documentation:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Replit Docs](https://docs.replit.com/)
- [Vercel Docs](https://vercel.com/docs)