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
