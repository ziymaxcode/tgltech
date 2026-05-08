import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';

const LINKS = [
  { 
    name: 'Electronics DIY Store', 
    path: '/store',
    dropdown: [
      { name: 'All Components', path: '/store' },
      { name: 'Development Boards', path: '/store?category=Development+Boards' },
      { name: 'Sensors', path: '/store?category=Sensors' },
      { name: 'Modules', path: '/store?category=Modules' },
      { name: 'Robotics', path: '/store?category=Robotics' },
      { name: 'Drone Components', path: '/store?category=Drone+Components' },
      { name: 'Kits', path: '/store?category=Kits' },
    ]
  },
  { name: 'Engineering Projects', path: '/projects' },
  { name: 'Internships', path: '/careers?tab=internships' },
  { name: 'PhD Support', path: '/careers?tab=phd' },
  { name: 'Courses & Certifications', path: '/careers?tab=certifications' },
  { name: 'Lab Setups', path: '/labs' },
  { name: 'Technical Solutions', path: '/solutions' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Cpu className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl tracking-tight uppercase text-[#1d1d1f]">
              TGL <span className="text-blue-600 italic">Technologies</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-6">
            {LINKS.map((link) => {
              const isActive = link.path.includes('?') 
                ? location.pathname + location.search === link.path
                : location.pathname.startsWith(link.path) && link.path !== '/' || (link.path === '/' && location.pathname === '/');
              
              if (link.dropdown) {
                return (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={`flex items-center text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                    <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
                      <div className="bg-white border border-gray-100 shadow-lg rounded-2xl py-2 w-56 flex flex-col">
                        {link.dropdown.map(subLink => (
                          <Link 
                            key={subLink.path} 
                            to={subLink.path}
                            className="px-4 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                          >
                            {subLink.name}
                          </Link>
                        ))}
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
                    isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors ml-2">
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
            <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
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
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                const isActive = link.path.includes('?') 
                  ? location.pathname + location.search === link.path
                  : location.pathname.startsWith(link.path) && link.path !== '/' || (link.path === '/' && location.pathname === '/');
                  
                return (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-base font-medium ${
                        isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 mt-2 border-l-2 border-gray-100 flex flex-col space-y-2">
                        {link.dropdown.map(sub => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-gray-500 hover:text-blue-600"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
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
