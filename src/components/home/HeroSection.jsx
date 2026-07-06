import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Code2, Database, Layout, Shield, Smartphone } from "lucide-react";

export default function HeroSection({ onNavigate, onGetQuoteClick, darkMode }) {
  const floatingIcons = [
    { Icon: Code2, color: "text-blue-500", delay: 0, x: -100, y: -50 },
    { Icon: Database, color: "text-emerald-500", delay: 1, x: 150, y: -80 },
    { Icon: Layout, color: "text-purple-500", delay: 2, x: -120, y: 100 },
    { Icon: Shield, color: "text-pink-500", delay: 3, x: 120, y: 80 },
    { Icon: Smartphone, color: "text-yellow-500", delay: 1.5, x: 0, y: -120 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${darkMode ? 'bg-slate-950/30' : 'bg-slate-50/10'}`}></div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto relative">
          {/* Elegant radial backdrop to make text pop against the clear video */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] rounded-[100%] blur-[120px] pointer-events-none -z-10 ${darkMode ? 'bg-slate-950/70' : 'bg-white/80'}`}></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-blue-500/30"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              World-Class Technology Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Transforming Ideas Into <br className="hidden sm:block" />
            <span className="text-gradient-primary">Powerful Digital Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg sm:text-xl font-medium mb-10 max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
          >
            We build modern websites, mobile apps, AI solutions, cybersecurity services, branding, cloud applications, digital marketing, and software products for startups, businesses, and enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onGetQuoteClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 transition-transform transform hover:-translate-y-1"
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold glass transition-transform transform hover:-translate-y-1 ${darkMode ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-50'}`}
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-transform transform hover:-translate-y-1 flex items-center justify-center gap-2 ${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              View Portfolio <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 + item.delay }}
          className="absolute hidden lg:flex left-1/2 top-1/2"
          style={{ x: item.x, y: item.y }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: item.delay,
            }}
            className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
          >
            <item.Icon className={`w-8 h-8 ${item.color}`} />
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
