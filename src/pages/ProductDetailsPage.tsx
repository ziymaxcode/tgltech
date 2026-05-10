import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
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
  const { products: STORE_PRODUCTS, projects: PROJECTS, courses: COURSES, loading } = useData();
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = STORE_PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [activeCategory, setActiveCategory] = useState(
    product?.category || "All Components",
  );

  useEffect(() => {
    if (product) {
      setActiveCategory(product.category);
    }
  }, [product]);

  if (loading && !product) {
    return (
      <div className="bg-[#fbfbfb] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
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
        <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link to="/" className="hover:text-[#1d1d1f] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link
                to="/store"
                className="hover:text-[#1d1d1f] transition-colors"
              >
                Store
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link
                to={`/store?category=${encodeURIComponent(product.category)}`}
                className="hover:text-[#1d1d1f] transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li className="text-[#1d1d1f]">{product.name}</li>
          </ol>
        </nav>
        <Link
          to="/store"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col-reverse md:flex-row gap-8">
        <div className="hidden md:block">
          <StoreSidebar
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
          />
        </div>

        <div className="flex-1 space-y-12 md:space-y-16">
          {/* Main Product Hero */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center bg-[#fbfbfb] border-b md:border-b-0 md:border-r border-gray-100 relative min-h-[250px]">
              <span className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest text-blue-600 border border-gray-100 shadow-sm">
                {product.category}
              </span>
              <img
                referrerPolicy="no-referrer"
                src={product.image}
                alt={product.name}
                className="max-h-48 sm:max-h-64 md:max-h-96 object-contain mix-blend-multiply opacity-90"
              />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col bg-white">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1d1d1f] leading-tight tracking-tight pr-4">
                  {product.name}
                </h1>
                <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-full transition-colors shrink-0">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-6 sm:mb-8 tracking-tight">
                {product.price}
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 block mt-1 sm:mt-2">
                  + shipping
                </span>
              </div>

              <div className="mt-auto space-y-3 sm:space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full text-white font-bold text-[10px] sm:text-sm tracking-widest uppercase py-3 sm:py-4 rounded-xl flex justify-center items-center transition-colors shadow-sm ${
                    isAddingToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />{" "}
                  {isAddingToCart ? "Added to Cart" : "Add to Cart"}
                </button>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`border border-gray-100 font-bold text-[10px] sm:text-xs tracking-wider uppercase py-3 sm:py-4 rounded-xl transition-colors ${
                      isAddingToCart ? "bg-green-50 text-green-600" : "bg-gray-50 text-[#1d1d1f] hover:bg-gray-100"
                    }`}
                  >
                    {isAddingToCart ? "Added" : "Request Kit"}
                  </button>
                  <button className="bg-blue-50 text-blue-600 border border-blue-100 font-bold text-[10px] sm:text-xs tracking-wider uppercase py-3 sm:py-4 rounded-xl hover:bg-blue-100 transition-colors px-2">
                    Bulk Inquiry
                  </button>
                </div>

                <a
                  href={(product as any).documentationLink || (product as any).gdriveLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-gray-600 border border-gray-200 font-bold text-[10px] sm:text-xs tracking-wider uppercase py-3 sm:py-4 rounded-xl flex justify-center items-center hover:bg-gray-50 hover:text-[#1d1d1f] transition-colors shadow-sm mt-3 sm:mt-4"
                >
                  <BookText className="w-4 h-4 mr-2" /> Documentation Link
                </a>
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
                        referrerPolicy="no-referrer"
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
                        referrerPolicy="no-referrer"
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
            {(product as any).tutorialLink && (
              <section>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                  <PlayCircle className="w-6 h-6 mr-3 text-blue-600" /> Getting Started Tutorials
                </h2>
                <a
                  href={(product as any).tutorialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center p-4 sm:p-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 group-hover:bg-blue-100 transition-colors shrink-0">
                    <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1d1d1f] text-lg sm:text-xl mb-1 group-hover:text-blue-600 transition-colors text-center sm:text-left">Watch Getting Started Tutorial</h3>
                    <p className="text-sm text-gray-500 text-center sm:text-left">Learn the basics and get up and running quickly with {product.name}</p>
                  </div>
                </a>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
