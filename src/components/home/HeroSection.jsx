import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Code, Smartphone, Brain, Shield } from "lucide-react";
import { staggerContainer, fadeUp } from "../../utils/animations";

export default function HeroSection({ onNavigate, onGetQuoteClick, darkMode }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}>
              Software Engineering & Design
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={fadeUp}
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Digital solutions for <br />
            <span className="text-gray-400">visionary brands.</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p 
            variants={fadeUp}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-500"
          >
            We build scalable web applications, mobile platforms, and AI-driven solutions that help modern businesses and startups thrive.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onGetQuoteClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Get a Quote
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-medium transition-colors border flex items-center justify-center gap-2 group ${
                darkMode ? "border-gray-800 text-white hover:bg-gray-900" : "border-gray-200 text-gray-900 hover:bg-gray-50"
              }`}
            >
              Explore Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
