import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Code, Layout, Smartphone, PenTool, Image, Hexagon, Search, 
  Megaphone, Cpu, Shield, Cloud, Server, Database, Users, 
  ShoppingCart, HardDrive, HeadphonesIcon, GraduationCap 
} from "lucide-react";

export default function ServicesView({ onNavigate, onGetQuoteClick, darkMode }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Web & Mobile", "Design & Brand", "Digital Marketing", "Enterprise Solutions", "Academic Projects"
  ];

  const premiumServices = [
    { title: "Website Development", category: "Web & Mobile", icon: Layout, desc: "Custom, responsive, and blazing fast websites." },
    { title: "Web Applications", category: "Web & Mobile", icon: Code, desc: "Scalable full-stack web platforms." },
    { title: "Mobile App Development", category: "Web & Mobile", icon: Smartphone, desc: "Native iOS and Android applications." },
    { title: "UI/UX Design", category: "Design & Brand", icon: PenTool, desc: "Intuitive, user-centered interface design." },
    { title: "Graphic Design", category: "Design & Brand", icon: Image, desc: "Professional visual assets and illustrations." },
    { title: "Logo Design & Branding", category: "Design & Brand", icon: Hexagon, desc: "Brand identity, logos, and style guides." },
    { title: "SEO Optimization", category: "Digital Marketing", icon: Search, desc: "Rank higher and drive organic traffic." },
    { title: "Digital Marketing", category: "Digital Marketing", icon: Megaphone, desc: "Data-driven marketing campaigns." },
    { title: "AI Solutions", category: "Enterprise Solutions", icon: Cpu, desc: "Machine learning and AI integrations." },
    { title: "Cybersecurity", category: "Enterprise Solutions", icon: Shield, desc: "Vulnerability assessment and protection." },
    { title: "Cloud Services", category: "Enterprise Solutions", icon: Cloud, desc: "AWS, Azure, and Google Cloud management." },
    { title: "ERP Solutions", category: "Enterprise Solutions", icon: Server, desc: "Enterprise Resource Planning software." },
    { title: "CRM Development", category: "Enterprise Solutions", icon: Users, desc: "Custom Customer Relationship Management." },
    { title: "E-Commerce", category: "Web & Mobile", icon: ShoppingCart, desc: "Online stores and payment gateways." },
    { title: "Hosting & Domain", category: "Enterprise Solutions", icon: HardDrive, desc: "Secure server hosting and deployment." },
    { title: "Technical Support", category: "Enterprise Solutions", icon: HeadphonesIcon, desc: "24/7 technical assistance and maintenance." },
    // Retaining core academic roots for Arsha Freelancers
    { title: "Final Year Academic Projects", category: "Academic Projects", icon: GraduationCap, desc: "IEEE standard complete software project packages." }
  ];

  const filteredServices = activeCategory === "All" 
    ? premiumServices 
    : premiumServices.filter(s => s.category === activeCategory);

  return (
    <div className={`min-h-screen pt-24 pb-20 bg-transparent`}>
      
      {/* Background glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Premium <span className="text-gradient-primary">Digital Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            From cutting-edge web applications to robust cybersecurity and academic prototypes, our expert team delivers excellence at every step.
          </motion.p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : `glass hover:bg-blue-50 hover:text-blue-600 ${darkMode ? 'text-slate-300 border-slate-700' : 'text-slate-600 border-slate-200'}`
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Service Grid with 3D Hover & Glow */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredServices.map((srv, index) => (
            <motion.div
              layout
              key={srv.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`relative group cursor-pointer glass-card rounded-2xl p-6 h-full transition-all duration-300 ${
                darkMode ? 'hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:border-blue-500/50' : 'hover:shadow-2xl hover:border-blue-400'
              }`}
              style={{ perspective: 1000 }}
              onClick={onGetQuoteClick}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <srv.icon className="w-7 h-7" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {srv.title}
                </h3>
                
                <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {srv.desc}
                </p>

                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-blue-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Request Quote <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
