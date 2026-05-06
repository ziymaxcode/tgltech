import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LINKS = [
  { name: 'Store', path: '/store' },
  { name: 'Projects', path: '/projects' },
  { 
    name: 'Careers', 
    path: '/careers',
    dropdown: [
      { name: 'PhD Research Support', path: '/careers?tab=phd' },
      { name: 'Internships', path: '/careers?tab=internships' },
      { name: 'Certifications', path: '/careers?tab=certifications' },
    ]
  },
  { name: 'Labs', path: '/labs' },
  { name: 'Solutions', path: '/solutions' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
          <div className="hidden md:flex items-center space-x-8">
            {LINKS.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              
              if (link.dropdown) {
                return (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={`flex items-center text-sm font-medium transition-colors ${
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
                            className="px-4 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors"
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
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors"
            >
              Inquiry
            </a>
            <div className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-500 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.109 1.38 4.759 1.381 5.281.001 9.574-4.291 9.576-9.574.001-2.559-1.017-4.965-2.869-6.815-1.852-1.851-4.255-2.869-6.815-2.869-5.285 0-9.577 4.292-9.578 9.576-.001 1.832.524 3.615 1.519 5.172l-.999 3.646 3.732-.979z"/></svg>
              <span className="text-xs font-bold uppercase">WhatsApp</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
            className="md:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {LINKS.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-medium text-slate-600 hover:text-blue-600"
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
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
