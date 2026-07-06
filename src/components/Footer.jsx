import React from "react";
import { motion } from "motion/react";
import { Send, MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer({ onNavigate, darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative overflow-hidden pt-20 backdrop-blur-md ${darkMode ? 'bg-slate-950/20 text-slate-300' : 'bg-slate-900/40 text-slate-300'}`}>
      
      {/* Animated Wave Background (CSS only for smoothness) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50 dark:fill-slate-950 opacity-10"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate("home")}>
              <img src="/ARSHA LOGO.png" alt="Arsha Logo" className="h-8 w-auto object-contain" />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Arsha <span className="text-blue-500">Freelancers</span></span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Transforming ideas into powerful digital solutions for startups, enterprises, and academic visionaries globally.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Portfolio', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => onNavigate(link.toLowerCase().replace(' ', ''))} 
                    className={`text-sm transition-colors ${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Our Services</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'Cybersecurity', 'AI & ML Solutions', 'Academic Projects'].map((link) => (
                <li key={link}>
                  <button onClick={() => onNavigate("services")} className={`text-sm transition-colors ${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Newsletter</h4>
            <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Subscribe to our newsletter for the latest tech insights and company updates.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 w-full text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-r-md text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className={`border-t py-8 flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? 'border-slate-800' : 'border-slate-300'}`}>
          <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            &copy; {currentYear} Arsha Freelancers Software Solutions. All rights reserved.
          </p>
          <div className={`flex gap-6 text-sm ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            <a href="#" className={`transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Privacy Policy</a>
            <a href="#" className={`transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
