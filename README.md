
# 🚀 AI for Discord - Professional Portfolio

> A cutting-edge, responsive portfolio website showcasing Discord bot development services, built with React, TypeScript, and Tailwind CSS.

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>

## ✨ Features

- 🎨 **Modern Design**: Clean, professional UI with GitHub-inspired dark/light themes
- 📱 **Responsive Layout**: Pixel-perfect design optimized for all devices
- ⚡ **Interactive Sections**:
  - Hero with animated typing effect and real-time GitHub stats
  - Dynamic project showcase with live GitHub integration
  - Comprehensive services with pricing tiers
  - Professional experience timeline
  - Skills showcase with animated progress indicators
  - Client testimonials with star ratings
  - Blog section for insights and articles
  - Contact form with real-time validation
- 🚀 **Performance Optimized**: Lightning-fast loading with modern web technologies
- 🔍 **SEO Ready**: Complete meta tags and semantic HTML structure
- 🔄 **Real-time Updates**: Live GitHub data integration

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Backend** | Express.js, Node.js |
| **Styling** | Tailwind CSS with custom animations |
| **Icons** | Lucide React |
| **Data Fetching** | TanStack Query |
| **Routing** | Wouter |
| **UI Components** | Radix UI + shadcn/ui |
| **Deployment** | Replit, Vercel |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aifordiscord/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables (optional)
echo "GITHUB_TOKEN=your_github_token_here" > .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000` 🎉

## 🌐 Deployment

### 🟦 Deploy to Replit (Recommended)

Replit provides seamless deployment with zero configuration:

1. **Import from GitHub**:
   ```
   1. Go to https://replit.com/new
   2. Click "Import from GitHub"
   3. Enter: https://github.com/aifordiscord/portfolio
   4. Click "Import"
   ```

2. **Configure Environment**:
   ```bash
   # Add GitHub token in Secrets (optional)
   GITHUB_TOKEN=your_github_token_here
   ```

3. **Deploy**:
   ```
   1. Click the "Deploy" button
   2. Choose your deployment tier
   3. Your app will be live at: https://your-app-name.replit.app
   ```

**Replit Deployment Features:**
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Environment variables
- ✅ Autoscaling
- ✅ Global CDN
- ✅ Zero downtime deployments

### ⚡ Deploy to Vercel

For advanced deployment scenarios:

1. **One-Click Deploy**:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aifordiscord/pWebsite-portfolio)

2. **Manual Deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Follow the prompts
   ```

3. **GitHub Integration**:
   ```bash
   # Connect repository to Vercel
   1. Push code to GitHub
   2. Import project in Vercel dashboard
   3. Set environment variables:
      - GITHUB_TOKEN (optional)
   4. Deploy automatically on every push
   ```

**Vercel Configuration** (`vercel.json`):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/index.js": {
      "runtime": "@vercel/node",
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

## 📁 Project Structure

```
portfolio/
├── 📂 client/                 # Frontend React application
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable UI components
│   │   │   ├── 📂 ui/         # shadcn/ui components
│   │   │   ├── enhanced-hero.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── ...
│   │   ├── 📂 pages/          # Page components
│   │   ├── 📂 lib/            # Utilities and configurations
│   │   └── 📂 hooks/          # Custom React hooks
├── 📂 server/                 # Express.js backend
├── 📂 api/                    # Vercel serverless functions
├── 📂 shared/                 # Shared types and schemas
└── 📄 vercel.json            # Deployment configuration
```

## 🎯 Features Deep Dive

### 🎨 Enhanced Hero Section
```tsx
// Real-time GitHub stats integration
const { data: githubUser } = useQuery({
  queryKey: ['github-user'],
  queryFn: () => fetch('/api/github/user/aifordiscord').then(r => r.json())
});

// Animated typing effect
const specializations = [
  "Discord Bots",
  "AI Integration", 
  "Web Applications"
];
```

### 📊 Dynamic Projects
```tsx
// Auto-fetch GitHub repositories
const { data: repos } = useQuery({
  queryKey: ['github-repos'],
  queryFn: () => fetch('/api/github/repos/aifordiscord').then(r => r.json())
});
```


## ⚙️ Configuration

### 🔧 Personal Customization

Update these files with your information:

```typescript
// client/src/components/enhanced-hero.tsx
const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  github: "your-github-username"
};

// client/src/components/contact-section.tsx
const contactInfo = {
  email: "your-email@domain.com",
  discord: "your-discord-server",
  github: "your-github"
};
```

### 🎨 Theme Customization

```css
/* client/src/index.css */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* Customize your colors */
}
```

### 🔗 GitHub Integration

```bash
# Optional: Higher API rate limits
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

## 📈 Performance Metrics

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Performance**: 90+
- 🔍 **SEO Score**: 100

## 🎨 Styling System

```css
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🔒 Security Features

- 🛡️ **Headers**: Security headers configured
- 🔐 **HTTPS**: Enforced in production
- 🚫 **XSS Protection**: Built-in safeguards
- 📝 **Input Validation**: Form validation with Zod

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📊 Analytics Integration

```typescript
// Add your analytics
const analytics = {
  google: "G-XXXXXXXXXX",
  mixpanel: "your-token",
  hotjar: "your-id"
};
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port conflicts**: Change port in `.replit` file
2. **Build failures**: Check Node.js version (18+)
3. **API rate limits**: Add GitHub token
4. **Styling issues**: Clear browser cache

### Debug Mode:
```bash
DEBUG=* npm run dev
```

## 📄 License

MIT License - feel free to use this project for your own portfolio! 🎉

## 💬 Support & Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/aifordiscord/portfolio/issues)
- 💬 **Discord**: [Join our community](https://discord.gg/yGzD5jVFMz)
- 📧 **Email**: contact@aifordiscord.dev

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by [aifordiscord](https://github.com/aifordiscord)

</div>
