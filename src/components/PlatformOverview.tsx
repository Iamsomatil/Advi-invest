import { Users, MessageSquare, BarChart3 } from 'lucide-react';

export default function PlatformOverview() {
  const cards = [
    {
      icon: Users,
      title: 'Traveler–Agency Match',
      description: 'Smart routing, verified agencies, high intent travelers',
      color: 'from-[#1DB5C4]/10 to-[#1DB5C4]/5',
      iconColor: 'text-[#1DB5C4]',
      borderColor: 'border-[#1DB5C4]/20'
    },
    {
      icon: MessageSquare,
      title: 'Agent Community & Forums',
      description: 'Space for insights, networking, and job opportunities',
      color: 'from-[#0E3A5D]/10 to-[#0E3A5D]/5',
      iconColor: 'text-[#0E3A5D]',
      borderColor: 'border-[#0E3A5D]/20'
    },
    {
      icon: BarChart3,
      title: 'Agency Tools',
      description: 'Profiles, reviews, analytics dashboards (coming soon)',
      color: 'from-[#F4E7D3]/50 to-[#F4E7D3]/20',
      iconColor: 'text-[#0E3A5D]',
      borderColor: 'border-[#F4E7D3]'
    }
  ];

  return (
    <section id="platform" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Three pillars, one ecosystem
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            AdviTravel combines marketplace efficiency with community-driven growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${card.color} p-8 rounded-2xl border ${card.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>

              <h3 className="text-2xl font-bold text-[#0E3A5D] mb-4">
                {card.title}
              </h3>

              <p className="text-[#1A1A1A]/70 leading-relaxed">
                {card.description}
              </p>

              <div className="absolute top-6 right-6 w-24 h-24 bg-white/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#0E3A5D] mb-4">
                The flywheel advantage
              </h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                Each component reinforces the others: travelers attract agencies, agencies build the community, and the community improves service quality — creating compound value that competitors cannot easily replicate.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1DB5C4] to-[#0E3A5D] border-2 border-white flex items-center justify-center text-white font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <svg className="w-8 h-8 text-[#1DB5C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
