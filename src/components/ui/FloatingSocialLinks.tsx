import { Facebook, Instagram, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export function FloatingSocialLinks() {
  const socialLinks = [
    {
      id: "call",
      name: "Call Us",
      icon: <Phone className="w-5 h-5" />,
      url: "tel:+918867132966",
      color: "bg-[#3b82f6] hover:bg-[#2563eb]", // Blue color
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.109 1.38 4.759 1.381 5.281.001 9.574-4.291 9.576-9.574.001-2.559-1.017-4.965-2.869-6.815-1.852-1.851-4.255-2.869-6.815-2.869-5.285 0-9.577 4.292-9.578 9.576-.001 1.832.524 3.615 1.519 5.172l-.999 3.646 3.732-.979z" />
        </svg>
      ),
      url: "https://wa.me/918867132966",
      color: "bg-[#25d366] hover:bg-[#128c7e]",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://www.facebook.com/people/TGL-Technologies/61564706261764/",
      color: "bg-[#1877f2] hover:bg-[#0c5aab]",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/tgl_technologies/",
      color: "bg-[#e4405f] hover:bg-[#c13584]",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-4 hidden-when-menu-open transition-all">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: -5, scale: 1.1 }}
          className={`${link.color} text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors group relative`}
          aria-label={link.name}
        >
          {link.icon}

          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {link.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
