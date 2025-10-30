import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "AdviTravel's forum cut our ramp time in half.",
      author: 'Agency Owner',
      location: 'UK',
      role: 'Boutique Travel Agency'
    },
    {
      text: "We reached high-intent travelers we'd never have found.",
      author: 'Boutique Agency',
      location: 'US',
      role: 'Luxury Travel Specialist'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Trusted by travel professionals
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto">
            Hear from agencies already growing with AdviTravel
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#F4E7D3]/30 to-white p-8 rounded-2xl border border-[#F4E7D3] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-6 right-6 w-16 h-16 bg-[#1DB5C4]/10 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-[#1DB5C4]" />
              </div>

              <div className="relative z-10">
                <p className="text-xl text-[#1A1A1A] leading-relaxed mb-6 font-medium">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1DB5C4] to-[#0E3A5D] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0E3A5D]">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-[#1A1A1A]/60">
                      {testimonial.role} · {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1DB5C4]/10 to-[#0E3A5D]/10 p-8 rounded-2xl border border-[#1DB5C4]/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#0E3A5D] mb-2">4.7/5</div>
                <div className="text-[#1A1A1A]/70">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0E3A5D] mb-2">92%</div>
                <div className="text-[#1A1A1A]/70">Would Recommend</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0E3A5D] mb-2">87%</div>
                <div className="text-[#1A1A1A]/70">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
