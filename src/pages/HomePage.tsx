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
import { EcosystemCard } from "../components/ui/EcosystemCard";
import { ProductCard } from "../components/ui/ProductCard";
import { ProductSkeleton } from "../components/ui/Skeletons";
import { HeroSlider } from "../components/ui/HeroSlider";
import { useData } from "../context/DataContext";

export function HomePage() {
  const { products: STORE_PRODUCTS, ecosystems: ECOSYSTEMS, loading } = useData();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSlider />

      {/* Ecosystem Overview */}
      <section className="py-16 bg-[#fbfbfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              One Unified Ecosystem
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Everything you need to learn, build, and innovate.
            </p>
          </div>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none' }}>
            {ECOSYSTEMS.map((sys) => (
              <div key={sys.id} className="w-[85vw] max-w-[320px] md:w-auto md:max-w-none snap-center shrink-0 md:shrink h-full">
                <EcosystemCard ecosystem={sys} />
              </div>
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
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={`skel-1-${i}`} className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0">
                    <ProductSkeleton />
                  </div>
                ))
              ) : STORE_PRODUCTS.slice(0, 10).map((product, index) => (
                <div
                  key={`${product.id}-1-${index}`}
                  className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 sm:gap-6 pr-3 sm:pr-6">
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={`skel-2-${i}`} className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0">
                    <ProductSkeleton />
                  </div>
                ))
              ) : STORE_PRODUCTS.slice(0, 10).map((product, index) => (
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
                  referrerPolicy="no-referrer"
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
          href="https://wa.me/918867132966"
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
