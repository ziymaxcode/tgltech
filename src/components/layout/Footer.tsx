import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-[#1d1d1f] pt-8 pb-12 md:pt-10 md:pb-16">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
         <Link to="/" className="inline-flex items-start -ml-4 sm:ml-0">
          <img
            src="/logot.png"
            alt="TGL Technologies Logo"
            className="h-20 w-auto object-contain object-left"
          />
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
              <li>
                5th Floor, Oberle Towers, Balmatta, Mangaluru, Karnataka 575001
              </li>
              <li>info@tgltechnologies.com</li>
              <li>
                <a href="tel:+918867132966" className="hover:text-blue-600 transition-colors">
                  +91 88671 32966
                </a>
                {" / "}
                <a href="tel:+91996873312" className="hover:text-blue-600 transition-colors">
                  +91 9968 73312
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/918867132966"
                  className="text-[#25D366] hover:opacity-80 transition font-bold"
                >
                  WhatsApp Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-4 pt-3 pb-1 flex justify-center text-[10px] uppercase font-bold">
  <span className="text-gray-900">
    © {new Date().getFullYear()} TGL TECHNOLOGIES
  </span>
</div>
      </div>
    </footer>
  );
}
