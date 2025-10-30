import { Plane, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E3A5D] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-8 h-8 text-[#1DB5C4]" />
              <span className="text-2xl font-bold">AdviTravel</span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-md">
              Connecting travelers with vetted agencies and empowering a community of travel professionals worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#platform" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Product Overview
                </a>
              </li>
              <li>
                <a href="#traction" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Traction
                </a>
              </li>
              <li>
                <a href="#invest" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Invest
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white/70 hover:text-[#1DB5C4] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} AdviTravel. All rights reserved.
            </div>

            <a
              href="mailto:investors@advitravel.com"
              className="flex items-center gap-2 text-white/70 hover:text-[#1DB5C4] transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              investors@advitravel.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
