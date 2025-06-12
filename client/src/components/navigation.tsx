import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, Home, FolderOpen, Settings, User, Star, MessageSquare, FileText, Mail, ExternalLink } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

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

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const externalLinks = [
    { href: 'https://github.com/aifordiscord', label: 'GitHub', icon: ExternalLink },
    { href: 'https://discord.gg/yGzD5jVFMz', label: 'Discord Community', icon: ExternalLink },
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

          {/* Desktop Navigation with Menubar */}
          <div className="hidden md:flex items-center">
            <Menubar className="bg-transparent border-none">
              <MenubarMenu>
                <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground">
                  Navigation
                </MenubarTrigger>
                <MenubarContent>
                  {navigationItems.map((item) => (
                    <MenubarItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="cursor-pointer"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground">
                  Links
                </MenubarTrigger>
                <MenubarContent>
                  {externalLinks.map((link) => (
                    <MenubarItem key={link.href} asChild>
                      <a 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </a>
                    </MenubarItem>
                  ))}
                  <MenubarSeparator />
                  <MenubarItem 
                    onClick={() => window.open('mailto:contact@aifordiscord.dev', '_blank')}
                    className="cursor-pointer"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground">
                  Theme
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem 
                    onClick={() => setTheme('light')}
                    className="cursor-pointer"
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light Mode
                  </MenubarItem>
                  <MenubarItem 
                    onClick={() => setTheme('dark')}
                    className="cursor-pointer"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </MenubarItem>
                  <MenubarItem 
                    onClick={() => setTheme('system')}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    System
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
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