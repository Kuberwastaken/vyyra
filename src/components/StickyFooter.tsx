import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const StickyFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const closedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Only show if not closed in this session
      if (!closedRef.current) {
        setIsVisible(scrollPosition > windowHeight * 0.8);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check in case user already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    closedRef.current = true;
  };

  if (!isVisible) return null;

  return (
    <div
      id="pricing"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in"
    >
      <div className="glass-card rounded-2xl p-4 shadow-2xl max-w-md mx-auto border border-gray-200/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 mb-1">
              Build your first newsletter in 30 seconds
            </p>
            <p className="text-sm text-gray-600">
              Free to try, no credit card required
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-6">
              Start Free
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-xl hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;
