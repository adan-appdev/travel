import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Star, Clock, DollarSign, Calendar,
  ChevronLeft, ChevronRight, X, ArrowRight, Tag
} from 'lucide-react';
import { destinations, categoryConfig, formatPrice } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === id);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
        <div className="text-7xl mb-6">🗺️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Destination Not Found</h1>
        <p className="text-gray-500 mb-8">This destination doesn't exist or has been removed.</p>
        <Link
          to="/destinations"
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Destinations
        </Link>
      </div>
    );
  }

  const config = categoryConfig[destination.category];
  const related = destinations
    .filter((d) => d.id !== destination.id && (d.category === destination.category))
    .slice(0, 3);

  const nextImage = () => setGalleryIndex((i) => (i + 1) % destination.gallery.length);
  const prevImage = () => setGalleryIndex((i) => (i - 1 + destination.gallery.length) % destination.gallery.length);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      {/* ═══ HERO IMAGE ═══ */}
      <div className="relative h-[55vh] md:h-[70vh] max-h-[700px] overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={galleryIndex}
            src={destination.gallery[galleryIndex]}
            alt={destination.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

        {/* Navigation arrows */}
        {destination.gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Gallery dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {destination.gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === galleryIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Photo count badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-medium z-10">
          📷 {galleryIndex + 1} / {destination.gallery.length}
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-white text-sm font-medium hover:bg-black/60 transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Destination info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="max-w-7xl mx-auto">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm mb-3 ${config.color}`}>
              {config.icon} {destination.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-2 drop-shadow-lg">
              {destination.name}
            </h1>
            <p className="text-xl text-white/80 italic font-light">"{destination.tagline}"</p>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-gray-900">{destination.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{destination.reviewCount.toLocaleString()} reviews</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center gap-1 text-teal-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold text-gray-900 text-sm">{destination.duration}</span>
                </div>
                <p className="text-xs text-gray-500">Recommended stay</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center gap-1 text-teal-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold text-gray-900 text-sm">{destination.bestTime.split('–')[0]}</span>
                </div>
                <p className="text-xs text-gray-500">Best season</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="flex items-center justify-center gap-1 text-teal-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-bold text-gray-900 text-sm">{formatPrice(destination.priceRange.min)}</span>
                </div>
                <p className="text-xs text-gray-500">Starting from</p>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4">About {destination.name}</h2>
              <p className="text-gray-600 leading-relaxed">{destination.fullDescription}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4">Top Highlights</h2>
              <ul className="space-y-3">
                {destination.highlights.map((highlight, i) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                    </div>
                    <span className="text-gray-700 text-sm">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4">Recommended Activities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {destination.activities.map((activity, i) => (
                  <motion.div
                    key={activity.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">{activity.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Gallery Thumbnails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 font-display mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {destination.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => { setGalleryIndex(i); setLightboxOpen(true); }}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group ${
                      i === galleryIndex ? 'ring-2 ring-teal-500 ring-offset-2' : ''
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-xs font-medium">View</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-6 text-white shadow-lg shadow-teal-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-teal-200" />
                <h3 className="text-lg font-bold font-display">Estimated Budget</h3>
              </div>
              <div className="text-3xl font-bold mb-1">
                {formatPrice(destination.priceRange.min)}
                <span className="text-teal-200 text-base font-normal"> – </span>
                {formatPrice(destination.priceRange.max)}
              </div>
              <p className="text-teal-200 text-sm mb-5">{destination.priceRange.note}</p>
              <div className="space-y-2 text-sm border-t border-teal-500/50 pt-4">
                <div className="flex justify-between">
                  <span className="text-teal-200">Budget travel</span>
                  <span className="font-medium">{formatPrice(destination.priceRange.min)}/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-200">Comfortable stay</span>
                  <span className="font-medium">{formatPrice(Math.floor((destination.priceRange.min + destination.priceRange.max) / 2))}/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-200">Luxury experience</span>
                  <span className="font-medium">{formatPrice(destination.priceRange.max)}/day</span>
                </div>
              </div>
              <button className="w-full mt-5 py-3 bg-white text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors">
                Plan This Trip
              </button>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold font-display text-gray-900">Location</h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">City</span>
                  <span className="font-medium text-gray-800">{destination.location.city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Province</span>
                  <span className="font-medium text-gray-800">{destination.location.province}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Country</span>
                  <span className="font-medium text-gray-800">Indonesia 🇮🇩</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coordinates</span>
                  <span className="font-medium text-gray-800 text-xs">
                    {destination.location.coordinates.lat.toFixed(4)}, {destination.location.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-4 rounded-xl overflow-hidden bg-gray-100 h-44 relative">
                <iframe
                  title={`Map of ${destination.name}`}
                  className="w-full h-full border-0"
                  src={`https://www.google.com/maps?q=${destination.location.coordinates.lat},${destination.location.coordinates.lng}&z=10&output=embed`}
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Trip Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold font-display text-gray-900 mb-4">Trip Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Recommended Duration</p>
                    <p className="text-sm font-semibold text-gray-800">{destination.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Best Time to Visit</p>
                    <p className="text-sm font-semibold text-gray-800">{destination.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Category</p>
                    <p className="text-sm font-semibold text-gray-800">{config.icon} {destination.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ RELATED DESTINATIONS ═══ */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-teal-600 text-sm font-semibold mb-1">More to Explore</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">Similar Destinations</h2>
              </div>
              <Link
                to="/destinations"
                className="group hidden sm:flex items-center gap-2 text-sm text-teal-600 font-semibold hover:text-teal-700"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.img
              key={galleryIndex}
              src={destination.gallery[galleryIndex]}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {destination.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === galleryIndex ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
