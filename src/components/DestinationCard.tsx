import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, Clock } from 'lucide-react';
import { Destination, categoryConfig, formatPrice } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const config = categoryConfig[destination.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link to={`/destination/${destination.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-400 border border-gray-100/80">
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Category Badge */}
            <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 ${config.color}`}>
              <span>{config.icon}</span>
              {destination.category}
            </div>

            {/* Featured Badge */}
            {destination.featured && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                ✨ Featured
              </div>
            )}

            {/* Rating on Image */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {destination.rating}
            </div>

            {/* Destination Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-xl font-bold font-display leading-tight drop-shadow-lg">
                {destination.name}
              </h3>
            </div>

            {/* Arrow on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
              <MapPin className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
              <span>{destination.location.city}, {destination.location.province}</span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-500 italic mb-2.5 leading-relaxed line-clamp-1">
              "{destination.tagline}"
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
              {destination.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Estimated Budget</p>
                <p className="text-sm font-bold text-gray-900">
                  {formatPrice(destination.priceRange.min)}
                  <span className="text-gray-400 font-normal"> – </span>
                  {formatPrice(destination.priceRange.max)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Clock className="w-3.5 h-3.5" />
                {destination.duration}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
