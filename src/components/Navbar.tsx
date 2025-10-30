import { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
            aria-label="AdviTravel home"
          >
            <Plane className="w-7 h-7 text-[#1DB5C4] group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold text-[#0E3A5D]">
              AdviTravel
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('platform')}
              className="text-[#1A1A1A] hover:text-[#1DB5C4] font-medium transition-colors"
            >
              Product Overview
            </button>
            <button
              onClick={() => scrollToSection('invest')}
              className="bg-[#1DB5C4] hover:bg-[#0E3A5D] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Invest in AdviTravel
            </button>
          </div>

          <button
            onClick={() => scrollToSection('invest')}
            className="md:hidden bg-[#1DB5C4] text-white px-4 py-2 rounded-lg font-semibold text-sm"
          >
            Invest
          </button>
        </div>
      </div>
    </nav>
  );
}
