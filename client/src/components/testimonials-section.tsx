import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Community Manager",
      company: "TechGuild Discord",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The Discord bot developed by aifordiscord completely transformed our community engagement. Our member activity increased by 300% and moderation became seamless.",
      rating: 5,
      project: "Moderation Bot",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Founder",
      company: "GameDev Hub",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
      content: "Working with aifordiscord was incredible. They delivered a custom music bot with advanced features that our 50k+ member community absolutely loves.",
      rating: 5,
      project: "Music Bot",
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Server Owner",
      company: "Crypto Traders",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "The trading alert bot has been game-changing for our crypto community. Real-time notifications and portfolio tracking keep our members engaged 24/7.",
      rating: 5,
      project: "Trading Bot",
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Discord Admin",
      company: "Art Community",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The custom art showcase bot made sharing artwork so much easier. The automatic gallery features and voting system boosted our artist engagement significantly.",
      rating: 5,
      project: "Gallery Bot",
    },
    {
      id: 5,
      name: "David Kim",
      role: "Team Lead",
      company: "Study Group Discord",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "aifordiscord built us an amazing study companion bot with quiz features, progress tracking, and study reminders. Our students love the gamification elements.",
      rating: 5,
      project: "Study Bot",
    },
    {
      id: 6,
      name: "Lisa Park",
      role: "Event Coordinator",
      company: "Gaming Events",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      content: "The event management bot streamlined our tournament organization. Automated brackets, scheduling, and notifications made running events effortless.",
      rating: 5,
      project: "Event Bot",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by Discord communities worldwide to build engaging and scalable bot solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-8 h-8" />
                </div>
                
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-4">
                  "{testimonial.content}"
                </p>
                
                <Badge variant="outline" className="text-xs">
                  {testimonial.project}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm">Discord Bots Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">1M+</div>
              <div className="text-sm">Users Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24/7</div>
              <div className="text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}