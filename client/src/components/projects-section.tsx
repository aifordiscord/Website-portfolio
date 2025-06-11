import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, GitFork, ExternalLink, Github, AlertCircle } from "lucide-react";
import type { GitHubRepo } from "@shared/schema";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: repos, isLoading, error } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/github/repos/aifordiscord"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categorizeRepo = (repo: GitHubRepo): string => {
    const name = repo.name.toLowerCase();
    const description = repo.description?.toLowerCase() || "";
    const topics = repo.topics || [];
    
    if (topics.includes('discord') || topics.includes('discord-bot') || name.includes('discord') || description.includes('discord')) {
      return 'discord';
    }
    if (topics.includes('ai') || topics.includes('machine-learning') || topics.includes('artificial-intelligence') || description.includes('ai') || description.includes('ml')) {
      return 'ai';
    }
    if (topics.includes('web') || topics.includes('webapp') || topics.includes('website') || repo.language === 'JavaScript' || repo.language === 'TypeScript' || repo.language === 'HTML') {
      return 'web';
    }
    return 'other';
  };

  const filteredRepos = repos?.filter(repo => {
    if (activeFilter === 'all') return true;
    return categorizeRepo(repo) === activeFilter;
  }) || [];

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Python': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'HTML': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'CSS': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Java': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Go': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      'Rust': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return colors[language || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'discord', label: 'Discord Bots' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ai', label: 'AI Projects' },
  ];

  if (error) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Unable to Load Projects</h2>
          <p className="text-muted-foreground mb-6">
            There was an error loading the GitHub repositories. Please check your internet connection or try again later.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my latest work in Discord automation, AI integration, and web development
          </p>
        </div>
        
        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              variant={activeFilter === button.id ? "default" : "outline"}
              onClick={() => setActiveFilter(button.id)}
              className={activeFilter === button.id ? "bg-primary text-primary-foreground" : ""}
            >
              {button.label}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="w-full h-48 bg-muted animate-pulse" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex gap-3">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {activeFilter === 'all' 
                ? "No repositories found. This might be due to API rate limits or the user profile not being accessible."
                : `No ${activeFilter} projects found. Try selecting a different category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRepos.slice(0, 6).map((repo) => (
              <Card key={repo.id} className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {categorizeRepo(repo) === 'discord' && '🤖'}
                    {categorizeRepo(repo) === 'web' && '🌐'}
                    {categorizeRepo(repo) === 'ai' && '🧠'}
                    {categorizeRepo(repo) === 'other' && '💻'}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {repo.name}
                    </CardTitle>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {repo.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <Badge variant="secondary" className={getLanguageColor(repo.language)}>
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics?.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button asChild size="sm" variant="outline">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <a href="https://github.com/aifordiscord" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Repositories
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
