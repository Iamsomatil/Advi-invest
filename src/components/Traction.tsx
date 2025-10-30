import { TrendingUp, Users, Building2, MessageCircle } from 'lucide-react';

export default function Traction() {
  const metrics = [
    {
      icon: Users,
      value: '2.5k+',
      label: 'Traveler Inquiries',
      sublabel: 'Beta period',
      color: 'from-[#1DB5C4]/20 to-[#1DB5C4]/5',
      iconColor: 'bg-[#1DB5C4]'
    },
    {
      icon: Building2,
      value: '450+',
      label: 'Agency Signups',
      sublabel: 'Verified partners',
      color: 'from-[#0E3A5D]/20 to-[#0E3A5D]/5',
      iconColor: 'bg-[#0E3A5D]'
    },
    {
      icon: TrendingUp,
      value: 'NPS 64',
      label: 'Customer Satisfaction',
      sublabel: 'Industry leading',
      color: 'from-emerald-100 to-emerald-50',
      iconColor: 'bg-emerald-600'
    },
    {
      icon: MessageCircle,
      value: '1.2k',
      label: 'Monthly Forum Posts',
      sublabel: 'Active community',
      color: 'from-[#F4E7D3] to-[#F4E7D3]/50',
      iconColor: 'bg-[#0E3A5D]'
    }
  ];

  return (
    <section id="traction" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-900">
              Traction & Momentum
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Building strong fundamentals
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            Early validation from both sides of the marketplace
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${metric.color} p-8 rounded-2xl border border-[#1A1A1A]/5 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 ${metric.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>

              <div className="text-4xl font-bold text-[#0E3A5D] mb-2">
                {metric.value}
              </div>

              <div className="text-base font-semibold text-[#1A1A1A] mb-1">
                {metric.label}
              </div>

              <div className="text-sm text-[#1A1A1A]/60">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1DB5C4]/10 to-white p-8 rounded-2xl border border-[#1DB5C4]/20">
            <h3 className="text-2xl font-bold text-[#0E3A5D] mb-4">
              Growth trajectory
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#1A1A1A]/70">Month-over-month growth</span>
                <span className="text-xl font-bold text-[#1DB5C4]">+42%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#1A1A1A]/70">Agent retention rate</span>
                <span className="text-xl font-bold text-[#1DB5C4]">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#1A1A1A]/70">Avg. session duration</span>
                <span className="text-xl font-bold text-[#1DB5C4]">8.5 min</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0E3A5D]/10 to-white p-8 rounded-2xl border border-[#0E3A5D]/20">
            <h3 className="text-2xl font-bold text-[#0E3A5D] mb-4">
              Market validation
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                <span className="text-[#1A1A1A]/70">
                  Featured in Travel Weekly as "emerging platform to watch"
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                <span className="text-[#1A1A1A]/70">
                  Partnerships with 3 major industry associations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                <span className="text-[#1A1A1A]/70">
                  LOIs from 5 enterprise travel management companies
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
