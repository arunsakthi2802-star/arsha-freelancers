import React from "react";
import { motion } from "motion/react";
import { ClipboardList, Lightbulb, PenTool, Code, SearchCheck, Rocket, Wrench } from "lucide-react";

export default function DevelopmentProcess({ darkMode }) {
  const steps = [
    { id: 1, title: "Requirement Analysis", desc: "Understanding your vision, business goals, and technical requirements.", icon: ClipboardList },
    { id: 2, title: "Planning", desc: "Creating a comprehensive roadmap, architecture design, and timeline.", icon: Lightbulb },
    { id: 3, title: "UI/UX Design", desc: "Crafting beautiful, intuitive, and conversion-optimized interfaces.", icon: PenTool },
    { id: 4, title: "Development", desc: "Writing clean, scalable, and secure code using modern frameworks.", icon: Code },
    { id: 5, title: "Testing", desc: "Rigorous QA testing for performance, security, and usability across devices.", icon: SearchCheck },
    { id: 6, title: "Deployment", desc: "Launching your digital product to scalable cloud infrastructure.", icon: Rocket },
    { id: 7, title: "Maintenance", desc: "Continuous support, updates, and optimization to ensure long-term success.", icon: Wrench },
  ];

  return (
    <section className={`py-24 relative overflow-hidden bg-transparent`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Our Development <span className="text-gradient-primary">Process</span>
          </motion.h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            We follow a systematic, agile approach to deliver high-quality software on time and within budget.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 rounded-full opacity-20"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className={`glass-card p-6 md:p-8 rounded-2xl w-full max-w-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${darkMode ? 'hover:shadow-blue-500/20' : 'hover:shadow-blue-500/10'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{step.id}. {step.title}</h3>
                      </div>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-blue-500 bg-white dark:bg-slate-900 items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <span className="font-bold text-blue-500 dark:text-white">{step.id}</span>
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-full md:w-1/2"></div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
