import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Code2, Layers, Brain, ShieldCheck, Rocket, Users, Award, Globe } from "lucide-react";

const roles = [
  "Web Applications",
  "Mobile Apps",
  "AI Solutions",
  "Cloud Platforms",
  "Cybersecurity",
  "Digital Products",
];

const stats = [
  { icon: Award, label: "Projects Delivered", value: "200+" },
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Globe, label: "Years Experience", value: "5+" },
  { icon: Rocket, label: "Technologies", value: "30+" },
];

export default function HeroSection({ onNavigate, onGetQuoteClick, darkMode }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Video – smooth, no-hang playback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "auto" }}
        />
        {/* Dark overlay so text is always readable */}
        <div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? "linear-gradient(to bottom, rgba(2,4,10,0.6) 0%, rgba(5,8,22,0.5) 60%, rgba(5,8,22,0.8) 100%)"
              : "linear-gradient(to bottom, rgba(248,250,252,0.55) 0%, rgba(248,250,252,0.45) 60%, rgba(248,250,252,0.75) 100%)"
          }}
        />
      </div>

      {/* Hero Text Center */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 border border-blue-500/40 bg-blue-500/10 backdrop-blur-md shadow-lg shadow-blue-500/10"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className={`text-sm font-semibold tracking-wide ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
            Award-Winning Software Solutions
          </span>
          <span className="animate-ping w-2 h-2 rounded-full bg-blue-400 opacity-75" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.035, delayChildren: 0.1 },
            },
          }}
          className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter mb-4 leading-none ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          {"We Build".split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 14, stiffness: 200 } },
              }}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated Role Switcher */}
        <div className="h-16 sm:h-20 lg:h-24 xl:h-28 mb-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter text-gradient-primary"
            >
              {roles[roleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Arsha Freelancers Software Solutions delivers cutting-edge software, AI, and digital products that help businesses and students thrive in the modern world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onGetQuoteClick}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_50px_rgba(79,70,229,0.7)] transition-all transform hover:-translate-y-1 overflow-hidden text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Start Your Project
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          <button
            onClick={() => onNavigate("projects")}
            className={`group relative w-full sm:w-auto px-8 py-4 rounded-full font-bold border transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-base backdrop-blur-md
              ${darkMode ? "text-white bg-white/5 border-white/20 hover:border-blue-400/50 hover:bg-white/10" : "text-slate-900 bg-black/5 border-black/10 hover:border-blue-500/40"}`}
          >
            <span className="flex items-center gap-2">
              Explore Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl backdrop-blur-md border transition-all hover-glow-card
                ${darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}
            >
              <stat.icon className={`w-5 h-5 mb-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`text-2xl font-extrabold ${darkMode ? "text-white" : "text-slate-900"}`}>{stat.value}</span>
              <span className={`text-xs font-medium text-center ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
