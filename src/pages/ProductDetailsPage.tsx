import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { STORE_PRODUCTS, PROJECTS, COURSES } from "../data/mockData";
import {
  ArrowLeft,
  PlayCircle,
  BookText,
  Share2,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { StoreSidebar } from "../components/StoreSidebar";

export function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = STORE_PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState(
    product?.category || "All Components",
  );

  useEffect(() => {
    if (product) {
      setActiveCategory(product.category);
    }
  }, [product]);

  if (!product) {
    return <div className="p-24 text-center">Product not found</div>;
  }

  const alsoBuy = product.alsoBuy
    .map((id) => STORE_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);
  const projectsUsingThis = product.projectsUsingThis
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean);

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // When a category is clicked in the sidebar from a product page,
    // it's a good idea to redirect back to the store with that category filter applied.
    navigate(`/store?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-32">
      {/* Breadcrumb & Navigation */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/store"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row gap-8">
        <StoreSidebar
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />

        <div className="flex-1 space-y-16">
          {/* Main Product Hero */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center bg-[#fbfbfb] border-b md:border-b-0 md:border-r border-gray-100 relative">
              <span className="absolute top-6 left-6 bg-white px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-blue-600 border border-gray-100 shadow-sm">
                {product.category}
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 object-contain mix-blend-multiply opacity-90"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col bg-white">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-[#1d1d1f] leading-tight tracking-tight">
                  {product.name}
                </h1>
                <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-full transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-[#1d1d1f] mb-8 tracking-tight">
                {product.price}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mt-2">
                  + shipping
                </span>
              </div>

              <div className="mt-auto space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-xl flex justify-center items-center hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-gray-50 text-[#1d1d1f] border border-gray-100 font-bold text-xs tracking-wider uppercase py-4 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Request Kit
                  </button>
                  <button className="bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs tracking-wider uppercase py-4 rounded-xl hover:bg-blue-100 transition-colors">
                    Bulk Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Linking System */}
          <div className="space-y-16 group/sections">
            {/* Also Buy */}
            {alsoBuy.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                  <Sparkles className="w-6 h-6 mr-3 text-blue-600" /> Frequently
                  Bought Together
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {alsoBuy.map((p: any) => (
                    <div
                      key={p.id}
                      className="bg-white p-4 rounded-3xl border border-gray-100 hover:border-blue-600/30 transition-colors shadow-sm"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-32 w-full object-contain mix-blend-multiply opacity-90 mb-4"
                      />
                      <Link
                        to={`/store/${p.id}`}
                        className="font-bold text-sm text-[#1d1d1f] line-clamp-2 hover:text-blue-600"
                      >
                        {p.name}
                      </Link>
                      <div className="mt-2 text-gray-500 font-medium text-sm">
                        {p.price}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Build Using This */}
            {projectsUsingThis.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                  <BookText className="w-6 h-6 mr-3 text-blue-600" /> Projects
                  using {product.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectsUsingThis.map((proj: any) => (
                    <Link
                      key={proj.id}
                      to={`/projects/${proj.id}`}
                      className="bg-white rounded-3xl border border-gray-100 flex overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-1/3 object-cover opacity-90"
                      />
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-lg mb-2 text-[#1d1d1f] leading-tight">
                          {proj.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                        <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                          View Project →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Tutorials */}
            <section>
              <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                <PlayCircle className="w-6 h-6 mr-3 text-blue-600" /> Getting
                Started Tutorials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-[#1d1d1f] flex items-center justify-center relative group cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=600"
                        className="opacity-40 group-hover:opacity-20 transition-opacity mix-blend-luminosity"
                      />
                      <PlayCircle className="absolute w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-[#1d1d1f] text-sm mb-2">
                        How to wire {product.name} for beginners
                      </h4>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        10 mins • Wiring Diagram included
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
