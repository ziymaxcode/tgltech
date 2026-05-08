import { Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/mockData";
import { SlidersHorizontal, Lightbulb } from "lucide-react";

export const PROJECT_CATEGORIES = [
  "All Projects",
  "IoT Projects",
  "AI Projects",
  "Robotics",
  "School Projects",
  "College Projects",
  "Arduino Projects",
  "Raspberry Pi Projects",
  "Medical Electronics",
];

interface ProjectSidebarProps {
  activeTab: "readymade" | "custom";
  setActiveTab: (tab: "readymade" | "custom") => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function ProjectSidebar({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
}: ProjectSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-6 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveTab("readymade");
              if (window.location.pathname !== "/projects")
                navigate("/projects");
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-colors text-left ${activeTab === "readymade" ? "bg-blue-600 text-white shadow-md" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
          >
            Readymade Projects
          </button>
          <button
            onClick={() => {
              setActiveTab("custom");
              if (window.location.pathname !== "/projects")
                navigate("/projects");
            }}
            className={`w-full flex items-center py-2.5 px-4 rounded-xl text-sm font-bold transition-colors text-left ${activeTab === "custom" ? "bg-blue-600 text-white shadow-md" : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"}`}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Request Custom Idea
          </button>
        </div>

        {activeTab === "readymade" && (
          <>
            <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
            </h3>
            <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
              {PROJECT_CATEGORIES.map((cat) => {
                const tag = cat === "All Projects" ? "All" : cat;
                return (
                  <li key={cat} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (activeCategory === tag && tag !== "All") {
                          setActiveCategory("All");
                          navigate(`/projects`);
                        } else {
                          setActiveCategory(tag);
                          if (tag === "All") {
                            navigate(`/projects`);
                          } else {
                            navigate(
                              `/projects?category=${encodeURIComponent(cat)}`,
                            );
                          }
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${
                        activeCategory === tag ||
                        (cat === "All Projects" && activeCategory === "All")
                          ? "bg-gray-50 text-blue-600 font-bold border border-gray-100"
                          : "text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]"
                      }`}
                    >
                      <span>{cat}</span>
                      {cat !== "All Projects" && (
                        <span
                          className={`transition-transform duration-300 ${activeCategory === cat ? "rotate-90 text-blue-600" : "text-gray-400"}`}
                        >
                          ›
                        </span>
                      )}
                    </button>
                    {cat !== "All Projects" && activeCategory === cat && (
                      <div className="mt-1 flex flex-col pl-3 border-l-2 border-gray-100 ml-3">
                        {PROJECTS.filter(
                          (p) => p.category === cat && p.isReadymade,
                        ).map((project) => (
                          <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="px-3 py-1.5 text-sm text-gray-500 hover:text-blue-600 hover:bg-gray-50 transition-colors flex flex-col rounded-lg"
                          >
                            <span className="truncate">{project.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
