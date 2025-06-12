import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Globe, Brain, Settings, Zap, Shield, Music, BarChart3 } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Custom Discord Bots",
      description: "Tailored Discord bots with advanced features for moderation, entertainment, and community engagement.",
      icon: Bot,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      features: [
        "Custom commands & slash commands",
        "Advanced moderation systems",
        "Role management automation",
        "Welcome & leveling systems",
        "Database integration"
      ],

      popular: true,
    },
    {
      id: 2,
      title: "AI Integration",
      description: "Enhance your Discord server with AI-powered features like smart moderation and content generation.",
      icon: Brain,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      features: [
        "OpenAI ChatGPT integration",
        "Smart content filtering",
        "Automated responses",
        "Image generation",
        "Sentiment analysis"
      ],

      popular: false,
    },
    {
      id: 3,
      title: "Music & Entertainment Bots",
      description: "Feature-rich music bots with playlist management, sound effects, and interactive games.",
      icon: Music,
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      features: [
        "High-quality music streaming",
        "Playlist & queue management",
        "Sound effects library",
        "Interactive mini-games",
        "Voice channel automation"
      ],

      popular: false,
    },
    {
      id: 4,
      title: "Web Applications",
      description: "Modern web applications built with React, Node.js, and cloud technologies.",
      icon: Globe,
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      features: [
        "Responsive design",
        "Real-time features",
        "Database integration",
        "Authentication systems",
        "API development"
      ],

      popular: false,
    },
    {
      id: 5,
      title: "Analytics & Monitoring",
      description: "Comprehensive analytics dashboards and monitoring systems for your Discord community.",
      icon: BarChart3,
      color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
      features: [
        "Member activity tracking",
        "Message analytics",
        "Custom dashboards",
        "Alert systems",
        "Performance monitoring"
      ],

      popular: false,
    },
    {
      id: 6,
      title: "Bot Hosting & Maintenance",
      description: "Reliable 24/7 hosting and ongoing maintenance for your Discord bots.",
      icon: Settings,
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      features: [
        "99.9% uptime guarantee",
        "Automatic updates",
        "Performance optimization",
        "24/7 monitoring",
        "Technical support"
      ],

      popular: false,
    },
  ];



  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Services & Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional Discord bot development and web solutions tailored to your community's needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className={`hover:shadow-xl transition-all duration-300 relative overflow-hidden ${service.popular ? 'ring-2 ring-primary' : ''}`}>
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    <Zap className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Features included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <Button 
                    onClick={scrollToContact} 
                    className="w-full"
                    variant={service.popular ? "default" : "outline"}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        
        {/* Process Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Development Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Discuss your requirements and project scope",
                icon: "💬"
              },
              {
                step: "2", 
                title: "Planning",
                description: "Create detailed project plan and timeline",
                icon: "📋"
              },
              {
                step: "3",
                title: "Development",
                description: "Build and test your custom solution",
                icon: "⚡"
              },
              {
                step: "4",
                title: "Deployment",
                description: "Launch and provide ongoing support",
                icon: "🚀"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {process.icon}
                </div>
                <div className="text-sm text-primary font-medium mb-2">Step {process.step}</div>
                <h4 className="font-semibold mb-2">{process.title}</h4>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your project and bring your Discord community to the next level with custom bot solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={scrollToContact} size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Project
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#portfolio" className="inline-flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                View Previous Work
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}