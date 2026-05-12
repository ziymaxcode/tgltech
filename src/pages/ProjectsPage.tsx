import { FolderGit2, Lightbulb, SlidersHorizontal, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { ProjectSkeleton } from "../components/ui/Skeletons";
import { useData } from "../context/DataContext";
import { InfiniteProductScroll } from "../components/ui/InfiniteProductScroll";

export function ProjectsPage() {
  const { projects: PROJECTS, loading } = useData();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"readymade" | "custom">("readymade");
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setActiveCategory(category);
      setActiveTab("readymade");
    } else {
      setActiveCategory("All Projects");
    }
  }, [location]);

  const readymadeProjects = PROJECTS.filter((project) => project.isReadymade === true);
  const filteredProjects = readymadeProjects.filter((p) => {
    const matchesCategory =
      activeCategory === "All Projects" || p.category === activeCategory;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.tags) && p.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
              Engineering Projects
            </h1>
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-600 font-medium text-sm text-[#1d1d1f] placeholder:text-gray-400 outline-none transition-shadow"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col-reverse md:flex-row gap-8">
        <ProjectSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="flex-1">
          {activeTab === "readymade" ? (
            loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col p-2 sm:p-3 relative transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className="absolute inset-0 z-10"
                    ></Link>

                    <div className="relative aspect-square overflow-hidden bg-[#fbfbfb] rounded-xl mb-2 sm:mb-3 flex items-center justify-center p-2 sm:p-3">
                      <img
                        referrerPolicy="no-referrer"
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.isReadymade && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-orange-500 text-white text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm z-20 relative">
                            Built
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 px-1">
                      <span className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1 line-clamp-1">
                        {project.category}
                      </span>
                      <h3 className="text-[#1d1d1f] font-semibold text-xs sm:text-sm leading-snug mb-1 sm:mb-2 line-clamp-2">
                        {project.name}
                      </h3>

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        {project.price && project.isReadymade ? (
                          <span className="font-bold text-sm sm:text-base tracking-tight text-[#1d1d1f]">
                            {project.price}
                          </span>
                        ) : (
                          <span className="flex items-center text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-gray-400">
                            Details
                          </span>
                        )}
                        <span className="flex items-center justify-center bg-[#1d1d1f] hover:bg-black text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase transition-colors z-20 pointer-events-none relative">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">
                  No projects found matching your search.
                </p>
              </div>
            )
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-10 lg:p-14 shadow-sm text-center">
              <Lightbulb className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
                Have a Custom Project Idea?
              </h2>
              <p className="text-gray-500 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
                Share your project idea with us. Our engineering team will
                review your requirements, discuss the feasibility, provide a
                quotation, and build a completely custom prototype hardware &
                software solution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
                <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                  <span className="text-blue-600 font-black text-xl mb-3 block">
                    01
                  </span>
                  <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">
                    Send Idea
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Share your core concept and system requirements.
                  </p>
                </div>
                <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                  <span className="text-blue-600 font-black text-xl mb-3 block">
                    02
                  </span>
                  <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">
                    Discussion
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    We validate and plan the technical architecture.
                  </p>
                </div>
                <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                  <span className="text-blue-600 font-black text-xl mb-3 block">
                    03
                  </span>
                  <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">
                    Prototyping
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Complete hardware and software development.
                  </p>
                </div>
                <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                  <span className="text-blue-600 font-black text-xl mb-3 block">
                    04
                  </span>
                  <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">
                    Delivery
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Receive the final working project and documentation.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/918217366801?text=Hi, I have a custom project idea:"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#1d1d1f] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg shadow-black/5"
              >
                Send Idea on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
      <InfiniteProductScroll />
    </div>
  );
}
