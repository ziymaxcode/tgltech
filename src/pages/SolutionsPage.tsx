import { Cpu, Server, CircuitBoard, Smartphone, PenTool, Layers, Box } from 'lucide-react';

export function SolutionsPage() {
  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-24">
      <div className="bg-white border-b border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Cpu className="w-10 h-10 text-blue-600" />
            <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Enterprise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Technology & Prototyping Solutions</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            From bare-metal firmware and custom PCB designs to 3D CAD modeling and rapid rapid prototyping. We architect and develop custom hardware and software integrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Embedded & Firmware', icon: Cpu, desc: 'RTOS, C/C++, Bare-metal optimization for ESP, STM32, ARM Cortex.' },
            { title: 'PCB Design', icon: CircuitBoard, desc: 'Multi-layer routing, SI/PI analysis, and DFM ready gerber outputs.' },
            { title: 'Cloud IoT Dashboards', icon: Server, desc: 'AWS/GCP integrations, MQTT brokers, and real-time React UIs.' },
            { title: 'Mobile Apps', icon: Smartphone, desc: 'Flutter and React Native control interfaces via Bluetooth and WebSockets.' },
            { title: '3D CAD Modeling', icon: Layers, desc: 'Precision industrial design and mechanical engineering.' },
            { title: 'FDM/SLA Prototyping', icon: Box, desc: 'High-resolution rapid prints in PLA, ABS, and Resins.' },
            { title: 'Enclosure Design', icon: PenTool, desc: 'PCB-fit custom cases ready for injection molding.' }
          ].map((sol, i) => (
            <div key={i} className="flex p-8 bg-white border border-gray-100 rounded-3xl group transition-shadow hover:shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-blue-50 transition-colors">
                <sol.icon className="w-8 h-8 text-[#1d1d1f] group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="ml-6">
                <h2 className="font-bold text-xl text-[#1d1d1f] mb-2 tracking-tight">{sol.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{sol.desc}</p>
                {sol.title === '3D CAD Modeling' || sol.title === 'FDM/SLA Prototyping' || sol.title === 'Enclosure Design' ? null : (
                    <button className="text-[10px] uppercase text-gray-400 font-bold tracking-widest hover:text-blue-600 transition-colors">
                      View Case Studies →
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1d1d1f] p-12 rounded-3xl border border-gray-800 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Have an STL or STEP file?</h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            Send us your 3D models and get an instant quotation for manufacturing and rapid prototyping.
          </p>
          <a href="https://wa.me/919876543210?text=Hi,%20I%20have%20an%20STL/STEP%20file%20for%20manufacturing" target="_blank" rel="noreferrer" className="bg-white text-[#1d1d1f] hover:bg-gray-100 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-block">
            Upload & Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
