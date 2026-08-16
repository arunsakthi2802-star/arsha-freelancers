import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  activeView,
  setActiveView,
  darkMode,
  setDarkMode,
  onGetQuoteClick,
}) {
  const { isAdmin, isManager, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Project Library" },
    { id: "review", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const serviceItems = [
    { id: "services", label: "All Services" },
    { id: "advisor", label: "AI Advisor" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
            onClick={() => setActiveView("home")}
          >
            <img 
              src="/ARSHA LOGO.png" 
              alt="Arsha Logo" 
              className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                Arsha <span className="text-blue-600">Freelancers</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Software Solutions
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all relative group ${
                  activeView === item.id
                    ? darkMode ? "text-white" : "text-slate-900"
                    : darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item.label}
                {activeView === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-blue-500/10 dark:bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Hover Underline */}
                <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${activeView === item.id ? "hidden" : ""}`}></span>
              </button>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all relative group ${
                  activeView === "services" || activeView === "advisor"
                    ? darkMode ? "text-white" : "text-slate-900"
                    : darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl glass-card overflow-hidden"
                  >
                    <div className="py-2">
                      {serviceItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActiveView(subItem.id);
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                            darkMode
                              ? "text-slate-300 hover:text-white hover:bg-white/10"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="hidden xl:flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-colors ${
                darkMode ? "bg-white/10 text-yellow-300 hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => setActiveView(isAdmin ? "admin" : isManager ? "manager" : "portal")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-800 text-white"
                    : "border-slate-200 hover:bg-slate-50 text-slate-900"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => setActiveView("login")}
                className={`font-semibold text-sm transition-colors ${
                  darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Log In
              </button>
            )}

            <button
              onClick={onGetQuoteClick}
              className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? "text-yellow-300" : "text-slate-600"}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`xl:hidden border-t overflow-y-auto max-h-[calc(100vh-4.5rem)] ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[...menuItems, ...serviceItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium ${
                    activeView === item.id
                      ? "bg-blue-500/10 text-blue-600"
                      : darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    onGetQuoteClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Get Started
                </button>
                <button
                  onClick={() => {
                    setActiveView(isAuthenticated ? (isAdmin ? "admin" : isManager ? "manager" : "portal") : "login");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-sm border ${
                    darkMode ? "border-slate-700 text-white" : "border-slate-200 text-slate-900"
                  }`}
                >
                  {isAuthenticated ? "Dashboard" : "Log In"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
