import React from "react";
import { motion } from "motion/react";
import HeroSection from "./home/HeroSection";
import TechnologiesMarquee from "./home/TechnologiesMarquee";
import DevelopmentProcess from "./home/DevelopmentProcess";
import Pricing from "./home/Pricing";

// For preview sections
import { Code, Layout, Smartphone, Shield, ArrowRight } from "lucide-react";

export default function HomeView({ onNavigate, onGetQuoteClick, darkMode }) {
  
  const previewServices = [
    { title: "Web Application", desc: "Custom full-stack web platforms built for scale.", icon: Layout, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Mobile Apps", desc: "Native & cross-platform iOS/Android development.", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "AI/ML Solutions", desc: "Intelligent automation and predictive modeling.", icon: Code, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Cybersecurity", desc: "Vulnerability assessment and secure architecture.", icon: Shield, color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <HeroSection onNavigate={onNavigate} onGetQuoteClick={onGetQuoteClick} darkMode={darkMode} />

      {/* 2. TECHNOLOGIES MARQUEE */}
      <TechnologiesMarquee darkMode={darkMode} />

      {/* 3. SERVICES PREVIEW (Grid with glass cards) */}
      <section className={`py-24 relative bg-transparent`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
              >
                Our Core <span className="text-gradient-secondary">Services</span>
              </motion.h2>
              <p className={`max-w-2xl text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                We provide end-to-end digital engineering to help you innovate faster and scale smarter.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("services")}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-bold group transition-colors whitespace-nowrap"
            >
              View All Services
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((srv, i) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 rounded-2xl cursor-pointer"
                onClick={() => onNavigate("services")}
              >
                <div className={`w-14 h-14 rounded-xl ${srv.bg} flex items-center justify-center mb-6`}>
                  <srv.icon className={`w-7 h-7 ${srv.color}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{srv.title}</h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEVELOPMENT PROCESS TIMELINE */}
      <DevelopmentProcess darkMode={darkMode} />

      {/* 5. PRICING SECTIONS */}
      <Pricing darkMode={darkMode} onGetQuoteClick={onGetQuoteClick} />
      
      {/* 6. CALL TO ACTION FOOTER PRE-BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Ready to Build Something Amazing?
          </motion.h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of satisfied clients. Let's discuss your project requirements and turn your vision into reality.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetQuoteClick}
            className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
          >
            Start Your Project Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}
