import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, LayoutTemplate, GraduationCap, Microscope, Cpu } from "lucide-react";

const SLIDES = [
  {
    id: "store",
    title: "Shop in our DIY Store",
    subtitle: "Find the best sensors, modules, and DIY kits for your next project.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    link: "/store",
    icon: ShoppingCart,
    color: "from-blue-600/80 to-blue-900/90",
  },
  {
    id: "projects",
    title: "Find Engineering Projects",
    subtitle: "Source code, circuit diagrams, and full documentation.",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1600",
    link: "/projects",
    icon: LayoutTemplate,
    color: "from-emerald-600/80 to-emerald-900/90",
  },
  {
    id: "courses",
    title: "Certified Courses",
    subtitle: "Learn cutting-edge technologies with IEEE-inspired training.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",
    link: "/careers?tab=certifications",
    icon: GraduationCap,
    color: "from-purple-600/80 to-purple-900/90",
  },
  {
    id: "labs",
    title: "Institutional Lab Setups",
    subtitle: "State-of-the-art equipments for AICTE & ATL innovation labs.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=1600",
    link: "/labs",
    icon: Microscope,
    color: "from-amber-600/80 to-amber-900/90",
  },
  {
    id: "solutions",
    title: "Technical Solutions",
    subtitle: "Embedded systems, PCB design, and 3D prototyping services.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1600",
    link: "/solutions",
    icon: Cpu,
    color: "from-rose-600/80 to-rose-900/90",
  }
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={SLIDES[currentIndex].image} 
              alt={SLIDES[currentIndex].title}
              className="w-full h-full object-cover opacity-60"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${SLIDES[currentIndex].color} mix-blend-multiply opacity-80`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center pt-16">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
                    {React.createElement(SLIDES[currentIndex].icon, { className: "w-4 h-4 text-white" })}
                    <span className="text-white text-xs font-bold tracking-widest uppercase">{SLIDES[currentIndex].id.toUpperCase()}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-white mb-6">
                    {SLIDES[currentIndex].title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl line-clamp-2 md:line-clamp-none">
                    {SLIDES[currentIndex].subtitle}
                  </p>
                  <Link
                    to={SLIDES[currentIndex].link}
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                  >
                    Explore Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
