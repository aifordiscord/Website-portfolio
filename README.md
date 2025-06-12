# AI for Discord - Professional Portfolio

A modern, responsive portfolio website showcasing Discord bot development services, built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with GitHub-inspired dark/light themes
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Sections**:
  - Enhanced hero with animated typing effect and GitHub stats
  - Dynamic project showcase fetching real GitHub repositories
  - Comprehensive services section with pricing
  - Professional experience timeline
  - Skills showcase with progress indicators
  - Client testimonials with ratings
  - Blog section for articles and insights
  - Contact form with validation
- **Performance Optimized**: Fast loading with modern web technologies
- **SEO Ready**: Proper meta tags and semantic HTML structure

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query
- **Routing**: Wouter
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
# Create .env file
GITHUB_TOKEN=your_github_token_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

### Vercel Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `GITHUB_TOKEN` (optional, for higher API rate limits)
4. Deploy automatically

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express.js backend (development)
├── api/                    # Vercel serverless functions
├── shared/                 # Shared types and schemas
└── vercel.json            # Vercel configuration
```

## Features in Detail

### Enhanced Hero Section
- Animated typing effect showcasing different specializations
- Real-time GitHub statistics integration
- Interactive call-to-action buttons
- Floating animation effects

### Projects Section
- Automatic GitHub repository fetching
- Project categorization (Discord bots, Web apps, AI projects)
- Interactive filtering
- Repository statistics and links

### Services Section
- Detailed service offerings with pricing
- Feature comparisons
- Development process timeline
- Call-to-action integration

### Experience Timeline
- Professional work history
- Education and certifications
- Technology stack for each role
- Achievement highlights

### Testimonials
- Client reviews with ratings
- Company information and avatars
- Project type categorization
- Performance statistics

### Blog Section
- Featured articles
- Reading time estimates
- Topic categorization
- Newsletter subscription

## Customization

### Personal Information
Update the following files with your information:
- `client/src/components/enhanced-hero.tsx` - Hero content
- `client/src/components/experience-section.tsx` - Work history
- `client/src/components/testimonials-section.tsx` - Client reviews
- `client/src/components/contact-section.tsx` - Contact details

### GitHub Integration
The portfolio automatically fetches repositories from the GitHub user "aifordiscord". To change this:
1. Update the GitHub username in API calls
2. Optionally add a GitHub token for higher rate limits

### Styling
- Colors: Modify CSS variables in `client/src/index.css`
- Animations: Add custom animations in the utilities layer
- Components: Customize shadcn/ui components as needed

## Performance

- Lazy loading for images and components
- Optimized bundle splitting
- Efficient state management with TanStack Query
- Responsive images and modern formats

## SEO Optimization

- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt text for images
- Structured data ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio.

## Support

For questions or issues, please open an issue on GitHub or contact through the portfolio contact form.