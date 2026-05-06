import { useState } from 'react';
import { STORE_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'All Components',
  'Development Boards',
  'Sensors',
  'Modules',
  'Displays',
  'Robotics',
  'Drone Components',
  'Kits'
];

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState('All Components');

  const filteredProducts = activeCategory === 'All Components' 
    ? STORE_PRODUCTS 
    : STORE_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      {/* Store Header */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest mb-2 block">Marketplace</span>
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Electronics & DIY Store</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Find the right components for your next project. Original parts, quick inquiry, and expert support.
          </p>
          
          <div className="max-w-xl mt-8 relative">
            <input 
              type="text" 
              placeholder="Search components (e.g., ESP32, DHT11)"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 font-medium text-[#1d1d1f] placeholder:text-gray-400 outline-none transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
            </h3>
            <ul className="space-y-1">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeCategory === cat 
                        ? 'bg-gray-50 text-blue-600 font-bold border border-gray-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-bold text-[#1d1d1f] text-lg tracking-tight">Showing {filteredProducts.length} Results</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
