import React from "react";
import { motion } from "motion/react";
import { Users, Target, Zap, ShieldCheck, Heart, Award, ChevronRight } from "lucide-react";

export default function AboutView({ onNavigate, darkMode }) {
  
  const stats = [
    { label: "Completed Projects", value: "250+", icon: Award },
    { label: "Happy Clients", value: "150+", icon: Heart },
    { label: "Expert Developers", value: "15+", icon: Users },
    { label: "Years Experience", value: "5+", icon: Zap },
  ];

  const values = [
    { title: "Innovation", desc: "We constantly explore emerging technologies to deliver cutting-edge solutions.", icon: Zap, color: "text-blue-500" },
    { title: "Integrity", desc: "Transparent processes and honest communication form the foundation of our work.", icon: ShieldCheck, color: "text-emerald-500" },
    { title: "Excellence", desc: "We don't settle for good. We strive for world-class quality in every line of code.", icon: Target, color: "text-purple-500" },
  ];

  const timeline = [
    { year: "2019", title: "The Beginning", desc: "Started as a small group of passionate student developers." },
    { year: "2021", title: "Going Corporate", desc: "Expanded into full-scale enterprise software and B2B solutions." },
    { year: "2023", title: "AI Integration", desc: "Launched dedicated AI/ML development and automated systems." },
    { year: "2026", title: "Global Reach", desc: "Serving international clients with world-class digital products." },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-20 ${darkMode ? 'text-slate-100 bg-slate-950/20' : 'text-slate-900 bg-white/20'} backdrop-blur-lg`}>
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Empowering the <span className="text-gradient-primary">Digital Future</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Arsha Freelancers is a premium software engineering agency. We bridge the gap between complex business challenges and scalable technological solutions.
          </motion.p>
        </div>

        {/* Animated Counters / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-3xl font-extrabold mb-1">{stat.value}</h3>
              <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To democratize access to enterprise-grade software solutions, empowering startups and established businesses alike to disrupt their industries through technology.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-500">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              To be the globally recognized benchmark for digital excellence, where brilliant engineering meets unparalleled user experience design.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
              >
                <val.icon className={`w-10 h-10 mb-6 ${val.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Our Journey</h2>
          </div>
          <div className="relative border-l-2 border-blue-500/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
            
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/30 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                  >
                    {/* Node */}
                    <div className="absolute left-[-41px] md:static md:w-1/2 flex justify-center z-10">
                      <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                    </div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                      <div className="glass-card p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                        <span className="text-blue-500 font-black text-xl block mb-2">{item.year}</span>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
