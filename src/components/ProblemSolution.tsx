import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProblemSolution() {
  const problems = [
    'Travelers struggle to find trusted agencies quickly',
    'Agencies lack scalable channels for qualified leads',
    'Agents need a space to learn, share, and hire'
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-lg mb-6">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-900">
                The Problem
              </span>
            </div>

            <h2 className="text-4xl font-bold text-[#0E3A5D] mb-8">
              Travel booking is fragmented and disconnected
            </h2>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#FAFAFA] rounded-lg border border-[#1A1A1A]/5"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-red-600">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-[#1A1A1A]/80 leading-relaxed">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:pt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg mb-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-900">
                Our Solution
              </span>
            </div>

            <h2 className="text-4xl font-bold text-[#0E3A5D] mb-8">
              A unified platform for the entire travel ecosystem
            </h2>

            <div className="bg-gradient-to-br from-[#1DB5C4]/10 to-[#0E3A5D]/10 p-8 rounded-2xl border border-[#1DB5C4]/20">
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed mb-6">
                AdviTravel unifies <span className="font-semibold text-[#0E3A5D]">marketplace matching</span> with a <span className="font-semibold text-[#1DB5C4]">thriving agent community</span> — creating a sustainable growth flywheel.
              </p>

              <div className="space-y-3">
                {[
                  'Smart traveler-agency matching with verified profiles',
                  'Active community forum for agent networking and growth',
                  'Built-in tools for lead management and analytics'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1DB5C4] flex-shrink-0" />
                    <span className="text-[#1A1A1A]/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#F4E7D3]/30 rounded-xl border border-[#F4E7D3]">
              <p className="text-sm font-semibold text-[#0E3A5D] mb-2">
                The Network Effect
              </p>
              <p className="text-[#1A1A1A]/70">
                More travelers bring more agencies. More agencies create richer community knowledge. Richer knowledge attracts better talent — fueling exponential growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
