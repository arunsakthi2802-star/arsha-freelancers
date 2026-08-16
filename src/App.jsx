import React, { useState, useEffect } from"react";
import { MessageCircle, ArrowUp, X, Send } from"lucide-react";
import { motion, AnimatePresence } from"motion/react";
import Navbar from"./components/Navbar";
import HomeView from"./components/HomeView";
const AboutView = React.lazy(() => import("./components/AboutView"));
const ServicesView = React.lazy(() => import("./components/ServicesView"));
const ProjectsView = React.lazy(() => import("./components/ProjectsView"));
const PortfolioView = React.lazy(() => import("./components/ExtraViews").then(m => ({ default: m.PortfolioView })));
const FaqView = React.lazy(() => import("./components/ExtraViews").then(m => ({ default: m.FaqView })));
const GalleryView = React.lazy(() => import("./components/GalleryView"));
const ContactView = React.lazy(() => import("./components/ContactView"));
const ReviewView = React.lazy(() => import("./components/ReviewView"));
const DetailsModal = React.lazy(() => import("./components/DetailsModal"));
const StoriesView = React.lazy(() => import("./components/StoriesView"));
const LoginView = React.lazy(() => import("./components/LoginView"));
const ArshaChat = React.lazy(() => import("./components/ArshaChat"));
const AdminPortal = React.lazy(() => import("./pages/admin/AdminPortal"));
const ManagerDashboard = React.lazy(() => import("./pages/manager/ManagerDashboard"));
const UserDashboard = React.lazy(() => import("./pages/user/UserDashboard"));
const AIProjectAdvisor = React.lazy(() => import("./components/AIProjectAdvisor"));
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import { AuthProvider } from"./context/AuthContext";

export default function App() {
 const [activeView, setActiveView] = useState("home");
 const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("arsha_theme");
    return savedTheme !== null ? savedTheme === "dark" : true;
  });
 // Modal states
 const [selectedProject, setSelectedProject] = useState(null);
 const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
 const [preselectedDept, setPreselectedDept] = useState("All");

 // Floating controls state
 const [showScrollTop, setShowScrollTop] = useState(false);

 // Quote form submission state
 const [quoteForm, setQuoteForm] = useState({
 name:"",
 phone:"",
 email:"",
 college:"",
 service:"Final Year Academic Project",
 message:"",
 });
 const [quoteSubmitted, setQuoteSubmitted] = useState(false);

 // Handle URL Routing for deep links and browser history
 useEffect(() => {
 const handleUrlChange = () => {
 const path = window.location.pathname.replace(/^\/|\/$/g,"");
 const validViews = ["home","about","services","projects","portfolio","gallery","contact","faq","review","stories","login","admin","manager","portal","advisor"];
 
 if (path ==="student") {
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
 const currentPath = window.location.pathname.replace(/^\/|\/$/g,"");
 if (currentPath !== activeView && !(currentPath ==="student" && activeView ==="projects")) {
 const newUrl = activeView ==="home" ?"/" : `/${activeView}`;
 window.history.pushState({},"", newUrl);
 }
 }, [activeView]);

  // Handle active class sync for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("arsha_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("arsha_theme", "light");
    }
  }, [darkMode]);

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
 window.scrollTo({ top: 0, behavior:"smooth" });
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
 const existing = localStorage.getItem("arsha_quotes") ||"[]";
 try {
 const parsed = JSON.parse(existing);
 localStorage.setItem("arsha_quotes",
 JSON.stringify([newQuoteRequest, ...parsed]),
 );
 } catch (e) {
 console.error(e);
 }

 const text = `*New Consultation / Quote Request*\n*Name:* ${quoteForm.name}\n*Phone:* ${quoteForm.phone}\n*College:* ${quoteForm.college}\n*Service:* ${quoteForm.service}\n*Guidelines:* ${quoteForm.message}`;
 const whatsappUrl = `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
 window.open(whatsappUrl,"_blank");

 setQuoteSubmitted(true);
 setTimeout(() => {
 setQuoteForm({
 name:"",
 phone:"",
 email:"",
 college:"",
 service:"Final Year Academic Project",
 message:"",
 });
 setQuoteSubmitted(false);
 setIsQuoteModalOpen(false);
 }, 4000);
 };

 const renderActiveView = () => {
 let viewContent;
 switch (activeView) {
 case"home":
 viewContent = (
 <HomeView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 onGetQuoteClick={() => setIsQuoteModalOpen(true)}
 darkMode={darkMode}
 />
 );
 break;
 case"about":
 viewContent = (
 <AboutView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 case"services":
 viewContent = (
 <ServicesView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 onGetQuoteClick={() => setIsQuoteModalOpen(true)}
 darkMode={darkMode}
 />
 );
 break;
 case"projects":
 viewContent = (
 <ProjectsView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 openDetailsModal={(p) => setSelectedProject(p)}
 preselectedDept={preselectedDept}
 defaultTab="library"
 darkMode={darkMode}
 />
 );
 break;
 case"custom_projects":
 viewContent = (
 <ProjectsView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 openDetailsModal={(p) => setSelectedProject(p)}
 preselectedDept={preselectedDept}
 defaultTab="submit"
 darkMode={darkMode}
 />
 );
 break;
 case"advisor":
 viewContent = <AIProjectAdvisor darkMode={darkMode} />;
 break;
 case"portfolio":
 viewContent = (
 <PortfolioView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 case"gallery":
 viewContent = <GalleryView darkMode={darkMode} />;
 break;
 case"faq":
 viewContent = <FaqView darkMode={darkMode} />;
 break;
 case"contact":
 viewContent = <ContactView darkMode={darkMode} />;
 break;
 case"review":
 viewContent = <ReviewView darkMode={darkMode} />;
 break;
 case"stories":
 viewContent = <StoriesView darkMode={darkMode} />;
 break;
 case"login":
 viewContent = (
 <LoginView
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 case"admin":
 viewContent = (
 <AdminPortal
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 case"manager":
 viewContent = (
 <ManagerDashboard
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 case"portal":
 viewContent = (
 <UserDashboard
 onNavigate={(viewId) => {
 setActiveView(viewId);
 window.scrollTo({ top: 0, behavior:"smooth" });
 }}
 darkMode={darkMode}
 />
 );
 break;
 default:
 viewContent = (
 <HomeView
 onNavigate={setActiveView}
 onGetQuoteClick={() => setIsQuoteModalOpen(true)}
 darkMode={darkMode}
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
 transition={{ duration: 0.4, ease:"easeInOut" }}
 className="relative z-10"
 >
 {viewContent}
 </motion.div>
 </AnimatePresence>
 );
 };

  const isDashboardView = ["admin", "manager", "portal"].includes(activeView);

  return (
  <AuthProvider>
  <div
  className={`min-h-screen font-outfit flex flex-col justify-between transition-colors duration-500 select-none relative overflow-x-hidden ${
          darkMode ? "ultimate-bg-animate text-slate-100" : "bg-slate-50 text-slate-900"
        }`}
  >
  <div className="fixed inset-0 z-[-2]">
    <AnimatedBackground theme="neo-cyber" darkMode={darkMode} />
  </div>

  {/* 1. HEADER & STICKY NAVIGATION */}
  {!isDashboardView && (
  <Navbar
  activeView={activeView}
  setActiveView={setActiveView}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  onGetQuoteClick={() => setIsQuoteModalOpen(true)}
  />
  )}

  {/* 2. BODY DYNAMIC MAIN CONTENT VIEW */}
  <main className={`${isDashboardView ?"" :"flex-grow pt-[4.5rem]"} relative z-10`}>
    <React.Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>}>
      {renderActiveView()}
    </React.Suspense>
  </main>

  {/* 3. FOOTER */}
  {!isDashboardView && (
  <Footer
  activeView={activeView}
  setActiveView={setActiveView}
  onGetQuoteClick={() => setIsQuoteModalOpen(true)}
  />
  )}

  {/* 4. FLOATING UTILITIES */}
  {!isDashboardView && (
 <>
 {/* Lyzr AI Chat */}
 <ArshaChat />

 <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
 {/* Scroll To Top button */}
 {showScrollTop && (
 <button
 onClick={handleScrollTop}
 className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center hover:-translate-y-1"
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
 className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md border border-slate-200 shadow-sm hover:shadow-md transition-shadow _4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-sm hover:shadow-md transition-shadow hover:translate-y-[-1px] transition-all flex items-center justify-center"
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
 <div className="relative transform overflow-hidden rounded-2xl glass-card text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 bg-white dark:bg-slate-900">
 {quoteSubmitted && (
 <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center text-center p-6">
 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded border border-slate-200 flex items-center justify-center text-2xl font-black mb-4 animate-bounce">
 ✓
 </div>
 <h3 className="text-xl font-black text-slate-950">
 Price Estimate Request Received!
 </h3>
 <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
 Thank you,{""}
 <span className="text-slate-900 font-bold">
 {quoteForm.name}
 </span>
 ! We have captured your request for a price quote regarding{""}
 <span className="text-slate-900 font-bold">
 {quoteForm.service}
 </span>
 . Our pricing counselor will evaluate the guidelines and
 ping you on mobile within 2 hours.
 </p>
 </div>
 )}

 <button
 onClick={() => setIsQuoteModalOpen(false)}
 className="absolute top-4 right-4 p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
 aria-label="Close modal"
 >
 <X className="w-4.5 h-4.5" />
 </button>

 <div className="space-y-4">
 <div>
 <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
 Request an Instant Quote
 </h3>
 <p className="text-xs text-slate-500 font-medium">
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold"
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold"
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold"
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold"
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold cursor-pointer"
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
 className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none font-bold"
 ></textarea>
 </div>

 <button
 type="submit"
 className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-sm rounded shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer flex items-center justify-center gap-2 mt-2"
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
