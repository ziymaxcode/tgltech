import { useParams, Link } from 'react-router-dom';
import { PROJECTS, STORE_PRODUCTS, COURSES } from '../data/mockData';
import { ArrowLeft, Download, FileCode2, Presentation, Video, GraduationCap, PackageOpen, FileText, Code, Cpu, PlaySquare } from 'lucide-react';

export function ProjectDetailsPage() {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) return <div className="p-24 text-center">Project not found</div>;

  const componentsNeeded = project.componentsUsed.map(id => STORE_PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const relatedCourses = project.relatedCourses?.map(id => COURSES.find(c => c.id === id)).filter(Boolean);

  const whatsappMessage = `Hi TGL,%0A%0AI'm interested in the ${project.isReadymade ? 'Readymade Project: ' : 'Components for DIY Project: '}*${project.name}*.`;

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-32">
      {/* Hero */}
      <div className="relative h-[40vh] bg-[#1d1d1f] flex items-end pb-12 border-b border-gray-200">
        <div className="absolute inset-0 overflow-hidden">
          <img src={project.image} className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-between items-end">
          <div>
            <Link to="/projects" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </Link>
            <div className="flex gap-2 mb-4">
              <span className="bg-white/10 text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/20 inline-block">
                {project.category}
              </span>
              {project.isReadymade && (
                <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-orange-400 inline-block">
                  Fully Built
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl tracking-tight">{project.name}</h1>
          </div>
          {project.isReadymade && project.price && (
             <div className="hidden md:flex flex-col items-end">
               <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Price</span>
               <span className="text-4xl font-bold text-white tracking-tight">{project.price}</span>
             </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {project.isReadymade && project.price && (
             <div className="md:hidden flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Price</span>
               <span className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{project.price}</span>
             </div>
          )}

          <section className="mb-8">
            <h2 className="font-bold text-2xl text-[#1d1d1f] mb-4 tracking-tight">About Project</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-4">{project.description}</p>
            <p className="text-gray-500 text-lg leading-relaxed">{project.abstract || project.synopsis}</p>
          </section>

          <section className="mb-12">
            <h3 className="font-bold text-lg text-[#1d1d1f] mb-4 flex items-center tracking-tight">
              <Download className="w-5 h-5 mr-3 text-blue-600" /> Download Documentation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <FileCode2 className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <span className="block text-sm font-bold text-[#1d1d1f]">Project Synopsis</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Google Drive Link</span>
                </div>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <Presentation className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <span className="block text-sm font-bold text-[#1d1d1f]">Project Abstract</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Google Drive Link</span>
                </div>
              </a>
            </div>
          </section>

          {!project.isReadymade && (
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-xl text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                <Download className="w-5 h-5 mr-3 text-blue-600" /> Download Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
                  <FileCode2 className="w-8 h-8 text-[#1d1d1f] mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Source Code</span>
                </button>
                <button className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
                  <Presentation className="w-8 h-8 text-[#1d1d1f] mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Diagram</span>
                </button>
                <button className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors">
                  <Video className="w-8 h-8 text-[#1d1d1f] mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Video</span>
                </button>
              </div>
            </section>
          )}

          {project.isReadymade && (
             <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-xl text-[#1d1d1f] mb-6 flex items-center tracking-tight">
                <PackageOpen className="w-5 h-5 mr-3 text-blue-600" /> What's Included
              </h2>
              <div className="bg-[#e4edfa] border border-blue-100 rounded-3xl p-8 mb-8">
                <div className="flex justify-center mb-6">
                   <h3 className="text-xl font-black text-[#153a70] uppercase tracking-wider bg-white/50 px-6 py-2 rounded-full inline-block backdrop-blur-sm shadow-sm border border-white/60">
                     Each Project Includes
                   </h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                   <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1">
                      <FileText className="w-12 h-12 text-[#153a70] mb-4 stroke-2" />
                      <span className="text-sm font-bold text-[#153a70] text-center">Documentation</span>
                   </div>
                   <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1">
                      <Code className="w-12 h-12 text-[#153a70] mb-4 stroke-2" />
                      <span className="text-sm font-bold text-[#153a70] text-center">Source Code</span>
                   </div>
                   <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1">
                      <Cpu className="w-12 h-12 text-[#153a70] mb-4 stroke-2" />
                      <span className="text-sm font-bold text-[#153a70] text-center">Circuit Design</span>
                   </div>
                   <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1">
                      <PlaySquare className="w-12 h-12 text-[#153a70] mb-4 stroke-2" />
                      <span className="text-sm font-bold text-[#153a70] text-center">Working Video</span>
                   </div>
                </div>
                <div className="bg-[#153a70] rounded-2xl p-4 text-center shadow-inner">
                   <span className="text-white font-bold tracking-wider uppercase text-sm sm:text-base">
                     Digital Download Available
                   </span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Components List / Buy Section */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            {componentsNeeded.length > 0 && (
              <>
                <h3 className="font-bold text-lg mb-4 text-[#1d1d1f] tracking-tight">
                  {project.isReadymade ? 'Internal Components' : 'Components Used'}
                </h3>
                <ul className="space-y-4 mb-6">
                  {componentsNeeded.map((p: any) => (
                    <li key={p.id}>
                      <Link to={`/store/${p.id}`} className="flex items-center group">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shrink-0">
                          <img src={p.image} className="max-w-full max-h-full mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-bold text-[#1d1d1f] group-hover:text-blue-600 line-clamp-1">{p.name}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            
            <a 
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className={`w-full block text-center font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-colors ${project.isReadymade ? 'bg-[#25D366] text-white hover:bg-green-500' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            >
              {project.isReadymade ? 'Order Full Kit' : 'Requirements Kit'}
            </a>
          </div>

          {/* Related Courses */}
          {relatedCourses && relatedCourses.length > 0 && (
            <div className="bg-[#fbfbfb] p-6 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-[#1d1d1f] flex items-center tracking-tight">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" /> Master this skill
              </h3>
              {relatedCourses.map((c: any) => (
                <Link key={c.id} to="/careers?tab=certifications" className="block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                  <h4 className="font-bold text-[13px] text-[#1d1d1f] mb-1">{c.name}</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{c.duration} • {c.level}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
