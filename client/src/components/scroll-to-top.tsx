import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    const throttledToggleVisibility = throttle(toggleVisibility, 10);
    window.addEventListener('scroll', throttledToggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Throttle function for better performance
  function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}>
      {/* Progress ring */}
      <div className="relative">
        <svg className="w-12 h-12 -rotate-90 absolute inset-0" viewBox="0 0 36 36">
          <path
            className="text-muted/20"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-primary transition-all duration-300 ease-out"
            strokeWidth="2"
            strokeDasharray={`${scrollProgress}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* Button */}
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg bg-background/95 hover:bg-background border border-border hover:border-primary/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <ChevronUp className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
            <ArrowUp className="h-3 w-3 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Button>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Back to top
      </div>
    </div>
  );
}