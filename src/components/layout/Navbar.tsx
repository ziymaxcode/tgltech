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
import { STORE_PRODUCTS } from "../../data/mockData";

const LINKS = [
  {
    name: "Electronics DIY Store",
    path: "/store",
    isMegaStore: true,
    dropdown: [
      { name: "All Components", path: "/store" },
      {
        name: "Development Boards",
        path: "/store?category=Development+Boards",
        storeCategory: "Development Boards",
      },
      {
        name: "Sensors",
        path: "/store?category=Sensors",
        storeCategory: "Sensors",
      },
      {
        name: "Modules",
        path: "/store?category=Modules",
        storeCategory: "Modules",
      },
      {
        name: "Robotics",
        path: "/store?category=Robotics",
        storeCategory: "Robotics",
      },
      {
        name: "Drone Components",
        path: "/store?category=Drone+Components",
        storeCategory: "Drone Components",
      },
      { name: "Kits", path: "/store?category=Kits", storeCategory: "Kits" },
    ],
  },
  {
    name: "Engineering Projects",
    path: "/projects",
    isMegaProjects: true,
    dropdown: [
      { name: "All Projects", path: "/projects" },
      {
        name: "IEEE Major Projects",
        path: "/projects?category=IEEE+Major+Projects",
      },
      {
        name: "Application Major Projects",
        path: "/projects?category=Application+Major+Projects",
      },
      { name: "Minor Projects", path: "/projects?category=Minor+Projects" },
      { name: "Robotics", path: "/projects?category=Robotics" },
      { name: "IOT", path: "/projects?category=IOT" },
    ],
  },
  {
    name: "Internships",
    path: "/careers?tab=internships",
    dropdown: [
      { name: "All Internships", path: "/careers?tab=internships" },
      {
        name: "IoT Development",
        path: "/careers?tab=internships&category=iot",
      },
      {
        name: "Web Development",
        path: "/careers?tab=internships&category=web",
      },
      {
        name: "Embedded Systems",
        path: "/careers?tab=internships&category=embedded",
      },
      {
        name: "AI & Machine Learning",
        path: "/careers?tab=internships&category=ai",
      },
    ],
  },
  {
    name: "Certified Courses",
    path: "/careers?tab=certifications",
    dropdown: [
      { name: "All Courses", path: "/careers?tab=certifications" },
      {
        name: "Programming Foundations",
        path: "/careers?tab=certifications&category=programming",
      },
      {
        name: "Robotics & Automation",
        path: "/careers?tab=certifications&category=robotics",
      },
      {
        name: "Internet of Things (IoT)",
        path: "/careers?tab=certifications&category=iot",
      },
      {
        name: "Artificial Intelligence",
        path: "/careers?tab=certifications&category=ai",
      },
    ],
  },
  {
    name: "Lab Setups",
    path: "/labs",
    dropdown: [
      { name: "All Labs", path: "/labs" },
      { name: "ATAL Tinkering Lab (ATL)", path: "/labs?type=atl" },
      { name: "AICTE IDEA Lab", path: "/labs?type=aicte" },
      { name: "NAIN Project Lab", path: "/labs?type=nain" },
      { name: "Innovation Robotics Lab", path: "/labs?type=robotics" },
      { name: "STEM Education Lab", path: "/labs?type=stem" },
      { name: "IoT & AI Lab", path: "/labs?type=iot" },
      { name: "Embedded Systems Lab", path: "/labs?type=embedded" },
    ],
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
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="w-full mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
           <img
          src="/logo.jpg"
          alt="TGL Technologies Logo"
          className="h-10 w-auto object-contain"
        />
            <span className="font-bold text-xl tracking-tight uppercase text-[#1d1d1f]">
              TGL <span className="text-blue-600 italic">Technologies</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6">
            {LINKS.map((link) => {
              const isActive = link.path.includes("?")
                ? location.pathname + location.search === link.path
                : (location.pathname.startsWith(link.path) &&
                    link.path !== "/") ||
                  (link.path === "/" && location.pathname === "/");

              if ((link as any).isMegaProjects) {
                return (
                  <div
                    key={link.path}
                    className="relative group"
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
                      className={`absolute top-full left-0 pt-4 transition-all z-50 ${closedMenuPath === link.path ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"}`}
                    >
                      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 w-[800px] flex gap-12">
                        {/* Sidebar */}
                        <div className="w-48 shrink-0">
                          <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4">
                            Major & Minor
                          </h3>
                          <ul className="space-y-3">
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/projects?category=IEEE+Major+Projects">
                                IEEE Major Projects
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/projects?category=Application+Major+Projects">
                                Application Major Projects
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/projects?category=Minor+Projects">
                                Minor Projects
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Mega Menu Content */}
                        <div className="flex-1 grid grid-cols-3 gap-8">
                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-blue-600 mb-4 pb-2 border-b border-gray-100">
                              Embedded
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=MATLAB">
                                  MATLAB
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=VLSI">VLSI</Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=ELECTRICAL">
                                  ELECTRICAL
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=PYTHON">
                                  PYTHON
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=ANDROID">
                                  ANDROID
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=JAVA">JAVA</Link>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4 pb-2 border-b border-gray-100">
                              Domains
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Robotics">
                                  Robotics
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=IOT">IOT</Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Deep+Learning">
                                  Deep Learning
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Industrial+Automation">
                                  Industrial Automation
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Biomedical">
                                  Biomedical
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Renewable">
                                  Renewable
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Mechatronics">
                                  Mechatronics
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Embedded+with+Matlab">
                                  Embedded with Matlab
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Artificial+Intelligence">
                                  Artificial Intelligence
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=OpenCV">
                                  OpenCV
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4 pb-2 border-b border-gray-100">
                              Controllers & Others
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=ARM7">ARM7</Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Raspberry+pi">
                                  Raspberry pi
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=NodeMCU">
                                  NodeMCU
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Arduino">
                                  Arduino
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=PIC16F77A">
                                  PIC16F77A
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/projects?category=Android">
                                  Android Apps
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.isMegaStore) {
                return (
                  <div
                    key={link.path}
                    className="relative group"
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
                      className={`absolute top-full left-0 pt-4 transition-all z-50 ${closedMenuPath === link.path ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"}`}
                    >
                      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 w-[800px] flex gap-12">
                        {/* Sidebar / Main Categories */}
                        <div className="w-48 shrink-0">
                          <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4">
                            Main Store
                          </h3>
                          <ul className="space-y-3">
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store">All Components</Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Development+Boards">
                                Development Boards
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Sensors">Sensors</Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Modules">Modules</Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Displays">
                                Displays
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Robotics">
                                Robotics
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Drone+Components">
                                Drone Components
                              </Link>
                            </li>
                            <li className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                              <Link to="/store?category=Kits">Kits</Link>
                            </li>
                          </ul>
                        </div>

                        {/* Mega Menu Content matching the requested style */}
                        <div className="flex-1 grid grid-cols-3 gap-8">
                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-blue-600 mb-4 pb-2 border-b border-gray-100">
                              Boards & Modules
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Development+Boards">
                                  Arduino
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Development+Boards">
                                  Raspberry Pi
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Development+Boards">
                                  ESP / NodeMCU
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Development+Boards">
                                  STM32
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Modules">
                                  Wireless Modules
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Displays">
                                  OLED & LCD
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4 pb-2 border-b border-gray-100">
                              Sensors & Power
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Sensors">
                                  Environmental
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Sensors">
                                  Motion & Distance
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Sensors">
                                  Gas & Chemical
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Sensors">
                                  Biometric
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Modules">
                                  Power Modules
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Modules">
                                  Relays & Switches
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-[#1d1d1f] mb-4 pb-2 border-b border-gray-100">
                              Robotics & Drones
                            </h3>
                            <ul className="space-y-3">
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Robotics">
                                  Robot Chassis
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Robotics">
                                  Motors & Drivers
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Drone+Components">
                                  BLDC Motors
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Drone+Components">
                                  ESCs & Flight Controllers
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Drone+Components">
                                  Propellers & Frames
                                </Link>
                              </li>
                              <li className="text-sm text-gray-600 hover:text-[#1d1d1f]">
                                <Link to="/store?category=Kits">
                                  Complete Kits
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.dropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative group"
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
                        ["Lab Setups", "Technical Solutions"].includes(
                          link.name,
                        )
                          ? "right-0"
                          : "left-0"
                      } ${closedMenuPath === link.path ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"}`}
                    >
                      <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 min-w-[500px]">
                        <h3 className="font-black text-[12px] uppercase tracking-widest text-[#1d1d1f] mb-6 pb-2 border-b border-gray-100">
                          {link.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          {link.dropdown.map((subLink) => (
                            <Link
                              key={subLink.path}
                              to={subLink.path}
                              className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors"
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
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
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
            className="xl:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {LINKS.map((link) => {
                const isActive = link.path.includes("?")
                  ? location.pathname + location.search === link.path
                  : (location.pathname.startsWith(link.path) &&
                      link.path !== "/") ||
                    (link.path === "/" && location.pathname === "/");

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
                      {link.dropdown && (
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
                      {link.dropdown && mobileExpanded[link.path] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-2 border-l-2 border-gray-100 flex flex-col space-y-2 py-2">
                            {link.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm text-gray-500 hover:text-blue-600 py-1"
                              >
                                {sub.name}
                              </Link>
                            ))}
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
