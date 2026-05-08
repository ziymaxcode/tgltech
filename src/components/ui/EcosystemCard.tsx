import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface EcosystemCardProps {
  key?: string | number;
  ecosystem: {
    title: string;
    description: string;
    icon: LucideIcon | any;
    path: string;
    color: string;
    [key: string]: any;
  };
}

export function EcosystemCard({
  ecosystem: { title, description, icon: Icon, path, color },
}: EcosystemCardProps) {
  return (
    <Link to={path}>
      <motion.div className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm flex flex-col relative overflow-hidden group h-full">
        <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest mb-1">
          {title}
        </span>
        <h3 className="font-bold text-xl text-[#1d1d1f] mb-2">{title}</h3>
        <p className="text-sm text-gray-500 flex-1 mb-6">{description}</p>

        <div className="mt-auto flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider">
          Explore System <span className="ml-2">→</span>
        </div>
      </motion.div>
    </Link>
  );
}
