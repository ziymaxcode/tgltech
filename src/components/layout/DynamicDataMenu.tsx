import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

export function DynamicDataMenu({
  items,
  itemPathPrefix,
  itemTitleKey = "name",
  defaultCategory = "All",
  hideCategories = false,
  title,
}: {
  items: any[];
  itemPathPrefix: string;
  itemTitleKey?: string;
  defaultCategory?: string;
  hideCategories?: boolean;
  title?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const categoriesSet = new Set(
    items.map((i) => i.category || i.type).filter(Boolean)
  );
  const categories = Array.from(categoriesSet) as string[];

  const displayedCategory = hideCategories 
    ? "" 
    : (activeCategory || (categories.includes(defaultCategory) ? defaultCategory : categories[0]) || "");

  const filteredItems = hideCategories 
    ? items 
    : (displayedCategory ? items.filter((i) => (i.category || i.type) === displayedCategory) : items);

  return (
    <div className="bg-white/95 backdrop-blur-3xl border border-gray-100/50 shadow-2xl rounded-3xl p-6 w-[800px] max-w-[90vw] flex gap-8">
      {/* Categories sidebar */}
      {!hideCategories && (
        <div className="w-64 shrink-0 border-r border-gray-100 pr-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <h3 className="font-black text-[12px] uppercase tracking-widest text-black mb-6 pl-2">
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`text-sm w-full text-left transition-colors whitespace-normal py-1 ${
                    displayedCategory === cat
                      ? "text-blue-600 font-bold"
                      : "text-black font-medium hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-sm font-medium text-gray-400 pl-2">No categories found</li>
            )}
          </ul>
        </div>
      )}

      {/* Items Grid */}
      <div className="flex-1 flex flex-col overflow-hidden max-h-[60vh]">
        {hideCategories && title && (
          <h3 className="font-black text-[12px] uppercase tracking-widest text-black mb-6 pb-2 border-b border-gray-100 shrink-0">
            {title}
          </h3>
        )}
        {!hideCategories && displayedCategory && (
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100 shrink-0">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-blue-600">
              {displayedCategory}
            </h3>
            <Link
              to={`${itemPathPrefix}?category=${encodeURIComponent(
                displayedCategory
              )}`}
              className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-blue-600"
            >
              View All
            </Link>
          </div>
        )}
        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {filteredItems.map((item, idx) => (
               <Link
                 key={`${item.id || item.title || item.name}-${idx}`}
                 to={
                   itemPathPrefix.includes("careers") || itemPathPrefix.includes("solutions")
                     ? `${itemPathPrefix}&category=${encodeURIComponent(item.category || item.type)}`
                     : itemPathPrefix.includes("labs")
                     ? `${itemPathPrefix}?type=${item.id}`
                     : `${itemPathPrefix}/${item.id}`
                 }
                 className="text-sm text-black hover:text-blue-600 font-medium transition-colors line-clamp-2 leading-tight"
               >
                 {item[itemTitleKey] || item.title}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
