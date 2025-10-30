import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What makes AdviTravel different?',
      answer: 'AdviTravel uniquely combines a marketplace for matching travelers with agencies alongside a thriving community forum for travel agents. This creates a powerful network effect: the marketplace generates leads while the community builds trust and expertise, making the entire ecosystem more valuable for all participants.'
    },
    {
      question: 'How will funds be used?',
      answer: 'Investment will be allocated to product development (40%), community scaling and engagement (30%), go-to-market expansion including sales and marketing (20%), and operations/team growth (10%). Our focus is on building defensible technology and creating a self-sustaining community that drives organic growth.'
    },
    {
      question: 'How can I access the investor deck?',
      answer: 'Submit the form above with your details and you will receive the full investor deck by email within 24 hours. You will also get immediate access to download our one-pager summary.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Frequently asked questions
          </h2>
          <p className="text-xl text-[#1A1A1A]/70">
            Quick answers to common investor questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#1A1A1A]/5 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAFAFA] transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-[#0E3A5D] pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#1DB5C4]/10 flex items-center justify-center transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-[#1DB5C4]" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#1DB5C4]" />
                  )}
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-[#1A1A1A]/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#1A1A1A]/70 mb-4">
            Have more questions?
          </p>
          <a
            href="mailto:investors@advitravel.com"
            className="inline-flex items-center gap-2 text-[#1DB5C4] hover:text-[#0E3A5D] font-semibold transition-colors"
          >
            Contact our investor relations team
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
