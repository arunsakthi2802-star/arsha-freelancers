import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, Layout, Smartphone, PenTool, Image, Hexagon, Search, 
  Megaphone, Cpu, Shield, Cloud, Server, Database, Users, 
  ShoppingCart, HardDrive, Wrench, Lightbulb, Network 
} from "lucide-react";
import { fadeUp, staggerContainer, hoverCard } from "../utils/animations";

export default function ServicesView({ onNavigate, onGetQuoteClick, darkMode }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Web & Mobile", "Design & Brand", "Digital Marketing", "Enterprise Solutions"
  ];

  const premiumServices = [
    { title: "Website Development", category: "Web & Mobile", icon: Layout, desc: "Custom, responsive, and blazing fast websites." },
    { title: "Web Applications", category: "Web & Mobile", icon: Code, desc: "Scalable full-stack web platforms." },
    { title: "Mobile Apps", category: "Web & Mobile", icon: Smartphone, desc: "Native iOS and Android applications." },
    { title: "UI/UX Design", category: "Design & Brand", icon: PenTool, desc: "Intuitive, user-centered interface design." },
    { title: "Graphic Design", category: "Design & Brand", icon: Image, desc: "Professional visual assets and illustrations." },
    { title: "Branding", category: "Design & Brand", icon: Hexagon, desc: "Brand identity, logos, and style guides." },
    { title: "AI Solutions", category: "Enterprise Solutions", icon: Cpu, desc: "Machine learning and AI integrations." },
    { title: "Cybersecurity", category: "Enterprise Solutions", icon: Shield, desc: "Vulnerability assessment and protection." },
    { title: "SEO", category: "Digital Marketing", icon: Search, desc: "Rank higher and drive organic traffic." },
    { title: "Digital Marketing", category: "Digital Marketing", icon: Megaphone, desc: "Data-driven marketing campaigns." },
    { title: "Cloud Services", category: "Enterprise Solutions", icon: Cloud, desc: "AWS, Azure, and Google Cloud management." },
    { title: "ERP", category: "Enterprise Solutions", icon: Server, desc: "Enterprise Resource Planning software." },
    { title: "CRM", category: "Enterprise Solutions", icon: Users, desc: "Custom Customer Relationship Management." },
    { title: "API Development", category: "Enterprise Solutions", icon: Network, desc: "Robust and secure backend API services." },
    { title: "E-Commerce", category: "Web & Mobile", icon: ShoppingCart, desc: "Online stores and payment gateways." },
    { title: "Hosting", category: "Enterprise Solutions", icon: HardDrive, desc: "Secure server hosting and deployment." },
    { title: "Maintenance", category: "Enterprise Solutions", icon: Wrench, desc: "24/7 technical assistance and maintenance." },
    { title: "Technical Consulting", category: "Enterprise Solutions", icon: Lightbulb, desc: "Expert guidance for your tech infrastructure." }
  ];

  const filteredServices = activeCategory === "All" 
    ? premiumServices 
    : premiumServices.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Digital Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            From cutting-edge web applications to robust cybersecurity and academic prototypes, our expert team delivers excellence at every step.
          </motion.p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? darkMode 
                    ? "bg-white text-gray-900 border-white" 
                    : "bg-gray-900 text-white border-gray-900"
                  : darkMode 
                    ? "bg-transparent text-gray-400 border-gray-800 hover:text-white hover:border-gray-600" 
                    : "bg-transparent text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Service Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((srv) => (
              <motion.div
                layout
                key={srv.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover="hover"
                variants={hoverCard}
                className={`relative group cursor-pointer rounded-2xl p-8 border transition-colors ${
                  darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
                onClick={onGetQuoteClick}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                  <srv.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {srv.title}
                </h3>
                
                <p className={`text-sm mb-8 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {srv.desc}
                </p>

                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Request Quote <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
