import React from "react";
import { Send, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer({ onNavigate, darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative border-t py-16 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
              <img src="/ARSHA LOGO.png" alt="Arsha Logo" className="h-8 w-auto object-contain" />
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Arsha <span className="text-blue-600">Freelancers</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Transforming ideas into powerful digital solutions for startups, enterprises, and academic visionaries globally.
            </p>
            <div className="flex space-x-3">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-gray-800 hover:bg-blue-600 hover:text-white' : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Portfolio', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => onNavigate(link.toLowerCase().replace(' ', ''))} 
                    className="text-sm hover:text-blue-600 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Apps', 'Cybersecurity', 'AI & ML Solutions', 'Academic Projects'].map((link) => (
                <li key={link}>
                  <button onClick={() => onNavigate("services")} className="text-sm hover:text-blue-600 transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={`font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest tech insights and company updates.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className={`flex-1 min-w-0 rounded-l-lg px-4 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white transition-colors border border-transparent">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className={`pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
          <p className="text-sm">
            &copy; {currentYear} Arsha Freelancers Software Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
