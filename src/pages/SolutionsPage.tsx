import { Cpu, Server, CircuitBoard, Smartphone, PenTool, Layers, Box } from 'lucide-react';

export function SolutionsPage() {
  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <Cpu className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-gray-500 uppercase tracking-widest text-[10px]">Enterprise</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Technology & Prototyping Solutions</h1>
          <p className="text-base text-gray-500 max-w-2xl leading-relaxed">
            From bare-metal firmware and custom PCB designs to 3D CAD modeling and rapid prototyping. We architect and develop custom hardware and software integrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: 'Embedded & Firmware', icon: Cpu, desc: 'RTOS, C/C++, Bare-metal optimization for ESP, STM32, ARM Cortex.' },
            { title: 'PCB Design', icon: CircuitBoard, desc: 'Multi-layer routing, SI/PI analysis, and DFM ready gerber outputs.' },
            { title: 'Cloud IoT Dashboards', icon: Server, desc: 'AWS/GCP integrations, MQTT brokers, and real-time React UIs.' },
            { title: 'Mobile Apps', icon: Smartphone, desc: 'Flutter and React Native control interfaces via Bluetooth and WebSockets.' },
            { title: '3D CAD Modeling', icon: Layers, desc: 'Precision industrial design and mechanical engineering.' },
            { title: 'FDM/SLA Prototyping', icon: Box, desc: 'High-resolution rapid prints in PLA, ABS, and Resins.' },
            { title: 'Enclosure Design', icon: PenTool, desc: 'PCB-fit custom cases ready for injection molding.' }
          ].map((sol, i) => (
            <div key={i} className="flex flex-col p-6 bg-white border border-gray-100 rounded-3xl group transition-shadow hover:shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors mb-6">
                <sol.icon className="w-7 h-7 text-[#1d1d1f] group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="font-bold text-lg text-[#1d1d1f] mb-2 tracking-tight">{sol.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{sol.desc}</p>
                {sol.title === '3D CAD Modeling' || sol.title === 'FDM/SLA Prototyping' || sol.title === 'Enclosure Design' ? null : (
                    <button className="text-[10px] uppercase text-gray-400 font-bold tracking-widest hover:text-blue-600 transition-colors self-start mt-auto">
                      View Case Studies →
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#1d1d1f] p-10 rounded-3xl border border-gray-800 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-white mb-3 tracking-tight">Have an STL or STEP file?</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg">
            Send us your 3D models and get an instant quotation for manufacturing and rapid prototyping.
          </p>
          <a href="https://wa.me/919876543210?text=Hi,%20I%20have%20an%20STL/STEP%20file%20for%20manufacturing" target="_blank" rel="noreferrer" className="bg-white text-[#1d1d1f] hover:bg-gray-100 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors inline-block">
            Upload & Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
