import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import ProjectsView from "./components/ProjectsView";
import { PortfolioView, FaqView } from "./components/ExtraViews";
import GalleryView from "./components/GalleryView";
import ContactView from "./components/ContactView";
import ReviewView from "./components/ReviewView";
import Footer from "./components/Footer";
import DetailsModal from "./components/DetailsModal";
import AnimatedBackground from "./components/AnimatedBackground";
import StoriesView from "./components/StoriesView";
import LoginView from "./components/LoginView";
import ArshaChat from "./components/ArshaChat";
import AdminView from "./components/admin/AdminView";
import StudentPortal from "./components/StudentPortal";
import AIProjectAdvisor from "./components/AIProjectAdvisor";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("arsha_theme") || "neo-classic";
  });
  // Modal states
  const [selectedProject, setSelectedProject] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedDept, setPreselectedDept] = useState("All");

  // Floating controls state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Quote form submission state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    service: "Final Year Academic Project",
    message: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Handle URL Routing for deep links and browser history
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, "");
      const validViews = ["home", "about", "services", "projects", "portfolio", "gallery", "contact", "faq", "review", "stories", "login", "admin", "portal", "advisor"];
      
      if (path === "student") {
        setActiveView("projects"); // Support legacy /student link
      } else if (validViews.includes(path)) {
        setActiveView(path);
      }
    };
    
    // Check on initial mount
    handleUrlChange();
    
    // Handle browser back/forward buttons
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  useEffect(() => {
    // Update URL when activeView changes without reloading
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
    if (currentPath !== activeView && !(currentPath === "student" && activeView === "projects")) {
      const newUrl = activeView === "home" ? "/" : `/${activeView}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [activeView]);

  // Handle active class sync for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle local storage sync for theme
  useEffect(() => {
    localStorage.setItem("arsha_theme", theme);
  }, [theme]);

  // Handle scroll monitoring for scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProjectFromModal = (project) => {
    setPreselectedDept(project.department);
    setActiveView("projects");
    setSelectedProject(null);
  };

  const handleQuoteFormChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const newQuoteRequest = {
      id: `QUO-${Math.floor(1000 + Math.random() * 9000)}`,
      ...quoteForm,
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    // Save to local storage for user visual record
    const existing = localStorage.getItem("arsha_quotes") || "[]";
    try {
      const parsed = JSON.parse(existing);
      localStorage.setItem(
        "arsha_quotes",
        JSON.stringify([newQuoteRequest, ...parsed]),
      );
    } catch (e) {
      console.error(e);
    }

    const text = `*New Consultation / Quote Request*\n*Name:* ${quoteForm.name}\n*Phone:* ${quoteForm.phone}\n*College:* ${quoteForm.college}\n*Service:* ${quoteForm.service}\n*Guidelines:* ${quoteForm.message}`;
    const whatsappUrl = `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");

    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteForm({
        name: "",
        phone: "",
        email: "",
        college: "",
        service: "Final Year Academic Project",
        message: "",
      });
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 4000);
  };

  const renderActiveView = () => {
    let viewContent;
    switch (activeView) {
      case "home":
        viewContent = (
          <HomeView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onGetQuoteClick={() => setIsQuoteModalOpen(true)}
          />
        );
        break;
      case "about":
        viewContent = (
          <AboutView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
        break;
      case "services":
        viewContent = (
          <ServicesView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onGetQuoteClick={() => setIsQuoteModalOpen(true)}
          />
        );
        break;
      case "projects":
        viewContent = (
          <ProjectsView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            openDetailsModal={(p) => setSelectedProject(p)}
            preselectedDept={preselectedDept}
          />
        );
        break;
      case "advisor":
        viewContent = <AIProjectAdvisor />;
        break;
      case "portfolio":
        viewContent = (
          <PortfolioView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
        break;
      case "gallery":
        viewContent = <GalleryView />;
        break;
      case "faq":
        viewContent = <FaqView />;
        break;
      case "contact":
        viewContent = <ContactView />;
        break;
      case "review":
        viewContent = <ReviewView />;
        break;
      case "stories":
        viewContent = <StoriesView />;
        break;
      case "login":
        viewContent = (
          <LoginView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
        break;
      case "admin":
        viewContent = (
          <AdminView
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
        break;
      case "portal":
        viewContent = (
          <StudentPortal
            onNavigate={(viewId) => {
              setActiveView(viewId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
        break;
      default:
        viewContent = (
          <HomeView
            onNavigate={setActiveView}
            onGetQuoteClick={() => setIsQuoteModalOpen(true)}
          />
        );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative z-10"
        >
          {viewContent}
        </motion.div>
      </AnimatePresence>
    );
  };

  const getThemeBgClass = () => {
    switch (theme) {
      case "neo-cyber":
        return darkMode
          ? "bg-[#08080c] text-slate-100"
          : "bg-[#fffdf2] text-slate-950";
      case "neo-mint":
        return darkMode
          ? "bg-[#060c08] text-emerald-50"
          : "bg-[#f4faf6] text-slate-900";
      case "neo-sunset":
        return darkMode
          ? "bg-[#0e070a] text-purple-50"
          : "bg-[#fdf6f5] text-slate-900";
      case "neo-classic":
      default:
        return darkMode
          ? "bg-[#0b1329] text-slate-100"
          : "bg-[#e0f2fe] text-slate-950";
    }
  };

  const isAdminPage = activeView === "admin";

  return (
    <AuthProvider>
    <div
      className={`min-h-screen ${getThemeBgClass()} font-sans flex flex-col justify-between transition-colors duration-300 select-none relative overflow-x-hidden`}
    >
      {/* 0. FLOATING BACKDROP CANVAS & GRID */}
      {!isAdminPage && <AnimatedBackground theme={theme} darkMode={darkMode} />}

      {/* 1. HEADER & STICKY NAVIGATION */}
      {!isAdminPage && (
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          theme={theme}
          setTheme={setTheme}
          onGetQuoteClick={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* 2. BODY DYNAMIC MAIN CONTENT VIEW */}
      <main className={`${isAdminPage ? "" : "flex-grow pt-4"} relative z-10`}>{renderActiveView()}</main>

      {/* 3. FOOTER */}
      {!isAdminPage && (
        <Footer
          activeView={activeView}
          setActiveView={setActiveView}
          onGetQuoteClick={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* 4. FLOATING UTILITIES */}
      {!isAdminPage && (
        <>
          {/* Lyzr AI Chat */}
          <ArshaChat />

          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
            {/* Scroll To Top button */}
            {showScrollTop && (
              <button
                onClick={handleScrollTop}
                className="p-3 bg-slate-900 text-white rounded-xl border-2 border-slate-950 dark:border-slate-800 shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] hover:translate-y-[-1px] transition-all cursor-pointer flex items-center justify-center"
                aria-label="Scroll to top"
                id="scrollTop-floating-btn"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            )}

            {/* WhatsApp floating button */}
            <a
              href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers!+I+want+to+know+more+about+your+academic+project+consultation+packages."
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl border-2 border-slate-950 dark:border-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px] transition-all flex items-center justify-center"
              aria-label="Contact WhatsApp"
              id="whatsapp-floating-btn"
            >
              <MessageCircle className="w-6 h-6 animate-pulse" />
            </a>
          </div>
        </>
      )}

      {/* 5. SPECIFICATION DETAILS MODAL */}
      <DetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={handleSelectProjectFromModal}
      />

      {/* 6. GET QUOTE POPUP MODAL */}
      {isQuoteModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="quote-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={() => setIsQuoteModalOpen(false)}
          ></div>

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 lg:p-8">
            <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border-2 border-slate-950 dark:border-slate-800 p-6 sm:p-8">
              {quoteSubmitted && (
                <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-30 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-2xl font-black mb-4 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">
                    Price Estimate Request Received!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                    Thank you,{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      {quoteForm.name}
                    </span>
                    ! We have captured your request for a price quote regarding{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      {quoteForm.service}
                    </span>
                    . Our pricing counselor will evaluate the guidelines and
                    ping you on mobile within 2 hours.
                  </p>
                </div>
              )}

              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                    Request an Instant Quote
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Provide your syllabus guidelines to receive a customized
                    budget-friendly quote.
                  </p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-3 pt-2">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Anand R"
                      value={quoteForm.name}
                      onChange={handleQuoteFormChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black uppercase text-slate-400">
                        WhatsApp Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98765..."
                        value={quoteForm.phone}
                        onChange={handleQuoteFormChange}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-black uppercase text-slate-400">
                        College Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. anand@gce..."
                        value={quoteForm.email}
                        onChange={handleQuoteFormChange}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  {/* College */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">
                      College & Degree *
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="e.g. Sona College, M.C.A"
                      value={quoteForm.college}
                      onChange={handleQuoteFormChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold"
                    />
                  </div>

                  {/* Service group */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">
                      Syllabus Service Required *
                    </label>
                    <select
                      name="service"
                      value={quoteForm.service}
                      onChange={handleQuoteFormChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                    >
                      <option value="Final Year Academic Project">
                        Final Year Academic Project
                      </option>
                      <option value="Mini Semester Project">
                        Mini Semester Project
                      </option>
                      <option value="Project Reports & Documentation Only">
                        Project Reports & Documentation Only
                      </option>
                      <option value="Seminar / Presentation Slides (PPT)">
                        Seminar / Presentation Slides (PPT)
                      </option>
                      <option value="Emerging Tech Specializations Class">
                        Emerging Tech Specializations Class
                      </option>
                    </select>
                  </div>

                  {/* Guidelines Message */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">
                      Specific Guidelines or Topic *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Briefly share any special topics, guidelines, or timeline targets you have."
                      value={quoteForm.message}
                      onChange={handleQuoteFormChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl border border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-center cursor-pointer flex items-center justify-center gap-1.5 pt-3"
                  >
                    <Send className="w-4 h-4" />
                    Submit Quote Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
    </AuthProvider>
  );
}
