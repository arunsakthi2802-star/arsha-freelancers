import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  FileText,
  Sun,
  Moon,
  ArrowRight,
  Palette,
  LogIn,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  activeView,
  setActiveView,
  darkMode,
  setDarkMode,
  theme,
  setTheme,
  onGetQuoteClick,
}) {
  const { isAdmin, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themes = [
    { id: "neo-classic", name: "Classic Slate", dot: "bg-neo-purple" },
    { id: "neo-cyber", name: "Cyber Neon", dot: "bg-neo-yellow" },
    { id: "neo-mint", name: "Forest Mint", dot: "bg-neo-lime" },
    { id: "neo-sunset", name: "Sunset Rose", dot: "bg-neo-pink" },
  ];

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Student Projects" },
    { id: "portfolio", label: "Portfolio" },
    { id: "gallery", label: "Gallery" },
    { id: "stories", label: "Stories" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
    { id: "review", label: "⭐ Reviews" },
    ...(isAuthenticated && isAdmin ? [{ id: "admin", label: "🛡 Dashboard" }] : []),
    ...(isAuthenticated && !isAdmin ? [{ id: "portal", label: "🔑 Portal" }] : []),
    ...(!isAuthenticated ? [{ id: "login", label: "Sign In" }] : []),
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
            id="nav-logo"
          >
            <div className="overflow-hidden rounded-xl transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center bg-white w-10 h-10">
              <img
                src="/arsha logo.jpeg"
                alt="Arsha Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-50 leading-none">
                ARSHA{" "}
                <span className="text-blue-600 dark:text-cyan-400">
                  FREELANCERS
                </span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 leading-none">
                Software Solutions
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/40 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
            {menuItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm border border-blue-600"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-100 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] bg-white dark:bg-slate-900 flex items-center gap-1.5"
                aria-label="Customize Theme"
                id="theme-palette-picker"
              >
                <Palette className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider hidden xl:inline">
                  Theme
                </span>
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <>
                    {/* Backdrop for easy dismiss */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setThemeDropdownOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl brutalist-border p-2.5 z-50 shadow-xl space-y-1 text-left"
                    >
                      <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-[9px] font-black uppercase text-slate-450 tracking-wider">
                          Select Style Mood
                        </span>
                      </div>
                      {themes.map((t) => {
                        const isSelected = theme === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setTheme(t.id);
                              setThemeDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full border border-slate-950 ${t.dot}`}
                              />
                              {t.name}
                            </span>
                            {isSelected && (
                              <span className="text-blue-600 dark:text-cyan-400 text-[10px]">
                                ●
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border-2 border-slate-900 dark:border-slate-100 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] bg-white dark:bg-slate-900"
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+want+to+inquire+about+academic+project+services+and+pricing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl border-2 border-slate-900 dark:border-slate-100 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              id="nav-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            {/* Get Quote Button */}
            <button
              onClick={onGetQuoteClick}
              className="inline-flex items-center gap-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl border-2 border-slate-900 dark:border-slate-100 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
              id="nav-quote-btn"
            >
              Get Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hamburger / Controls for Mobile & Tablet */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 cursor-pointer"
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                        isActive
                          ? "bg-blue-600 text-white border border-blue-600"
                          : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-transparent"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Theme Picker Option */}
              <div className="py-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                  Select Style Mood
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => {
                    const isSelected = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 brutalist-border-sm hover:translate-y-0 ${
                          isSelected
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-slate-950 ${t.dot}`}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+want+to+inquire+about+academic+project+services+and+pricing."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 bg-emerald-600 text-white text-xs font-extrabold rounded-xl"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGetQuoteClick();
                  }}
                  className="flex items-center justify-center gap-1 py-3 bg-blue-600 text-white text-xs font-extrabold rounded-xl"
                >
                  <FileText className="w-4 h-4" />
                  Get Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
