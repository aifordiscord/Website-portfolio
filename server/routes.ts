import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import type { GitHubRepo, GitHubUser } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
        if (response.status === 403) {
          // Return fallback data when rate limited
          const fallbackUser: GitHubUser = {
            login: username,
            name: "AI For Discord",
            bio: "Discord bot developer and AI enthusiast",
            location: "Global",
            public_repos: 25,
            followers: 150,
            following: 50,
            avatar_url: "https://i.ibb.co/j9mqKv8y/Screenshot-2025-05-30-23-43-01-49-4495e6112227b794374c62341ece5829.jpg",
            html_url: `https://github.com/${username}`
          };
          return res.json(fallbackUser);
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const userData: GitHubUser = await response.json();
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
        if (response.status === 403) {
          // Return fallback repositories when rate limited
          const fallbackRepos: GitHubRepo[] = [
            {
              id: 1,
              name: "discord-ai-bot",
              full_name: `${username}/discord-ai-bot`,
              description: "Advanced Discord bot with AI integration and automation features",
              html_url: `https://github.com/${username}/discord-ai-bot`,
              stargazers_count: 45,
              forks_count: 12,
              language: "JavaScript",
              topics: ["discord", "ai", "bot", "automation"],
              updated_at: "2024-01-15T10:30:00Z",
              homepage: null,
              fork: false,
              archived: false,
              watchers_count: 45
            },
            {
              id: 2,
              name: "portfolio-website",
              full_name: `${username}/portfolio-website`,
              description: "Modern portfolio website built with React and TypeScript",
              html_url: `https://github.com/${username}/portfolio-website`,
              stargazers_count: 23,
              forks_count: 7,
              language: "TypeScript",
              topics: ["react", "portfolio", "website", "typescript"],
              updated_at: "2024-01-10T14:20:00Z",
              homepage: "https://aifordiscord.vercel.app",
              fork: false,
              archived: false,
              watchers_count: 23
            },
            {
              id: 3,
              name: "discord-tools",
              full_name: `${username}/discord-tools`,
              description: "Collection of useful Discord development tools and utilities",
              html_url: `https://github.com/${username}/discord-tools`,
              stargazers_count: 18,
              forks_count: 5,
              language: "Python",
              topics: ["discord", "tools", "utilities", "development"],
              updated_at: "2024-01-05T09:15:00Z",
              homepage: null,
              fork: false,
              archived: false,
              watchers_count: 18
            }
          ];

          const totalStats = {
            total_repos: fallbackRepos.length,
            total_stars: fallbackRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            total_forks: fallbackRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
            languages: Array.from(new Set(fallbackRepos.map(repo => repo.language).filter((lang): lang is string => Boolean(lang)))),
            last_updated: new Date().toISOString()
          };

          return res.json({
            repositories: fallbackRepos,
            stats: totalStats
          });
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const reposData: GitHubRepo[] = await response.json();
      
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
        .slice(0, 20);
      
      const totalStats = {
        total_repos: filteredRepos.length,
        total_stars: filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        total_forks: filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
        languages: Array.from(new Set(filteredRepos.map(repo => repo.language).filter((lang): lang is string => Boolean(lang)))),
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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(400).json({ 
        error: "Failed to submit contact form",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
