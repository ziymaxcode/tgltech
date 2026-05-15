import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ProductCard } from "../components/ui/ProductCard";
import { ProductSkeleton } from "../components/ui/Skeletons";
import { Search } from "lucide-react";
import { StoreSidebar } from "../components/StoreSidebar";
import { useData } from "../context/DataContext";
import { InfiniteProductScroll } from "../components/ui/InfiniteProductScroll";

export function StorePage() {
  const { products: STORE_PRODUCTS, loading } = useData();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All Components");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory("All Components");
    }
  }, [location]);

  const filteredProducts = STORE_PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === "All Components" || p.category === activeCategory;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.tags) && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      {/* Store Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
              Electronics & DIY Store
            </h1>
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-600 font-medium text-sm text-[#1d1d1f] placeholder:text-gray-400 outline-none transition-shadow"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col-reverse md:flex-row gap-8">
        {/* Sidebar */}
        <StoreSidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-bold text-[#1d1d1f] text-lg tracking-tight">
              {loading ? "Loading Products..." : `Showing ${filteredProducts.length} Results`}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">
                  No products found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
       <InfiniteProductScroll />
    </div>
  );
}
