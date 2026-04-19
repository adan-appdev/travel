import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
                <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-white font-display">Explore</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-teal-400">Indonesia</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Discover the beauty of 17,000+ islands. From volcanic peaks to pristine beaches and ancient temples.
            </p>
            <div className="flex items-center gap-3">
              {['📸', '🐦', '👥', '▶️'].map((emoji, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-teal-600 hover:text-white transition-all duration-200 text-base"
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Destinations', to: '/destinations' },
                { label: 'Beaches', to: '/destinations?category=Beach' },
                { label: 'Mountains', to: '/destinations?category=Mountain' },
                { label: 'Cultural Sites', to: '/destinations?category=Culture' },
                { label: 'Nature Parks', to: '/destinations?category=Nature' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm hover:text-teal-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2.5">
              {['Bali', 'Raja Ampat', 'Borobudur', 'Komodo', 'Mount Bromo', 'Yogyakarta'].map((dest) => (
                <li key={dest}>
                  <a href="#" className="text-sm hover:text-teal-400 transition-colors duration-200">
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Travel Info</h4>
            <ul className="space-y-2.5">
              {['Travel Tips', 'Visa Information', 'Best Time to Visit', 'Travel Insurance', 'FAQs', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-teal-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/30 rounded-2xl p-6 md:p-8 mb-10 border border-teal-800/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold text-lg mb-1 font-display">Get Travel Inspiration</h4>
              <p className="text-sm text-gray-400">Subscribe to our newsletter for exclusive deals and travel guides.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl text-sm font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            © 2025 Explore Indonesia. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indonesian Tourism
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
