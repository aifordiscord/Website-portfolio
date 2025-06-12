// Vercel serverless function entry point
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');

// Import the main server logic
const app = express();

// Configure express for production
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://*.vercel.app', 'https://*.replit.app'] 
    : ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.static(path.join(__dirname, '../dist')));

// GitHub API proxy endpoints with enhanced caching
app.get("/api/github/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    // Set cache headers for GitHub API responses
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Portfolio-Website/1.0',
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          error: "GitHub user not found",
          message: `User ${username} does not exist`
        });
      }
      if (response.status === 403) {
        return res.status(429).json({ 
          error: "GitHub API rate limit exceeded",
          message: "Please try again later or provide a GitHub token"
        });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const userData = await response.json();
    
    // Add computed stats
    const enhancedData = {
      ...userData,
      computed_stats: {
        total_stars: 0, // Will be calculated from repos
        activity_score: Math.min(100, userData.public_repos * 2 + userData.followers),
        last_updated: new Date().toISOString()
      }
    };
    
    res.json(enhancedData);
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    res.status(500).json({ 
      error: "Failed to fetch GitHub user data",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.get("/api/github/repos/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    // Set cache headers
    res.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50&type=owner`, {
      headers: {
        'User-Agent': 'Portfolio-Website/1.0',
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          error: "GitHub user not found",
          message: `User ${username} does not exist`
        });
      }
      if (response.status === 403) {
        return res.status(429).json({ 
          error: "GitHub API rate limit exceeded",
          message: "Please try again later or provide a GitHub token"
        });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const reposData = await response.json();
    
    // Enhanced filtering and processing
    const filteredRepos = reposData
      .filter(repo => !repo.fork && !repo.archived && repo.stargazers_count >= 0)
      .sort((a, b) => {
        // Sort by stars first, then by recent activity
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 20)
      .map(repo => ({
        ...repo,
        computed_metrics: {
          popularity_score: repo.stargazers_count * 3 + repo.forks_count * 2 + (repo.watchers_count || 0),
          activity_level: getActivityLevel(repo.updated_at),
          tech_stack: repo.topics || [],
          last_commit: repo.updated_at
        }
      }));
    
    const totalStats = {
      total_repos: filteredRepos.length,
      total_stars: filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      total_forks: filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: [...new Set(filteredRepos.map(repo => repo.language).filter(Boolean))],
      last_updated: new Date().toISOString()
    };
    
    res.json({
      repositories: filteredRepos,
      stats: totalStats
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    res.status(500).json({ 
      error: "Failed to fetch GitHub repositories",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Helper function to determine activity level
function getActivityLevel(updatedAt) {
  const now = new Date();
  const lastUpdate = new Date(updatedAt);
  const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysSinceUpdate <= 7) return 'very-active';
  if (daysSinceUpdate <= 30) return 'active';
  if (daysSinceUpdate <= 90) return 'moderate';
  return 'inactive';
}

// Contact form endpoint (simplified for Vercel)
app.post("/api/contact", async (req, res) => {
  try {
    // For Vercel deployment, we'll just validate and return success
    // In production, you might want to integrate with a service like Formspree or EmailJS
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Missing required fields",
        message: "Name, email, and message are required"
      });
    }

    // Log the contact form submission (in production, send to email service)
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: Date.now()
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(400).json({ 
      error: "Failed to submit contact form",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Export for Vercel
module.exports = app;