import { Github, MessageCircle, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/aifordiscord', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://discord.gg/yGzD5jVFMz', label: 'Discord' },
    { icon: Twitter , href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-4">
            <img 
              src="https://i.ibb.co/j9mqKv8y/Screenshot-2025-05-30-23-43-01-49-4495e6112227b794374c62341ece5829.jpg" 
              alt="AI for Discord Logo" 
              className="w-8 h-8 mr-3 rounded-lg"
            />
            <div className="text-2xl font-bold gradient-text">aifordiscord</div>
          </div>
          <p className="text-muted-foreground mb-6 max-w-md">
            Building innovative Discord solutions and web applications using ai.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 aifordiscord. Built with modern web technologies using gpt4o & deepseek v3</p>
        </div>
      </div>
    </footer>
  );
}
