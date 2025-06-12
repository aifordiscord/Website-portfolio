// Vercel serverless function entry point
const express = require('express');
const { createServer } = require('http');
const path = require('path');

// Import the main server logic
const app = express();

// Configure express for production
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// GitHub API proxy endpoints
app.get("/api/github/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Portfolio-Website',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const userData = await response.json();
    res.json(userData);
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
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
      headers: {
        'User-Agent': 'Portfolio-Website',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const reposData = await response.json();
    
    // Filter out forked repos and sort by stars
    const filteredRepos = reposData
      .filter(repo => !repo.name.includes('fork'))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    res.json(filteredRepos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    res.status(500).json({ 
      error: "Failed to fetch GitHub repositories",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

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