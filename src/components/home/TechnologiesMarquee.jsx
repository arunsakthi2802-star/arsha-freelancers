import React from "react";
import { motion } from "motion/react";

export default function TechnologiesMarquee({ darkMode }) {
  const technologies = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", 
    "Express.js", "Python", "Django", "FastAPI", "Flutter", "React Native", "Java", "Spring Boot", 
    "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Docker", "Kubernetes", "AWS", "Azure", 
    "Git", "GitHub", "TensorFlow", "OpenAI APIs", "Linux", "Cybersecurity Tools"
  ];

  // Duplicate for seamless scroll
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section className={`py-12 overflow-hidden bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
        <h3 className={`text-sm font-bold tracking-widest uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Powered by Industry Leading Technologies
        </h3>
      </div>
      
      <div className="relative w-full flex overflow-hidden group">
        {/* Left/Right Gradients for smooth fade */}
        <div className={`absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r ${darkMode ? 'from-slate-950 to-transparent' : 'from-slate-50 to-transparent'}`}></div>
        <div className={`absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l ${darkMode ? 'from-slate-950 to-transparent' : 'from-slate-50 to-transparent'}`}></div>

        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-4 items-center w-max px-4"
        >
          {marqueeItems.map((tech, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-110 cursor-pointer ${
                darkMode 
                  ? 'bg-slate-900/40 backdrop-blur-md border-slate-700/50 text-slate-300 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'bg-white/40 backdrop-blur-md border-slate-200 text-slate-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              }`}
            >
              <span className="font-semibold">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
