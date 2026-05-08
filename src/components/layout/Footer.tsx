import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-[#1d1d1f] py-12 md:py-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center space-x-2 text-[#1d1d1f] mb-4"
            >
              <Cpu className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight uppercase">
                TGL <span className="text-blue-600 italic">Technologies</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              India's trusted hub for Sensors, DIY Kits, Certifications, and
              Institutional Lab Solutions.
            </p>
          </div>
          <div>
            <h3 className="text-[#1d1d1f] font-bold tracking-tight mb-4">
              Ecosystem
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/store" className="hover:text-blue-600 transition">
                  Electronics DIY Store
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-blue-600 transition">
                  Engineering Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/careers?tab=certifications"
                  className="hover:text-blue-600 transition"
                >
                  Courses & Certifications
                </Link>
              </li>
              <li>
                <Link
                  to="/careers?tab=internships"
                  className="hover:text-blue-600 transition"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  to="/careers?tab=phd"
                  className="hover:text-blue-600 transition"
                >
                  PhD Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#1d1d1f] font-bold tracking-tight mb-4">
              Solutions
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link to="/labs" className="hover:text-blue-600 transition">
                  Lab Setups
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions"
                  className="hover:text-blue-600 transition"
                >
                  Tech Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#1d1d1f] font-bold tracking-tight mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Bengaluru, India</li>
              <li>support@tgltechnologies.com</li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  className="text-[#25D366] hover:opacity-80 transition font-bold"
                >
                  WhatsApp Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-12 pt-8 flex text-[10px] uppercase font-bold text-gray-400">
          <span className="text-gray-900">
            © {new Date().getFullYear()} TGL TECHNOLOGIES
          </span>
        </div>
      </div>
    </footer>
  );
}
