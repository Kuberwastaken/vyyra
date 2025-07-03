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
      if (!closedRef.current) {
        setIsVisible(scrollPosition > windowHeight * 0.8);
      }
    };
    window.addEventListener("scroll", handleScroll);
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
      id="sticky-fab"
      className="fixed bottom-6 right-6 z-50 animate-bounce-in"
      style={{ maxWidth: 400, minWidth: 260 }}
    >
      <div className="glass-card rounded-2xl p-3 shadow-2xl border border-gray-200/50 flex items-center gap-3 backdrop-blur-md bg-white/70 hover:shadow-3xl transition-all duration-300">
        <span
          className="text-2xl mr-2 select-none"
          role="img"
          aria-label="Rocket"
        >
          🚀
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 mb-0.5 break-words leading-snug text-base sm:text-[1rem]">
            Build your first newsletter in 30 seconds
          </p>
          <p className="text-xs text-gray-600 break-words leading-tight">
            Free to try, no credit card required
          </p>
        </div>
        <Button className="bg-gradient-to-r from-black via-gray-800 to-gray-700 hover:from-gray-900 hover:to-black text-white rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold shadow-lg transition-all duration-200 focus:ring-2 focus:ring-black/30">
          Start Free
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="rounded-xl hover:bg-gray-100 ml-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StickyFooter;
