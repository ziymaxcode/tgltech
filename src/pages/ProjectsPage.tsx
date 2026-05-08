import { FolderGit2, Lightbulb, SlidersHorizontal } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ProjectsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'readymade' | 'custom'>('readymade');
  const [activeCategory, setActiveCategory] = useState<string>('All');

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
  const filteredProjects = activeCategory === 'All' 
    ? readymadeProjects 
    : readymadeProjects.filter(p => p.category === activeCategory);

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
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FolderGit2 className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Project Ecosystem</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose from our pre-built ready-to-deploy projects or request a completely custom build.
          </p>
          
          <div className="max-w-sm mx-auto mt-8 flex bg-gray-50 p-1 rounded-full border border-gray-100">
            <button 
              onClick={() => setActiveTab('readymade')}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'readymade' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-[#1d1d1f]'}`}
            >
              Readymade
            </button>
            <button 
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'custom' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-[#1d1d1f]'}`}
            >
              Custom Idea
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col md:flex-row gap-8">
        {activeTab === 'readymade' && (
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm">
              <h3 className="font-bold flex items-center text-[#1d1d1f] border-b border-gray-100 pb-4 mb-4 tracking-tight">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Categories
              </h3>
              <ul className="space-y-1">
                {PROJECT_CATEGORIES.map(cat => {
                  const tag = cat === 'All Projects' ? 'All' : cat;
                  return (
                    <li key={cat}>
                      <Link
                        to={cat === 'All Projects' ? '/projects' : `/projects?category=${encodeURIComponent(cat)}`}
                        className={`w-full block text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          activeCategory === tag || (cat === 'All Projects' && activeCategory === 'All')
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        )}

        <div className="flex-1">
          {activeTab === 'readymade' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-12 lg:p-16 shadow-sm text-center">
               <Lightbulb className="w-16 h-16 text-blue-600 mx-auto mb-6" />
               <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Have a Custom Project Idea?</h2>
               <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                 Share your project idea with us. Our engineering team will review your requirements, discuss the feasibility, provide a quotation, and build a completely custom prototype hardware & software solution.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-2xl mb-4 block">01</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-2 tracking-tight">Send Idea</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Share your core concept and system requirements.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-2xl mb-4 block">02</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-2 tracking-tight">Discussion</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">We validate and plan the technical architecture.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-2xl mb-4 block">03</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-2 tracking-tight">Prototyping</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Complete hardware and software development.</p>
                  </div>
                  <div className="p-6 bg-[#fbfbfb] rounded-2xl border border-gray-100">
                      <span className="text-blue-600 font-black text-2xl mb-4 block">04</span>
                      <h3 className="font-bold text-[#1d1d1f] mb-2 tracking-tight">Delivery</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Receive the final working project and documentation.</p>
                  </div>
               </div>

               <a href="https://wa.me/919876543210?text=Hi, I have a custom project idea:" target="_blank" rel="noreferrer" className="inline-block bg-[#1d1d1f] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg shadow-black/5">
                 Send Idea on WhatsApp
               </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
