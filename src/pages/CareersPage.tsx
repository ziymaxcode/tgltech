import { GraduationCap, Award, Users, BookOpen, ShieldCheck, Briefcase } from 'lucide-react';
import { COURSES } from '../data/mockData';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CareersPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'phd' | 'internships' | 'certifications'>('internships');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'phd' || tab === 'internships' || tab === 'certifications') {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1d1d1f] tracking-tight">
            {activeTab === 'phd' && 'PhD Research Support'}
            {activeTab === 'internships' && 'Internships'}
            {activeTab === 'certifications' && 'Courses & Certifications'}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {activeTab === 'phd' && 'Dedicated guidance and engineering support for your doctoral thesis and research publications.'}
            {activeTab === 'internships' && 'Hands-on learning, real-world projects, and career-defining industrial experience.'}
            {activeTab === 'certifications' && 'Expert-led curriculum to level up your engineering and software development skills.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {activeTab === 'phd' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 lg:p-16 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-96 h-96" />
            </div>
            <div className="max-w-3xl relative z-10">
              <span className="text-[10px] uppercase text-blue-600 font-black tracking-widest mb-4 block">Mentorship & Development</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-8 tracking-tight">Accelerate Your PhD Research</h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                TGL Technologies provides dedicated support for doctoral candidates and researchers. From sourcing rare customized components to assisting with complex hardware/software system designs, our engineering team acts as an extension of your research lab.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-gray-600"><Users className="w-5 h-5 text-blue-600 mr-4" /> Dedicated Engineering Mentorship</li>
                <li className="flex items-center text-gray-600"><BookOpen className="w-5 h-5 text-blue-600 mr-4" /> Custom Firmware & Schematic Design</li>
                <li className="flex items-center text-gray-600"><Award className="w-5 h-5 text-blue-600 mr-4" /> Accelerated PCB Fab & Sourcing</li>
              </ul>
              <a href="https://wa.me/919876543210?text=Hi, I am interested in PhD Research Support." target="_blank" rel="noreferrer" className="bg-[#1d1d1f] text-white hover:bg-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-block">
                Consult With Our Experts
              </a>
            </div>
          </div>
        )}

        {activeTab === 'internships' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
               <div>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-6 inline-block">On-Site / Remote</span>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">Embedded Systems Intern</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">Work directly with our hardware team designing custom PCBs, writing RTOS firmware, and integrating IoT solutions for enterprise clients.</p>
                  <div className="space-y-2 mb-8">
                     <p className="text-sm text-gray-600"><span className="font-bold">Duration:</span> 3-6 Months</p>
                     <p className="text-sm text-gray-600"><span className="font-bold">Requirements:</span> C/C++, Basic PCB Design, Microcontrollers</p>
                  </div>
               </div>
               <button className="w-full bg-gray-50 border border-gray-100 text-[#1d1d1f] font-bold py-3 rounded-full text-xs uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Apply Now
               </button>
            </div>
            
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
               <div>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-6 inline-block">Remote</span>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">IoT Cloud Intern</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">Build scalable backends, deploy MQTT brokers, and create real-time React dashboards for connected devices.</p>
                  <div className="space-y-2 mb-8">
                     <p className="text-sm text-gray-600"><span className="font-bold">Duration:</span> 3-6 Months</p>
                     <p className="text-sm text-gray-600"><span className="font-bold">Requirements:</span> React, Node.js, WebSockets, Firebase</p>
                  </div>
               </div>
               <button className="w-full bg-gray-50 border border-gray-100 text-[#1d1d1f] font-bold py-3 rounded-full text-xs uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Apply Now
               </button>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSES.map(course => (
              <div key={course.id} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col xl:flex-row shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="xl:w-2/5 md:aspect-video xl:aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6 xl:mb-0 xl:mr-6 shrink-0 relative">
                  <img src={course.image} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700" alt={course.name} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-2 block">{course.level}</span>
                  <h2 className="font-bold text-xl text-[#1d1d1f] mb-4 tracking-tight leading-tight">{course.name}</h2>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <BookOpen className="w-4 h-4 mr-3 text-gray-400" /> {course.duration}
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <Users className="w-4 h-4 mr-3 text-gray-400" /> Mentor: {course.mentor}
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <Award className="w-4 h-4 mr-3 text-gray-400" /> Certified Track
                    </div>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button className="flex-1 bg-[#1d1d1f] hover:bg-black text-white py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors">
                      Enroll
                    </button>
                    <button className="flex-1 bg-gray-50 border border-gray-100 hover:border-blue-600 hover:text-blue-600 text-gray-500 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors">
                      Syllabus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
