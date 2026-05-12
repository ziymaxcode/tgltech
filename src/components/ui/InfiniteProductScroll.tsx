import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function InfiniteProductScroll() {
  const { products } = useData();
  const [isHovered, setIsHovered] = useState(false);
  
  if (!products || products.length === 0) return null;

  // Duplicate products a few times to ensure infinite scrolling effect
  const displayProducts = [...products, ...products, ...products, ...products, ...products];

  return (
    <div className="w-full border-t border-b border-gray-100 bg-white overflow-hidden py-6 mt-16 mb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <h3 className="font-bold text-[#1d1d1f] text-sm tracking-widest uppercase flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-blue-600" /> 
          Featured Lab & Store Equipment
        </h3>
      </div>
      
      {/* Horizontal Marquee */}
      <div 
        className="relative w-full flex overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex whitespace-nowrap animate-scrolling-slow"
          style={{ 
            animationPlayState: isHovered ? 'paused' : 'running',
            width: 'max-content'
          }}
        >
          {displayProducts.map((product, idx) => (
            <Link 
              key={`${product.id}-${idx}`} 
              to={`/store/${product.id}`}
              className="flex-shrink-0 w-64 bg-white rounded-xl border border-gray-100 p-3 hover:border-blue-200 transition-colors group flex flex-col mx-2"
              style={{ display: 'inline-flex', whiteSpace: 'normal' }}
            >
              <div className="bg-[#fbfbfb] rounded-lg overflow-hidden w-full h-32 mb-3 relative flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 p-2 group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#1d1d1f] line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors h-10">
                  {product.name}
                </h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1d1d1f]">{product.price}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600">Buy</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}
