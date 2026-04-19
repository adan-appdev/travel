import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin, Star, Users, Globe, Compass, TrendingUp } from 'lucide-react';
import { destinations, categoryConfig, categories } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

const stats = [
  { icon: MapPin, value: '500+', label: 'Destinations' },
  { icon: Star, value: '4.9', label: 'Avg. Rating' },
  { icon: Users, value: '2M+', label: 'Happy Travelers' },
  { icon: Globe, value: '34', label: 'Provinces' },
];

const featuredDestinations = destinations.filter((d) => d.featured);
const recentDestinations = destinations.slice(0, 6);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToContent = () => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Indonesia Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sm font-medium text-white mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Discover 17,000+ Islands of Wonder
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] mb-6"
          >
            Explore the Beauty
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              of Indonesia
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            From volcanic peaks cloaked in mist to turquoise seas hiding vibrant reefs — 
            Indonesia awaits with an adventure for every soul.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/destinations"
              className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-semibold text-base shadow-2xl shadow-teal-900/40 hover:shadow-teal-900/60 hover:from-teal-400 hover:to-cyan-500 transition-all duration-300"
            >
              <Compass className="w-5 h-5" />
              Start Exploring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={scrollToContent}
              className="flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-md text-white rounded-2xl font-semibold text-base border border-white/30 hover:bg-white/25 transition-all duration-300"
            >
              Featured Destinations
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                <Icon className="w-4 h-4 text-teal-300" />
                <div className="text-left">
                  <div className="text-white font-bold text-base leading-none">{value}</div>
                  <div className="text-white/60 text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-gray-500 mr-2">Browse by:</span>
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              return (
                <Link
                  key={cat}
                  to={`/destinations?category=${cat}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 hover:shadow-md ${config.bg} ${config.color} border-current/20 hover:scale-105`}
                >
                  <span>{config.icon}</span>
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED DESTINATIONS ═══ */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-teal-600 text-sm font-semibold mb-3"
              >
                <TrendingUp className="w-4 h-4" />
                FEATURED PICKS
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 font-display"
              >
                Most Loved
                <span className="text-teal-600"> Destinations</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-gray-500 mt-2 max-w-lg"
              >
                Handpicked gems that travelers can't stop talking about.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/destinations"
                className="group flex items-center gap-2 px-5 py-2.5 text-teal-600 font-semibold text-sm bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Featured Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HERO BANNER – Indonesia Highlight ═══ */}
      <section className="py-0 overflow-hidden">
        <div className="relative h-80 md:h-96">
          <img src="/images/raja-ampat.jpg" alt="Raja Ampat" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent flex items-center">
            <div className="px-8 md:px-16 max-w-xl">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3"
              >
                Why Indonesia?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white font-display mb-4"
              >
                The World's Most <br />Diverse Archipelago
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-sm leading-relaxed mb-6"
              >
                17,508 islands. 300+ ethnic groups. 700+ languages. One unforgettable destination.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold text-sm hover:bg-teal-400 transition-colors"
                >
                  Discover More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALL DESTINATIONS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-teal-600 text-sm font-semibold mb-3"
              >
                <Globe className="w-4 h-4" />
                EXPLORE MORE
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 font-display"
              >
                All Destinations
              </motion.h2>
            </div>
            <Link
              to="/destinations"
              className="group flex items-center gap-2 px-5 py-2.5 text-teal-600 font-semibold text-sm bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors self-start md:self-auto"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDestinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS / TRUST SECTION ═══ */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-3"
            >
              Trusted by Travelers Worldwide
            </motion.h2>
            <p className="text-gray-500">Real experiences from real adventurers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Bali left me speechless. The temples, the rice terraces, the warmth of the people — I'm already planning my return trip.",
                name: 'Sarah Mitchell',
                from: 'Sydney, Australia',
                dest: 'Bali',
                rating: 5,
                avatar: '👩‍🦰',
              },
              {
                quote: "Raja Ampat is the most magical place I've ever dived. The biodiversity is simply unmatched anywhere in the world.",
                name: 'Jean-Pierre Dubois',
                from: 'Lyon, France',
                dest: 'Raja Ampat',
                rating: 5,
                avatar: '🧔',
              },
              {
                quote: "Watching the sunrise over Mount Bromo with smoke rising from the crater is one of those life-defining moments.",
                name: 'Kenji Tanaka',
                from: 'Tokyo, Japan',
                dest: 'Mount Bromo',
                rating: 5,
                avatar: '👨‍💼',
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-md shadow-teal-100/50 border border-teal-100/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="text-2xl">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.from} · visited {t.dest}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/borobudur.jpg" alt="Borobudur" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-gray-900/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
          >
            Your Next Adventure Awaits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/75 text-lg mb-8 max-w-xl mx-auto"
          >
            From tranquil beaches to thundering volcanoes — start planning your dream Indonesia journey today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/destinations"
              className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-2xl shadow-teal-900/50 hover:from-teal-400 hover:to-cyan-400 transition-all"
            >
              <Globe className="w-5 h-5" />
              Browse All Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
