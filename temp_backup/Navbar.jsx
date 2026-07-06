import { useState } from"react";
import {
 Menu,
 X,
 MessageCircle,
 FileText,
 Sun,
 Moon,
 ArrowRight,
 Palette,
 ChevronDown,
} from"lucide-react";
import { motion, AnimatePresence } from"motion/react";
import { useAuth } from"../context/AuthContext";

export default function Navbar({
 activeView,
 setActiveView,
 darkMode,
 setDarkMode,
 theme,
 setTheme,
 onGetQuoteClick,
}) {
 const { isAdmin, isManager, isAuthenticated } = useAuth();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
 const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

 const studentItems = [
 { id:"projects", label:"Student Project Library" },
 { id:"custom_projects", label:"Custom Project" },
 { id:"advisor", label:"AI Advisor" }
 ];

 const themes = [
 { id:"neo-classic", name:"Classic Slate", dot:"bg-white border-t-2 border-blue-500" },
 { id:"neo-cyber", name:"Cyber Neon", dot:"bg-white border-t-2 border-blue-500" },
 { id:"neo-mint", name:"Forest Mint", dot:"bg-white border-t-2 border-blue-500" },
 { id:"neo-sunset", name:"Sunset Rose", dot:"bg-white border-t-2 border-blue-500" },
 ];

 const menuItems = [
 { id:"home", label:"Home" },
 { id:"about", label:"About" },
 { id:"services", label:"Services" },
 { id:"student_dropdown", label:"Student" },
 { id:"portfolio", label:"Portfolio" },
 { id:"gallery", label:"Gallery" },
 { id:"stories", label:"Stories" },
 { id:"faq", label:"FAQ" },
 { id:"contact", label:"Contact" },
 { id:"review", label:"Reviews" },
 ...(isAuthenticated && (isAdmin || isManager) ? [{ id:"admin", label:"Dashboard" }] : []),
 ...(isAuthenticated && !(isAdmin || isManager) ? [{ id:"portal", label:"Portal" }] : []),
 ...(!isAuthenticated ? [{ id:"login", label:"Sign In" }] : []),
 ];

 const handleNavClick = (viewId) => {
 setActiveView(viewId);
 setMobileMenuOpen(false);
 window.scrollTo({ top: 0, behavior:"smooth" });
 };

 return (
 <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 transition-all duration-300">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 {/* Logo / Brand */}
 <div
 onClick={() => handleNavClick("home")}
 className="flex items-center gap-2 cursor-pointer group"
 id="nav-logo"
 >
 <div className="flex flex-col">
 <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
 arsha<span className="text-blue-500">freelancers</span>
 </span>
 </div>
 </div>

 {/* Desktop Navigation Items */}
 <div className="hidden xl:flex items-center gap-6">
 {menuItems.map((item) => {
 if (item.id ==="student_dropdown") {
 const isStudentActive = studentItems.some((s) => s.id === activeView);
 return (
 <div 
 key={item.id} 
 className="relative group"
 onMouseEnter={() => setStudentDropdownOpen(true)}
 onMouseLeave={() => setStudentDropdownOpen(false)}
 >
 <button
 onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
 className={`flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer ${
 isStudentActive || studentDropdownOpen
 ?"text-blue-500"
 :"text-slate-700 hover:text-blue-500"
 }`}
 >
 {item.label}
 <ChevronDown className={`w-3 h-3 transition-transform ${studentDropdownOpen ?"rotate-180" :""}`} />
 </button>
 
 <AnimatePresence>
 {studentDropdownOpen && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 10 }}
 transition={{ duration: 0.15 }}
 className="absolute left-0 mt-2 w-56 bg-white rounded border border-slate-200 py-2 z-50 shadow-lg"
 >
 {studentItems.map((subItem) => {
 const isSubActive = activeView === subItem.id;
 return (
 <button
 key={subItem.id}
 onClick={() => {
 handleNavClick(subItem.id);
 setStudentDropdownOpen(false);
 }}
 className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
 isSubActive
 ?"bg-slate-50 text-blue-500"
 :"text-slate-700 hover:bg-slate-50 hover:text-blue-500"
 }`}
 >
 {subItem.label}
 </button>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 }

 const isActive = activeView === item.id;
 return (
 <button
 key={item.id}
 id={`nav-item-${item.id}`}
 onClick={() => handleNavClick(item.id)}
 className={`text-sm font-semibold transition-colors cursor-pointer ${
 isActive
 ?"text-blue-500"
 :"text-slate-700 hover:text-blue-500"
 }`}
 >
 {item.label}
 </button>
 );
 })}
 </div>

 {/* Right Action Controls */}
 <div className="hidden md:flex items-center gap-4">
 <a
 href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+want+to+inquire+about+academic+project+services+and+pricing."
 target="_blank"
 rel="noreferrer"
 className="text-sm font-semibold text-slate-700 hover:text-blue-500 transition-colors"
 >
 Log In
 </a>

 <button
 onClick={onGetQuoteClick}
 className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold rounded transition-colors shadow-sm cursor-pointer whitespace-nowrap"
 >
 Post a Project
 </button>
 </div>

 {/* Mobile Menu Toggle */}
 <div className="flex xl:hidden items-center gap-3">
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="text-slate-700 hover:text-blue-500"
 >
 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>
 </div>
 </div>

 {/* Mobile Menu Panel */}
 <AnimatePresence>
 {mobileMenuOpen && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height:"auto" }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.2 }}
 className="xl:hidden bg-white border-t border-slate-200"
 >
 <div className="px-4 py-4 space-y-1">
 {menuItems.map((item) => {
 if (item.id ==="student_dropdown") {
 return (
 <div key={item.id} className="py-2">
 <div className="text-xs font-bold uppercase text-slate-400 mb-2 px-3">Student</div>
 {studentItems.map((subItem) => (
 <button
 key={subItem.id}
 onClick={() => handleNavClick(subItem.id)}
 className="block w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
 >
 {subItem.label}
 </button>
 ))}
 </div>
 );
 }

 const isActive = activeView === item.id;
 return (
 <button
 key={item.id}
 onClick={() => handleNavClick(item.id)}
 className={`block w-full text-left px-3 py-2 text-sm font-medium rounded ${
 isActive ?"bg-slate-50 text-blue-500" :"text-slate-700 hover:bg-slate-50"
 }`}
 >
 {item.label}
 </button>
 );
 })}
 <div className="pt-4 mt-4 border-t border-slate-200">
 <button
 onClick={() => {
 setMobileMenuOpen(false);
 onGetQuoteClick();
 }}
 className="w-full py-2.5 bg-pink-600 text-white font-bold text-sm rounded shadow-sm"
 >
 Post a Project
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </nav>
 );
}
