import {
  Microscope,
  Beaker,
  Zap,
  Boxes,
  Lightbulb,
  Brain,
  HardHat,
  Bot,
  Atom,
  Cpu,
  Workflow,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { InfiniteProductScroll } from "../components/ui/InfiniteProductScroll";

export function LabsPage() {
  const location = useLocation();
  const [activeType, setActiveType] = useState("all");
  const { labs, loading } = useData();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type) {
      setActiveType(type);
    } else {
      setActiveType("all");
    }
  }, [location]);

  const displayLabs = labs || [];

  const filteredLabs =
    activeType === "all"
      ? displayLabs
      : displayLabs.filter((lab) => lab.id?.toLowerCase() === activeType?.toLowerCase());

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
            {activeType === "all" && "Institutional Lab Setups"}
            {activeType === "atl" && "ATAL Tinkering Lab (ATL)"}
            {activeType === "aicte" && "AICTE IDEA Lab"}
            {activeType === "nain" && "NAIN Project Lab"}
            {activeType === "robotics" && "Innovation Robotics Lab"}
            {activeType === "stem" && "STEM Education Lab"}
            {activeType === "iot" && "IoT & AI Lab"}
            {activeType === "embedded" && "Embedded Systems Lab"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-[#1d1d1f]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLabs.map((lab, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md p-8 rounded-3xl flex flex-col relative overflow-hidden group transition-all transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.05]">
                {lab.icon && typeof lab.icon === 'string' ? (
                  <img src={lab.icon} alt="" className="w-32 h-32 opacity-20 object-contain" referrerPolicy="no-referrer" />
                ) : lab.icon ? (
                  <lab.icon className="w-32 h-32" />
                ) : null}
              </div>
              
              {lab.icon && typeof lab.icon === 'string' ? (
                <img src={lab.icon} alt={lab.title} className="w-10 h-10 mb-6 relative z-10 object-contain" referrerPolicy="no-referrer" />
              ) : lab.icon ? (
                <lab.icon className="w-10 h-10 text-blue-600 mb-6 relative z-10" />
              ) : null}
              
              <h2 className="font-bold text-lg mb-3 tracking-tight relative z-10">
                {lab.title}
              </h2>
              <p className="text-sm text-gray-500 mb-8 flex-1 relative z-10 leading-relaxed">
                {lab.desc}
              </p>
              {lab.link ? (
                <a 
                  href={lab.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase text-blue-600 font-bold tracking-widest hover:text-blue-800 text-left transition-colors relative z-10 block"
                >
                  View Detail & Equipment →
                </a>
              ) : (
                <button className="text-[10px] uppercase text-gray-400 font-bold tracking-widest hover:text-blue-600 text-left transition-colors relative z-10">
                  View Detail & Equipment →
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 w-full">
          <div className="bg-[#1d1d1f] text-white rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Build Your Institution Lab
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Tell us your budget and institution type, and we'll recommend the
              exact Bill of Materials (BOM).
            </p>
            <a
              href="https://wa.me/918217366801"
              className="bg-white text-[#1d1d1f] hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-colors inline-block mix-blend-screen isolate"
            >
              Request Proposal
            </a>
          </div>
        </div>
      </div>
      <InfiniteProductScroll />
    </div>
  );
}
