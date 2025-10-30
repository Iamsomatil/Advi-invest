import { ArrowRight, TrendingUp } from 'lucide-react';

export default function Hero() {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E3A5D]/5 via-[#1DB5C4]/5 to-[#F4E7D3]/30" />

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="travel-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#1DB5C4" />
              <path d="M 10 50 Q 30 30, 50 50 T 90 50" stroke="#1DB5C4" fill="none" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#travel-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB5C4]/10 border border-[#1DB5C4]/20 rounded-full mb-8">
          <TrendingUp className="w-4 h-4 text-[#1DB5C4]" />
          <span className="text-sm font-semibold text-[#0E3A5D]">
            Pre-Seed Round Open
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0E3A5D] mb-6 leading-tight">
          Invest in the future of
          <br />
          <span className="text-[#1DB5C4]">travel operations</span>
        </h1>

        <p className="text-xl md:text-2xl text-[#1A1A1A]/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          AdviTravel connects travelers with vetted agencies and powers a community
          where travel agents share insights and opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('invest')}
            className="group bg-[#1DB5C4] hover:bg-[#0E3A5D] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Request Investor Deck
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('traction')}
            className="bg-white hover:bg-[#F4E7D3]/50 text-[#0E3A5D] px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-[#0E3A5D]/10 hover:border-[#1DB5C4]"
          >
            See Traction Highlights
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '2.5k+', label: 'Traveler Inquiries' },
            { value: '450+', label: 'Agency Signups' },
            { value: 'NPS 64', label: 'Customer Satisfaction' },
            { value: '1.2k', label: 'Monthly Forum Posts' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#0E3A5D] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#1A1A1A]/60 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
