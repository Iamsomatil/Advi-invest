import { useState } from 'react';
import { Send, CheckCircle2, Download } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string[];
  checkSize: string;
  geo: string;
  message: string;
  consent: boolean;
  website_url: string;
}

export default function InvestorForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: [],
    checkSize: '',
    geo: '',
    message: '',
    consent: false,
    website_url: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestOptions = ['Pre-seed', 'Seed', 'Series A', 'Strategic'];
  const checkSizeOptions = [
    '<$25k',
    '$25k–$100k',
    '$100k–$250k',
    '$250k–$1M+'
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return !freeDomains.includes(domain);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please use a work email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company/Fund is required';
    }

    if (formData.interest.length === 0) {
      newErrors.interest = 'Please select at least one investment interest';
    }

    if (!formData.checkSize) {
      newErrors.checkSize = 'Please select an estimated check size';
    }

    if (formData.message.length > 600) {
      newErrors.message = 'Message must be 600 characters or less';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website_url) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        utm: {
          source: new URLSearchParams(window.location.search).get('utm_source') || '',
          medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
        },
        referrer: document.referrer || '',
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);

        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'lead_submitted',
            custom_event: 'bolt_lead_submit'
          });
        }
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.includes(option)
        ? prev.interest.filter(i => i !== option)
        : [...prev.interest, option]
    }));
  };

  if (isSuccess) {
    return (
      <section id="invest" className="py-24 bg-gradient-to-br from-[#1DB5C4]/10 to-[#0E3A5D]/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <h2 className="text-3xl font-bold text-[#0E3A5D] mb-4">
              Thank you for your interest!
            </h2>

            <p className="text-lg text-[#1A1A1A]/70 mb-8">
              We've received your information and will follow up shortly with the investor deck and additional materials.
            </p>

            <a
              href="/advitravel-one-pager.pdf"
              download
              className="inline-flex items-center gap-2 bg-[#1DB5C4] hover:bg-[#0E3A5D] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download One-Pager
            </a>

            <p className="text-sm text-[#1A1A1A]/60 mt-6">
              Check your inbox for a confirmation email from investors@advitravel.com
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="invest" className="py-24 bg-gradient-to-br from-[#1DB5C4]/10 to-[#0E3A5D]/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3A5D] mb-6">
            Request the Investor Deck & Updates
          </h2>
          <p className="text-xl text-[#1A1A1A]/70">
            Share your details and we'll follow up promptly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-[#1A1A1A]/20'} focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all`}
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#1A1A1A]/20'} focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all`}
                placeholder="jane@company.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
                Company / Fund <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-red-500' : 'border-[#1A1A1A]/20'} focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all`}
                placeholder="Acme Ventures"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
                Role / Title
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#1A1A1A]/20 focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all"
                placeholder="Partner"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-[#0E3A5D] mb-3">
              Investment Interest <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(option => (
                <label
                  key={option}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.interest.includes(option)
                      ? 'border-[#1DB5C4] bg-[#1DB5C4]/10'
                      : 'border-[#1A1A1A]/20 hover:border-[#1DB5C4]/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.interest.includes(option)}
                    onChange={() => handleInterestChange(option)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#0E3A5D]">{option}</span>
                </label>
              ))}
            </div>
            {errors.interest && <p className="text-red-500 text-sm mt-2">{errors.interest}</p>}
          </div>

          <div className="mt-6">
            <label htmlFor="checkSize" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
              Estimated Check Size <span className="text-red-500">*</span>
            </label>
            <select
              id="checkSize"
              value={formData.checkSize}
              onChange={(e) => setFormData({ ...formData, checkSize: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.checkSize ? 'border-red-500' : 'border-[#1A1A1A]/20'} focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all`}
            >
              <option value="">Select range</option>
              {checkSizeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.checkSize && <p className="text-red-500 text-sm mt-1">{errors.checkSize}</p>}
          </div>

          <div className="mt-6">
            <label htmlFor="geo" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
              Geography / Focus
            </label>
            <input
              type="text"
              id="geo"
              value={formData.geo}
              onChange={(e) => setFormData({ ...formData, geo: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#1A1A1A]/20 focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all"
              placeholder="e.g., North America, Global"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-semibold text-[#0E3A5D] mb-2">
              Message <span className="text-[#1A1A1A]/50 text-xs">(optional, max 600 chars)</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              maxLength={600}
              className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-[#1A1A1A]/20'} focus:border-[#1DB5C4] focus:ring-2 focus:ring-[#1DB5C4]/20 outline-none transition-all resize-none`}
              placeholder="Tell us about your investment thesis or any questions..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              <span className="text-xs text-[#1A1A1A]/50 ml-auto">
                {formData.message.length}/600
              </span>
            </div>
          </div>

          <div className="hidden">
            <label htmlFor="website_url">Website</label>
            <input
              type="text"
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-[#1A1A1A]/20 text-[#1DB5C4] focus:ring-[#1DB5C4]"
              />
              <span className="text-sm text-[#1A1A1A]/80">
                I agree to be contacted about AdviTravel's investor materials. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
          </div>

          {errors.submit && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-[#1DB5C4] hover:bg-[#0E3A5D] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Request
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
