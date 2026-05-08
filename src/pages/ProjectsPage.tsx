import { FolderGit2, Lightbulb } from 'lucide-react';
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

          {activeTab === 'readymade' && (
            <div className="max-w-2xl mx-auto mt-8 flex flex-wrap gap-4 justify-center">
              {['All Projects', 'IoT Projects', 'AI Projects', 'Robotics', 'School Projects'].map(tag => (
                <Link 
                  to={tag === 'All Projects' ? '/projects' : `/projects?category=${encodeURIComponent(tag)}`}
                  key={tag} 
                  className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors ${
                    (tag === 'All Projects' && activeCategory === 'All') || activeCategory === tag 
                      ? 'border-blue-600 text-blue-600 bg-white' 
                      : 'border-gray-100 bg-gray-50 hover:border-blue-600 hover:text-blue-600 text-gray-500'
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {activeTab === 'readymade' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <div 
                  className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full relative"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-50">
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-gray-100 text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-xl text-blue-600 z-20">
                      {project.category}
                    </span>
                    {project.isReadymade && (
                       <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-xl z-20 shadow-md">
                         Fully Built
                       </span>
                    )}
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-90" />
                  </div>
                  <div className="px-2 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-[#1d1d1f] mb-3 leading-tight">{project.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-[10px] font-bold tracking-widest uppercase text-blue-600">
                        View Details <span className="ml-2 font-normal text-lg leading-none transform transition-transform group-hover:translate-x-1">→</span>
                      </div>
                      {project.price && project.isReadymade && (
                         <span className="font-bold text-[#1d1d1f]">{project.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-12 lg:p-16 shadow-sm text-center">
             <Lightbulb className="w-16 h-16 text-blue-600 mx-auto mb-6" />
             <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Have a Custom Project Idea?</h2>
             <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
               Share your project idea with us. Our engineering team will review your requirements, discuss the feasibility, provide a quotation, and build a completely custom prototype hardware & software solution.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-left">
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
  );
}
