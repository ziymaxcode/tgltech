import {
  Cpu,
  Server,
  CircuitBoard,
  Smartphone,
  PenTool,
  Layers,
  Box,
  SlidersHorizontal,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SOLUTIONS_DATA = [
  {
    id: "embedded",
    title: "Embedded & Firmware",
    icon: Cpu,
    desc: "RTOS, C/C++, Bare-metal optimization for ESP, STM32, ARM Cortex.",
  },
  {
    id: "pcb",
    title: "PCB Design",
    icon: CircuitBoard,
    desc: "Multi-layer routing, SI/PI analysis, and DFM ready gerber outputs.",
  },
  {
    id: "cloud",
    title: "Cloud IoT Dashboards",
    icon: Server,
    desc: "AWS/GCP integrations, MQTT brokers, and real-time React UIs.",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    icon: Smartphone,
    desc: "Flutter and React Native control interfaces via Bluetooth and WebSockets.",
  },
  {
    id: "cad",
    title: "3D CAD Modeling",
    icon: Layers,
    desc: "Precision industrial design and mechanical engineering.",
  },
  {
    id: "prototyping",
    title: "FDM/SLA Prototyping",
    icon: Box,
    desc: "High-resolution rapid prints in PLA, ABS, and Resins.",
  },
  {
    id: "enclosure",
    title: "Enclosure Design",
    icon: PenTool,
    desc: "PCB-fit custom cases ready for injection molding.",
  },
];

export function SolutionsPage() {
  const location = useLocation();
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type) {
      setActiveType(type);
    } else {
      setActiveType("all");
    }
  }, [location]);

  const filteredSolutions =
    activeType === "all"
      ? SOLUTIONS_DATA
      : SOLUTIONS_DATA.filter((sol) => sol.id === activeType);

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
            {activeType === "all"
              ? "Technology & Prototyping Solutions"
              : filteredSolutions[0]?.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
              <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
              </h3>
              <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
                <li>
                  <button
                    onClick={() => setActiveType("all")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeType === "all"
                        ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                    }`}
                  >
                    All Solutions
                  </button>
                </li>
                {SOLUTIONS_DATA.map((sol) => (
                  <li key={sol.id}>
                    <button
                      onClick={() => setActiveType(sol.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeType === sol.id
                          ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                          : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                      }`}
                    >
                      {sol.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Solutions Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map((sol, i) => (
                <div
                  key={i}
                  className="flex flex-col p-6 bg-white border border-gray-100 rounded-3xl group transition-shadow hover:shadow-md"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors mb-6">
                    <sol.icon className="w-7 h-7 text-[#1d1d1f] group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h2 className="font-bold text-lg text-[#1d1d1f] mb-2 tracking-tight">
                      {sol.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {sol.desc}
                    </p>
                    {sol.title === "3D CAD Modeling" ||
                    sol.title === "FDM/SLA Prototyping" ||
                    sol.title === "Enclosure Design" ? null : (
                      <button className="text-[10px] uppercase text-gray-400 font-bold tracking-widest hover:text-blue-600 transition-colors self-start mt-auto">
                        View Case Studies →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#1d1d1f] p-10 rounded-3xl border border-gray-800 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
                Have an STL or STEP file?
              </h2>
              <p className="text-gray-400 text-sm mb-6 max-w-lg">
                Send us your 3D models and get an instant quotation for
                manufacturing and rapid prototyping.
              </p>
              <a
                href="https://wa.me/918217366801?text=Hi,%20I%20have%20an%20STL/STEP%20file%20for%20manufacturing"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-[#1d1d1f] hover:bg-gray-100 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-block"
              >
                Upload & Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
