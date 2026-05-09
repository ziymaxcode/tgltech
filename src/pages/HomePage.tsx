import { motion } from "motion/react";
import {
  ArrowRight,
  Zap,
  BookOpen,
  Presentation,
  Hexagon,
  ShieldCheck,
  FileCode,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ECOSYSTEMS, STORE_PRODUCTS } from "../data/mockData";
import { EcosystemCard } from "../components/ui/EcosystemCard";
import { ProductCard } from "../components/ui/ProductCard";

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-[#fbfbfb]">
        <div className="w-full mx-auto px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-12">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold tracking-tight leading-none mb-4 text-[#1d1d1f]"
              >
                Accelerating Academic Innovation.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500"
              >
                India’s trusted hub for Sensors, DIY Kits, Certifications, and
                Institutional Lab Solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 mb-2"
            >
              <div className="px-6 py-3 bg-gray-100 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#1d1d1f]">1000+</span>
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mt-1">
                  Components
                </span>
              </div>
              <div className="px-6 py-3 bg-gray-100 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#1d1d1f]">50+</span>
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mt-1">
                  PhD Support
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-16 bg-[#fbfbfb]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              One Unified Ecosystem
            </h2>
            <p className="text-gray-500">
              Everything you need to learn, build, and innovate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOSYSTEMS.map((sys) => (
              <EcosystemCard key={sys.id} ecosystem={sys} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
                Trending in Store
              </h2>
              <p className="text-gray-500">
                Most requested components and modules.
              </p>
            </div>
            <Link
              to="/store"
              className="hidden md:flex text-blue-600 font-bold text-sm tracking-wider uppercase items-center hover:opacity-80"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative w-full mb-4">
          <div className="flex w-max animate-scrolling pl-4 sm:pl-6 lg:pl-8 hover:[animation-play-state:paused]">
            <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">
              {STORE_PRODUCTS.slice(0, 10).map((product, index) => (
                <div
                  key={`${product.id}-1-${index}`}
                  className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">
              {STORE_PRODUCTS.slice(0, 10).map((product, index) => (
                <div
                  key={`${product.id}-2-${index}`}
                  className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Spotlight */}
      <section className="py-16 bg-[#fbfbfb]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase text-purple-600 font-black tracking-widest mb-1">
                Marketplace
              </span>
              <h2 className="text-3xl font-bold mb-4 text-[#1d1d1f] tracking-tight">
                What will you build today?
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Connect sensors to the cloud, automate your home, or build an AI
                robot. We provide the components, source code, and video
                tutorials.
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: "Smart Home Hub",
                    desc: "IoT dashboard controlling 4 relays via ESP32.",
                    cat: "IoT",
                  },
                  {
                    name: "AI Face Tracking Camera",
                    desc: "ESP32-CAM with OpenCV python backend.",
                    cat: "Vision",
                  },
                  {
                    name: "Object Avoidance Robot",
                    desc: "Arduino based chassis with ultrasonic sensing.",
                    cat: "Robotics",
                  },
                ].map((proj, i) => (
                  <div
                    key={i}
                    className="flex p-4 rounded-3xl bg-white border border-gray-100 shadow-sm items-center"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 border border-gray-100 flex items-center justify-center font-bold shrink-0">
                      0{i + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-[#1d1d1f] text-sm">
                        {proj.name}
                      </h4>
                      <p className="text-gray-400 text-xs">{proj.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-50 text-[10px] font-bold border border-gray-100 rounded-lg text-gray-500 mr-2">
                      {proj.cat}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/projects"
                className="inline-flex mt-8 px-6 py-3 bg-[#1d1d1f] text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors items-center group"
              >
                Explore Directory
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
                  alt="Circuit Board"
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers & Growth Section */}
      <section className="py-20 bg-[#1d1d1f] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03]">
          <ShieldCheck className="w-96 h-96" />
        </div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-[10px] uppercase text-blue-500 font-black tracking-widest mb-3 block">
              Growth Engine
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Careers & Growth
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-xl text-lg">
              Whether you need dedicated mentorship for your doctoral thesis,
              hands-on internships in embedded systems, or industry-recognized
              certifications, we have a track for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/careers?tab=phd"
                className="px-8 py-4 bg-white text-[#1d1d1f] rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                PhD Support
              </Link>
              <Link
                to="/careers?tab=internships"
                className="px-8 py-4 bg-gray-800 text-white border border-gray-700 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-700 transition-colors inline-flex items-center"
              >
                Internships
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="aspect-square w-64 rounded-full border border-gray-800 bg-gray-900 flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 rounded-full border-t border-blue-500 animate-[spin_4s_linear_infinite]"></div>
              <BookOpen className="w-24 h-24 text-blue-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-gray-200 p-4 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.05)] md:hidden">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-full bg-green-500 text-white py-3 rounded-xl font-bold shadow-md"
        >
          Inquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
