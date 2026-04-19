import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, SlidersHorizontal } from 'lucide-react';
import { destinations, categories, categoryConfig, Category } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');


  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get('category') as Category | null;
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: Category | 'All') => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter and sort
  const filtered = destinations
    .filter((d) => {
      const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.priceRange.min - b.priceRange.min;
      if (sortBy === 'price-desc') return b.priceRange.min - a.priceRange.min;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      {/* ═══ PAGE HEADER ═══ */}
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 py-16 md:py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-200 text-sm font-medium mb-4">
              <MapPin className="w-3.5 h-3.5" />
              {destinations.length} destinations across Indonesia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              Explore Destinations
            </h1>
            <p className="text-teal-200 text-lg max-w-xl mx-auto">
              Find your perfect Indonesian escape — from volcanic wonders to paradise beaches.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, provinces, cities..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-gray-800 placeholder-gray-400 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ FILTERS BAR ═══ */}
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
            {/* All button */}
            <button
              onClick={() => handleCategoryChange('All')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === 'All'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🌍 All
            </button>

            {/* Category buttons */}
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                      : `${config.bg} ${config.color} hover:opacity-80`
                  }`}
                >
                  <span>{config.icon}</span>
                  {cat}
                </button>
              );
            })}

            {/* Divider */}
            <div className="flex-shrink-0 w-px h-6 bg-gray-200 mx-1" />

            {/* Sort */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer font-medium"
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RESULTS ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <motion.p
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500"
          >
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> destination
            {filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && (
              <span> in <span className="font-semibold text-teal-600">{activeCategory}</span></span>
            )}
            {searchQuery && (
              <span> for "<span className="font-semibold text-teal-600">{searchQuery}</span>"</span>
            )}
          </motion.p>

          {/* Active filters */}
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                handleCategoryChange('All');
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all
            </button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No destinations found</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                Try adjusting your search or filters to discover more of Indonesia's beauty.
              </p>
              <button
                onClick={() => {
                  handleCategoryChange('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
