import { FolderGit2, Lightbulb, SlidersHorizontal, Search } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ProjectsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'readymade' | 'custom'>('readymade');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
      setActiveTab('readymade');
    } else {
      setActiveCategory('All');
    }
  }, [location]);

  const readymadeProjects = PROJECTS.filter(project => project.isReadymade);
  const filteredProjects = readymadeProjects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const PROJECT_CATEGORIES = [
    'All Projects',
    'IoT Projects',
    'AI Projects',
    'Robotics',
    'School Projects'
  ];

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">Engineering Projects</h1>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-6 flex flex-col gap-2 shrink-0">
              <button 
                onClick={() => setActiveTab('readymade')}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-colors text-left ${activeTab === 'readymade' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                Readymade Projects
              </button>
              <button 
                onClick={() => setActiveTab('custom')}
                className={`w-full flex items-center py-2.5 px-4 rounded-xl text-sm font-bold transition-colors text-left ${activeTab === 'custom' ? 'bg-blue-600 text-white shadow-md' : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'}`}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Request Custom Idea
              </button>
            </div>

            {activeTab === 'readymade' && (
              <>
                <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight shrink-0">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
                </h3>
                <ul className="space-y-1 overflow-y-auto pr-2 flex-1">
                  {PROJECT_CATEGORIES.map(cat => {
                    const tag = cat === 'All Projects' ? 'All' : cat;
                    return (
                      <li key={cat}>
                        <Link
                          to={cat === 'All Projects' ? '/projects' : `/projects?category=${encodeURIComponent(cat)}`}
                          onClick={() => setActiveTab('readymade')}
                          className={`w-full block text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            activeCategory === tag || (cat === 'All Projects' && activeCategory === 'All')
                              ? 'bg-gray-50 text-blue-600 font-bold border border-gray-100' 
                              : 'text-gray-500 hover:bg-gray-50 hover:text-[#1d1d1f]'
                          }`}
                        >
                          {cat}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </aside>

        <div className="flex-1">
          {activeTab === 'readymade' ? (
            filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col p-4 relative transition-shadow hover:shadow-md">
                    <Link to={`/projects/${project.id}`} className="absolute inset-0 z-10"></Link>
                    
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest">{project.category}</span>
                      {project.isReadymade && (
                        <span className="bg-orange-500 text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full z-20">
                          Fully Built
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-[#1d1d1f] leading-tight mb-2 line-clamp-2">
                      {project.name}
                    </h3>
                    
                    <div className="relative h-48 overflow-hidden bg-[#fbfbfb] rounded-2xl mb-4 flex items-center justify-center">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity p-2"
                      />
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {project.price && project.isReadymade ? (
                        <span className="font-bold text-xl tracking-tight text-[#1d1d1f]">{project.price}</span>
                      ) : (
                        <span className="flex items-center text-[10px] font-bold tracking-widest uppercase text-blue-600">
                          View Details
                        </span>
                      )}
                      <span className="flex items-center justify-center bg-gray-50 border border-gray-100 hover:border-blue-600 hover:text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors text-gray-500 z-20 pointer-events-none group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 relative">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-lg">No projects found matching your search.</p>
              </div>
            )
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-10 lg:p-14 shadow-sm text-center">
               <Lightbulb className="w-16 h-16 text-blue-600 mx-auto mb-6" />
               <h2 className="text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Have a Custom Project Idea?</h2>
               <p className="text-gray-500 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
                 Share your project idea with us. Our engineering team will review your requirements, discuss the feasibility, provide a quotation, and build a completely custom prototype hardware & software solution.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-xl mb-3 block">01</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">Send Idea</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Share your core concept and system requirements.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-xl mb-3 block">02</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">Discussion</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">We validate and plan the technical architecture.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-xl mb-3 block">03</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">Prototyping</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Complete hardware and software development.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-xl mb-3 block">04</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-1 tracking-tight">Delivery</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Receive the final working project and documentation.</p>
                  </div>
               </div>

               <a href="https://wa.me/919876543210?text=Hi, I have a custom project idea:" target="_blank" rel="noreferrer" className="inline-block bg-[#1d1d1f] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg shadow-black/5">
                 Send Idea on WhatsApp
               </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
