import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, Github, MessageCircle, Youtube, FolderOpen } from "lucide-react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { 
      label: 'GitHub', 
      icon: Github, 
      action: () => window.open('https://github.com/aifordiscord', '_blank')
    },
    { 
      label: 'Discord', 
      icon: MessageCircle, 
      action: () => window.open('https://discord.gg/yGzD5jVFMz', '_blank')
    },
    { 
      label: 'YouTube', 
      icon: Youtube, 
      action: () => window.open('https://youtube.com/@aifordiscord?si=8eW8PWO-sjeNqtX1', '_blank')
    },
    { 
      label: 'Projects', 
      icon: FolderOpen, 
      action: () => scrollToSection('projects')
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect bg-white/90 dark:bg-github-dark/90 border-b border-gray-200 dark:border-github-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/j9mqKv8y/Screenshot-2025-05-30-23-43-01-49-4495e6112227b794374c62341ece5829.jpg" 
              alt="AI for Discord Logo" 
              className="w-8 h-8 mr-3 rounded-lg"
            />
            <div className="text-xl font-bold gradient-text">
              aifordiscord
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.action}
                className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="bg-background hidden md:flex"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-background"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-github-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors w-full text-left"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-200 dark:border-github-border mt-2 pt-2">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="flex items-center px-3 py-2 text-base font-medium hover:text-primary transition-colors w-full text-left"
                >
                  {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  Toggle Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}