import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, Globe } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/destinations', label: 'Destinations' },
  ];

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              isTransparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
            }`}>
              <Compass className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-white'}`} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-base font-bold tracking-tight transition-colors duration-300 font-display ${
                isTransparent ? 'text-white' : 'text-gray-900'
              }`}>
                Explore
              </span>
              <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                isTransparent ? 'text-white/80' : 'text-teal-600'
              }`}>
                Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isTransparent
                        ? 'text-white bg-white/20'
                        : 'text-teal-600 bg-teal-50'
                      : isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/15'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        isTransparent ? 'bg-white' : 'bg-teal-500'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              to="/destinations"
              className={`ml-3 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                isTransparent
                  ? 'bg-white text-teal-700 hover:bg-white/90 shadow-white/20'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 shadow-teal-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              Explore Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent ? 'text-white hover:bg-white/15' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/98 backdrop-blur-md border-t border-gray-100"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/destinations"
                className="flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl text-sm font-semibold"
              >
                <Globe className="w-4 h-4" />
                Explore Destinations
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
