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
