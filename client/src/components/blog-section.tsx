import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable Discord Bots with Python",
      description: "Learn how to create Discord bots that can handle millions of users with proper architecture and optimization techniques.",
      content: "In this comprehensive guide, we'll explore the fundamentals of building Discord bots that scale...",
      date: "2024-03-15",
      readTime: "8 min read",
      tags: ["Discord", "Python", "Bot Development"],
      featured: true,
    },
    {
      id: 2,
      title: "Integrating AI into Discord Communities",
      description: "Discover how to enhance your Discord server with AI-powered features like smart moderation and content generation.",
      content: "AI integration in Discord servers is revolutionizing how communities interact...",
      date: "2024-03-10",
      readTime: "6 min read",
      tags: ["AI", "Discord", "Machine Learning"],
      featured: false,
    },
    {
      id: 3,
      title: "Modern Web Development with React and TypeScript",
      description: "Best practices for building robust web applications using React, TypeScript, and modern tooling.",
      content: "Modern web development requires a solid understanding of type safety and component architecture...",
      date: "2024-03-05",
      readTime: "10 min read",
      tags: ["React", "TypeScript", "Web Development"],
      featured: false,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on Discord bot development, AI integration, and modern web technologies
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-8xl opacity-20">📝</div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <Button className="group/btn">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Other Posts */}
          <div className="space-y-6">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                    <Clock className="w-3 h-3 ml-2" />
                    {post.readTime}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* View All Posts */}
            <Card className="bg-muted/50 hover:bg-muted/70 transition-colors">
              <CardContent className="flex items-center justify-center p-8 text-center">
                <div>
                  <h3 className="font-semibold mb-2">More Articles Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to get notified when new content is published
                  </p>
                  <Button variant="outline" size="sm">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}