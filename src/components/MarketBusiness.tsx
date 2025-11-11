import { DollarSign, Target } from 'lucide-react';

export default function MarketBusiness() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Market opportunity & business model
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            Capturing value in a $1.9T global travel industry
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB5C4]/10 border border-[#1DB5C4]/20 rounded-lg mb-6">
              <Target className="w-4 h-4 text-[#1DB5C4]" />
              <span className="text-sm font-semibold text-[#0E3A5D]">
                Market Size
              </span>
            </div>

            <h3 className="text-3xl font-bold text-[#0E3A5D] mb-6">
              Massive addressable market
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-[#1A1A1A]/5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#0E3A5D]">$1.9T</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]/60">TAM</span>
                </div>
                <p className="text-[#1A1A1A]/70">
                  Total Addressable Market — Global travel industry spend
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#1A1A1A]/5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#1DB5C4]">$84B</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]/60">SAM</span>
                </div>
                <p className="text-[#1A1A1A]/70">
                  Serviceable Addressable Market — Agency-assisted travel bookings
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#1A1A1A]/5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-emerald-600">$2.8B</span>
                  <span className="text-sm font-semibold text-[#1A1A1A]/60">SOM</span>
                </div>
                <p className="text-[#1A1A1A]/70">
                  Serviceable Obtainable Market — Year 5 realistic target
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg mb-6">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-900">
                Revenue Model
              </span>
            </div>

            <h3 className="text-3xl font-bold text-[#0E3A5D] mb-6">
              Multiple revenue streams
            </h3>

            <div className="bg-gradient-to-br from-white to-[#F4E7D3]/20 p-8 rounded-2xl border border-[#F4E7D3] mb-6">
              <h4 className="text-xl font-bold text-[#0E3A5D] mb-4">
                1. Subscription Model
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#0E3A5D]">Basic:</span>
                    <span className="text-[#1A1A1A]/70"> $19/mo — Profile + leads</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#0E3A5D]">Pro:</span>
                    <span className="text-[#1A1A1A]/70"> $99/mo — Analytics + priority placement</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#0E3A5D]">Enterprise:</span>
                    <span className="text-[#1A1A1A]/70"> Custom — White label + API access</span>
                  </div>
                </li>
              </ul>

              <h4 className="text-xl font-bold text-[#0E3A5D] mb-4">
                2. Success Fees
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-[#1A1A1A]/70">8-12% commission on closed bookings over $5k</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#1DB5C4] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-[#1A1A1A]/70">Premium placement fees for featured agencies</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#0E3A5D]/5 p-6 rounded-xl border border-[#0E3A5D]/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#0E3A5D]">Year 1 Target ARR</span>
                <span className="text-2xl font-bold text-[#1DB5C4]">$1.2M</span>
              </div>
              <div className="w-full bg-[#1A1A1A]/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1DB5C4] to-[#0E3A5D] h-full w-[35%]" />
              </div>
              <p className="text-sm text-[#1A1A1A]/60 mt-2">
                Currently at $420k run rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
