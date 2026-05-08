import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { STORE_PRODUCTS } from "../data/mockData";
import { ProductCard } from "../components/ui/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "All Components",
  "Development Boards",
  "Sensors",
  "Modules",
  "Displays",
  "Robotics",
  "Drone Components",
  "Kits",
];

export function StorePage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All Components");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("All Components");
    }
  }, [location]);

  const filteredProducts =
    activeCategory === "All Components"
      ? STORE_PRODUCTS
      : STORE_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      {/* Store Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
              Electronics & DIY Store
            </h1>
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-600 font-medium text-sm text-[#1d1d1f] placeholder:text-gray-400 outline-none transition-shadow"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
            <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
            </h3>
            <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
              {CATEGORIES.map((cat) => (
                <li key={cat} className="flex flex-col">
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${
                      activeCategory === cat
                        ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                    }`}
                  >
                    <span>{cat}</span>
                    {cat !== "All Components" && (
                      <span
                        className={`transition-transform duration-300 ${activeCategory === cat ? "rotate-90 text-blue-600" : "text-gray-400"}`}
                      >
                        ›
                      </span>
                    )}
                  </button>
                  {cat !== "All Components" && activeCategory === cat && (
                    <div className="mt-1 flex flex-col pl-3 border-l-2 border-gray-100 ml-3">
                      {STORE_PRODUCTS.filter((p) => p.category === cat).map(
                        (product) => (
                          <Link
                            key={product.id}
                            to={`/store/${product.id}`}
                            className="px-3 py-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors flex flex-col rounded-lg"
                          >
                            <span className="truncate">{product.name}</span>
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-bold text-[#1d1d1f] text-lg tracking-tight">
              Showing {filteredProducts.length} Results
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
