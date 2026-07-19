import React from "react";
import { motion } from "motion/react";
import HeroSection from "./home/HeroSection";
import { Code, Layout, Smartphone, Shield, ArrowRight } from "lucide-react";
import { fadeUp, hoverCard, viewportConfig } from "../utils/animations";

export default function HomeView({ onNavigate, onGetQuoteClick, darkMode }) {
  
  const previewServices = [
    { title: "Web Applications", desc: "Custom full-stack web platforms built for scale.", icon: Layout },
    { title: "Mobile Apps", desc: "Native & cross-platform iOS/Android development.", icon: Smartphone },
    { title: "AI/ML Solutions", desc: "Intelligent automation and predictive modeling.", icon: Code },
    { title: "Cybersecurity", desc: "Vulnerability assessment and secure architecture.", icon: Shield },
  ];

  const processSteps = [
    { num: "01", title: "Discovery", desc: "We understand your goals and map out the requirements." },
    { num: "02", title: "Design", desc: "Creating intuitive UI/UX with modern design principles." },
    { num: "03", title: "Development", desc: "Building scalable and robust solutions." },
    { num: "04", title: "Launch", desc: "Deploying and scaling your application smoothly." },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <HeroSection onNavigate={onNavigate} onGetQuoteClick={onGetQuoteClick} darkMode={darkMode} />

      {/* 2. SERVICES PREVIEW */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportConfig}
            >
              <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Expertise
              </h2>
              <p className={`max-w-2xl text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                End-to-end digital engineering to help you innovate faster and scale smarter.
              </p>
            </motion.div>
            <motion.button 
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportConfig}
              onClick={() => onNavigate("services")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group transition-colors whitespace-nowrap"
            >
              View All Services
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((srv, i) => (
              <motion.div
                key={srv.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportConfig}
                transition={{ delay: i * 0.1 }}
                whileHover="hover"
                className={`p-8 rounded-2xl cursor-pointer border ${
                  darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
                }`}
                onClick={() => onNavigate("services")}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                  <srv.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{srv.title}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm leading-relaxed`}>{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <section className={`py-24 sm:py-32 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How We Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportConfig}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className={`text-6xl font-extrabold opacity-10 mb-4 block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {step.num}
                </span>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION FOOTER PRE-BANNER */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className={`text-4xl md:text-5xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Ready to Build Something Amazing?
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
            className={`text-lg mb-10 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Let's discuss your project requirements and turn your vision into reality.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportConfig}
          >
            <button
              onClick={onGetQuoteClick}
              className="px-10 py-4 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors text-lg"
            >
              Start Your Project Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
