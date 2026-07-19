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
    { id: "projects", label: "Work" },
    { id: "review", label: "Testimonials" },
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
          ? "glass-header py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
            onClick={() => setActiveView("home")}
          >
            <img 
              src="/ARSHA LOGO.png" 
              alt="Arsha Logo" 
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                Arsha <span className="text-blue-600">Freelancers</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative group ${
                  activeView === item.id
                    ? darkMode ? "text-white" : "text-gray-900"
                    : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
                {activeView === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors relative group ${
                  activeView === "services" || activeView === "advisor"
                    ? darkMode ? "text-white bg-gray-800" : "text-gray-900 bg-gray-100"
                    : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
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
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl glass-card overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800"
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
                              ? "text-gray-300 hover:text-white hover:bg-gray-800"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
                darkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => setActiveView(isAdmin ? "admin" : isManager ? "manager" : "portal")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all border ${
                  darkMode
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-200 hover:bg-gray-50 text-gray-900"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => setActiveView("login")}
                className={`font-medium text-sm transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Log In
              </button>
            )}

            <button
              onClick={onGetQuoteClick}
              className="px-5 py-2.5 rounded-full font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${darkMode ? "text-white" : "text-gray-900"}`}
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
            className={`xl:hidden border-t ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100"}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[...menuItems, ...serviceItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium ${
                    activeView === item.id
                      ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-white"
                      : darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-4">
                <button
                  onClick={() => {
                    onGetQuoteClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => {
                    setActiveView(isAuthenticated ? (isAdmin ? "admin" : isManager ? "manager" : "portal") : "login");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 rounded-lg font-medium border ${
                    darkMode ? "border-gray-800 text-white hover:bg-gray-800" : "border-gray-200 text-gray-900 hover:bg-gray-50"
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

