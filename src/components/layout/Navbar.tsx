import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Cpu,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";

import { DynamicDataMenu } from "./DynamicDataMenu";

const LINKS = [
  {
    name: "Electronics DIY Store",
    path: "/store",
    dynamicDataName: "store"
  },
  {
    name: "Engineering Projects",
    path: "/projects",
    dynamicDataName: "projects"
  },
  {
    name: "Internships",
    path: "/careers?tab=internships",
    dynamicDataName: "internships"
  },
  {
    name: "Certified Courses",
    path: "/careers?tab=certifications",
    dynamicDataName: "certifications"
  },
  {
    name: "Lab Setups",
    path: "/labs",
    dynamicDataName: "labs"
  },
  { name: "PhD Support", path: "/careers?tab=phd" },
  {
    name: "Technical Solutions",
    path: "/solutions",
    dropdown: [
      { name: "All Solutions", path: "/solutions" },
      { name: "Embedded & Firmware", path: "/solutions?type=embedded" },
      { name: "PCB Design", path: "/solutions?type=pcb" },
      { name: "Cloud IoT Dashboards", path: "/solutions?type=cloud" },
      { name: "Mobile Apps", path: "/solutions?type=mobile" },
      { name: "3D CAD Modeling", path: "/solutions?type=cad" },
      { name: "FDM/SLA Prototyping", path: "/solutions?type=prototyping" },
      { name: "Enclosure Design", path: "/solutions?type=enclosure" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [closedMenuPath, setClosedMenuPath] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>(
    {},
  );
  const toggleMobileMenu = (path: string) => {
    setMobileExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };
  const location = useLocation();
  const { cart } = useCart();
  const { products: STORE_PRODUCTS, projects, internships, courses, labs } = useData();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="w-full mx-auto px-2 md:px-10">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
          <img
            src="/logot.png"
            alt="TGL Technologies Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>



          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6 h-full">
            {LINKS.map((link) => {
              const isActive = link.path.includes("?")
                ? location.pathname + location.search === link.path
                : (location.pathname.startsWith(link.path) &&
                    link.path !== "/") ||
                  (link.path === "/" && location.pathname === "/");

              const dynamicItemsMap: Record<string, any[]> = {
                store: STORE_PRODUCTS,
                projects: projects,
                internships: internships,
                certifications: courses,
                labs: labs,
              };

              if ((link as any).dynamicDataName) {
                const items = dynamicItemsMap[(link as any).dynamicDataName] || [];
                return (
                  <div
                    key={link.path}
                    className="relative group h-full flex items-center"
                    onMouseLeave={() => setClosedMenuPath(null)}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a")) {
                        setClosedMenuPath(link.path);
                      }
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <div
                      className={`absolute top-full pt-4 transition-all z-50 ${
                        ["Technical Solutions", "PhD Support", "Lab Setups"].includes(link.name)
                          ? "right-0"
                          : ["Internships", "Engineering Projects", "Certified Courses"].includes(link.name)
                          ? "left-1/2 -translate-x-1/2"
                          : "left-0"
                      } ${closedMenuPath === link.path ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"}`}
                    >
                      <DynamicDataMenu 
                        items={items} 
                        itemPathPrefix={link.path} 
                        itemTitleKey={(link as any).dynamicDataName === "internships" ? "title" : "name"} 
                        defaultCategory={(link as any).dynamicDataName === "store" ? "Development Boards" : "All"} 
                        hideCategories={(link as any).dynamicDataName === "labs"}
                        title={link.name}
                      />
                    </div>
                  </div>
                );
              }

              if (link.dropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative group h-full flex items-center"
                    onMouseLeave={() => setClosedMenuPath(null)}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a")) {
                        setClosedMenuPath(link.path);
                      }
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <div
                      className={`absolute top-full pt-4 transition-all z-50 ${
                        ["Technical Solutions", "PhD Support", "Lab Setups"].includes(link.name)
                          ? "right-0"
                          : ["Internships", "Engineering Projects", "Certified Courses"].includes(link.name)
                          ? "left-1/2 -translate-x-1/2"
                          : "left-0"
                      } ${closedMenuPath === link.path ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"}`}
                    >
                      <div className="bg-white/95 backdrop-blur-3xl border border-gray-100/50 shadow-2xl rounded-3xl p-8 min-w-[500px]">
                        <h3 className="font-black text-[12px] uppercase tracking-widest text-black mb-6 pb-2 border-b border-gray-100">
                          {link.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {link.dropdown.map((subLink) => (
                            <Link
                              key={subLink.path}
                              to={subLink.path}
                              className="text-sm text-black hover:text-blue-600 font-medium transition-colors"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center h-full text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              to="/checkout"
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors ml-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-4">
            <Link
              to="/checkout"
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-rose-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white border-b border-gray-200/50 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {LINKS.map((link) => {
                const dynamicItemsMap: Record<string, any[]> = {
                  store: STORE_PRODUCTS,
                  projects: projects,
                  internships: internships,
                  certifications: courses,
                  labs: labs,
                };
                const isActive = link.path.includes("?")
                  ? location.pathname + location.search === link.path
                  : (location.pathname.startsWith(link.path) &&
                      link.path !== "/") ||
                    (link.path === "/" && location.pathname === "/");

                const isDynamic = !!(link as any).dynamicDataName;
                const hasDropdown = isDynamic || !!link.dropdown;
                let subLinks: { name: string; path: string }[] = [];
                let dynamicItems: any[] = [];
                let categories: string[] = [];
                let itemTitleKey: string = "name";

                if (isDynamic) {
                  dynamicItems = dynamicItemsMap[(link as any).dynamicDataName] || [];
                  const categoriesSet = new Set(dynamicItems.map((i) => i.category || i.type).filter(Boolean));
                  categories = Array.from(categoriesSet) as string[];
                  itemTitleKey = (link as any).dynamicDataName === "internships" ? "title" : "name";
                } else if (link.dropdown) {
                  subLinks = link.dropdown;
                }

                return (
                  <div key={link.path}>
                    <div className="flex justify-between items-center">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-medium flex-1 py-1 ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-600 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMobileMenu(link.path);
                          }}
                          className={`p-1 ml-2 ${isActive ? "text-blue-600" : "text-slate-600"}`}
                        >
                          {mobileExpanded[link.path] ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {hasDropdown && mobileExpanded[link.path] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-2 border-l-2 border-gray-100 flex flex-col space-y-2 py-2">
                            {isDynamic ? (
                              (link as any).dynamicDataName === "labs" ? (
                                <div className="flex flex-col space-y-2">
                                  {dynamicItems.map((item, idx) => (
                                    <Link
                                      key={`${item.id || item.title || item.name}-${idx}`}
                                      to={`${link.path}?type=${item.id}`}
                                      onClick={() => setIsOpen(false)}
                                      className="block text-sm text-black hover:text-blue-600 py-1"
                                    >
                                      {item[itemTitleKey] || item.title}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                categories.map((cat) => {
                                  const catPath = link.path.includes("careers") || link.path.includes("solutions")
                                    ? `${link.path}&category=${encodeURIComponent(cat)}`
                                    : `${link.path}?category=${encodeURIComponent(cat)}`;
                                  const catId = `${link.path}-${cat}`;
                                  const catItems = dynamicItems.filter(i => (i.category || i.type) === cat);
                                  
                                  return (
                                    <div key={catPath}>
                                      <div className="flex justify-between items-center gap-2">
                                        <Link
                                          to={catPath}
                                          onClick={() => setIsOpen(false)}
                                          className="block text-sm text-black hover:text-blue-600 py-1 flex-1"
                                        >
                                          {cat}
                                        </Link>
                                        {catItems.length > 0 && (
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              toggleMobileMenu(catId);
                                            }}
                                            className="p-1 mr-2 text-slate-400 hover:text-slate-600"
                                          >
                                            {mobileExpanded[catId] ? (
                                              <ChevronUp className="h-4 w-4" />
                                            ) : (
                                              <ChevronDown className="h-4 w-4" />
                                            )}
                                          </button>
                                        )}
                                      </div>
                                      <AnimatePresence>
                                        {mobileExpanded[catId] && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="pl-3 mt-1 border-l border-gray-100 flex flex-col space-y-1 py-1 mb-2">
                                              {catItems.map((item, idx) => (
                                                <Link
                                                  key={`${item.id || item.title || item.name}-${idx}`}
                                                  to={
                                                    link.path.includes("careers") || link.path.includes("solutions")
                                                      ? `${link.path}&category=${encodeURIComponent(item.category || item.type)}`
                                                      : `${link.path}/${item.id}`
                                                  }
                                                  onClick={() => setIsOpen(false)}
                                                  className="block text-xs text-black hover:text-blue-500 py-1 line-clamp-1"
                                                >
                                                  {item[itemTitleKey] || item.title}
                                                </Link>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })
                              )
                            ) : (
                              subLinks.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-sm text-black hover:text-blue-600 py-1"
                                >
                                  {sub.name}
                                </Link>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
