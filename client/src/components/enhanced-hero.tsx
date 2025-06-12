import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Code, MapPin, Zap, Github, Star, GitFork, Users } from "lucide-react";
import type { GitHubUser } from "@shared/schema";

export function EnhancedHero() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const texts = [
    "Discord bot automation",
    "AI-powered solutions", 
    "scalable web applications",
    "modern user experiences"
  ];

  const { data: githubUser, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["/api/github/user/aifordiscord"],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data: githubRepos, isLoading: reposLoading } = useQuery({
    queryKey: ["/api/github/repos/aifordiscord"],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    const currentText = texts[currentIndex];
    if (typedText.length < currentText.length) {
      const timer = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setTypedText("");
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [typedText, currentIndex, texts]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalStars = githubRepos?.stats?.total_stars || 0;
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const stats = [
    { 
      icon: Star, 
      label: "GitHub Stars", 
      value: userLoading || reposLoading ? "Loading..." : formatNumber(totalStars),
      trend: totalStars > 0 ? "+" : null
    },
    { 
      icon: GitFork, 
      label: "Repositories", 
      value: userLoading ? "Loading..." : githubUser?.public_repos?.toString() || "0",
      trend: (githubUser?.public_repos || 0) > 10 ? "+" : null
    },
    { 
      icon: Users, 
      label: "Followers", 
      value: userLoading ? "Loading..." : formatNumber(githubUser?.followers || 0),
      trend: (githubUser?.followers || 0) > 50 ? "+" : null
    },
  ];

  return (
    <section id="home" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Code className="w-4 h-4 mr-2" />
                  Available for hire
                </Badge>
                {githubUser && (
                  <Badge variant="outline" className="px-4 py-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Active on GitHub
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Building the future of{" "}
                <span className="gradient-text block min-h-[1.2em]">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {githubUser?.bio || "Full-stack developer specializing in Discord bots, AI integration, and modern web applications. Passionate about creating seamless user experiences and scalable solutions."}
              </p>
            </div>
            
            {/* GitHub Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-muted/30 rounded-lg backdrop-blur-sm hover:bg-muted/40 transition-all duration-300 group">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="font-semibold text-lg flex items-center justify-center gap-1">
                    {stat.value}
                    {stat.trend && (
                      <span className="text-xs text-green-500 animate-pulse">{stat.trend}</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  {!userLoading && !reposLoading && stat.value !== "Loading..." && (
                    <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${Math.min(100, index === 0 ? (totalStars / 100) * 100 : index === 1 ? Math.min(100, ((githubUser?.public_repos || 0) / 50) * 100) : Math.min(100, ((githubUser?.followers || 0) / 200) * 100))}%` 
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button onClick={() => scrollToSection('projects')} size="lg" className="bg-primary hover:bg-primary/90 group">
                <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                View My Work
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={githubUser?.html_url || "https://github.com/aifordiscord"} target="_blank" rel="noopener noreferrer" className="group">
                  <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  GitHub Profile
                </a>
              </Button>
              <Button onClick={() => scrollToSection('services')} variant="ghost" size="lg" className="group">
                <span className="group-hover:underline">Explore Services</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{githubUser?.location || "Remote"}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce-subtle mr-2"></div>
                <span>Available for projects</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            {/* Main Hero Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern developer workspace showcasing Discord bot development" 
                className="relative rounded-2xl shadow-2xl w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Floating Status Card */}
              <div className="absolute -bottom-6 -right-6 bg-background/95 backdrop-blur-sm border border-border p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full absolute inset-0 animate-ping opacity-75"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Online</div>
                    <div className="text-xs text-muted-foreground">Building amazing bots</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Tech Stack Icons */}
              <div className="absolute -top-4 -left-4 bg-background/95 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg animate-float-delayed">
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">Py</div>
                  <div className="w-6 h-6 bg-yellow-500 rounded text-black text-xs flex items-center justify-center font-bold">JS</div>
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">TS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}