import { Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useData } from "../context/DataContext";

interface StoreSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function StoreSidebar({
  activeCategory,
  setActiveCategory,
}: StoreSidebarProps) {
  const { products: STORE_PRODUCTS } = useData();

  // Dynamically extract categories from products
  const dynamicCategories = Array.from(
    new Set(STORE_PRODUCTS.map((p) => p.category).filter(Boolean))
  ).sort();

  const CATEGORIES = ["All Components", ...dynamicCategories];

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
        <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
          <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
        </h3>
        <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="flex flex-col">
              <button
                onClick={() => {
                  if (activeCategory === cat && cat !== "All Components") {
                    setActiveCategory("All Components");
                  } else {
                    setActiveCategory(cat);
                  }
                }}
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
  );
}
