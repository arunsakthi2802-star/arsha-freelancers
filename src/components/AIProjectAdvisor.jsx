import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, Filter, Sparkles, Flame, Star, Clock, BookOpen, Microscope, ArrowRight, Zap, Info, Send, User, Bot, Minus, X, Maximize2, MessageSquare } from "lucide-react";
import { studentProjects } from "../data/projects";
import AIAdvisorDetailsModal from "./AIAdvisorDetailsModal";

export default function AIProjectAdvisor() {
  // Chat state
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your AI Project Advisor. Tell me what kind of project you're looking for, and I'll suggest the best matches. (e.g., 'I want a Python project on healthcare', 'Beginner React apps')",
      projects: []
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Filters state
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProject, setSelectedProject] = useState(null);

  // Layout states for mobile minimize/cancel
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isChatClosed, setIsChatClosed] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Extract unique filter options
  const allDepts = ["All", ...Array.from(new Set(studentProjects.map(p => p.department)))].sort();
  const allTechs = ["All", ...Array.from(new Set(studentProjects.flatMap(p => p.technology)))].sort();
  const allCategories = ["All", ...Array.from(new Set(studentProjects.map(p => p.category)))].sort();

  // Handle Chat Submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQuery = chatInput.trim();
    const newUserMsg = { id: Date.now(), sender: "user", text: userQuery };
    
    setChatHistory(prev => [...prev, newUserMsg]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI processing & project matching
    setTimeout(() => {
      const keywords = userQuery.toLowerCase().split(" ").filter(w => w.length > 2);
      
      let matches = studentProjects.filter(p => {
        const targetStr = `${p.title} ${p.category} ${p.technology.join(" ")} ${p.description}`.toLowerCase();
        return keywords.some(k => targetStr.includes(k));
      });

      // Sort by innovation score to surface best projects first
      matches = matches.sort((a, b) => parseFloat(b.innovationScore) - parseFloat(a.innovationScore)).slice(0, 10);

      let aiResponseText = "";
      if (matches.length > 0) {
        aiResponseText = `I found some highly relevant projects based on your query! Check these out:`;
      } else {
        aiResponseText = `I couldn't find exact matches for that, but here are some top trending projects you might like:`;
        matches = studentProjects.slice(10, 20); // Trending fallback
      }

      const newAiMsg = { id: Date.now() + 1, sender: "ai", text: aiResponseText, projects: matches };
      setChatHistory(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 400);
  };

  // Check if any filter is active
  const isFiltering = selectedDept !== "All" || selectedTech !== "All" || selectedDifficulty !== "All" || selectedCategory !== "All";

  // Filtered Projects List
  const filteredProjects = useMemo(() => {
    if (!isFiltering) return [];
    
    return studentProjects.filter(p => {
      const matchDept = selectedDept === "All" || p.department === selectedDept;
      const matchTech = selectedTech === "All" || p.technology.includes(selectedTech);
      const matchDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      
      return matchDept && matchTech && matchDiff && matchCat;
    });
  }, [selectedDept, selectedTech, selectedDifficulty, selectedCategory, isFiltering]);

  // Homepage Sections (Randomized based on length to look dynamic but deterministic enough)
  const trendingProjects = studentProjects.slice(10, 14);
  const recommendedProjects = studentProjects.slice(25, 29);
  const newlyAdded = [...studentProjects].reverse().slice(0, 4);
  const beginnerFriendly = studentProjects.filter(p => p.difficulty === 'Beginner').slice(0, 4);
  const researchProjects = studentProjects.filter(p => p.difficulty === 'Advanced').slice(0, 4);

  // Reusable Project Card Component
  const ProjectCard = ({ project, layout = "grid" }) => (
    <div className={`bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all cursor-default group ${layout === 'horizontal' ? 'min-w-[240px] w-[240px] sm:min-w-[280px] sm:w-[280px] flex-shrink-0' : 'w-full'}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-black uppercase px-2 py-1 bg-neo-cyan text-slate-900 rounded-lg border border-slate-900">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Zap className="w-3 h-3 text-neo-yellow fill-neo-yellow" />
            {project.innovationScore}
          </span>
        </div>
        
        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight line-clamp-2">
          {project.title}
        </h3>

        {layout !== 'horizontal' && (
          <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            {project.summary && project.summary.map((line, i) => (
              <p key={i} className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{line}</span>
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technology.slice(0, 3).map(tech => (
            <span key={tech} className="text-[9px] font-bold px-2 py-1 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md">
              {tech}
            </span>
          ))}
          {project.technology.length > 3 && (
            <span className="text-[9px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md border border-slate-200 dark:border-slate-700">
              +{project.technology.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Duration</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{project.duration}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Difficulty</span>
          <span className={`text-xs font-bold ${project.difficulty === 'Advanced' ? 'text-rose-500' : project.difficulty === 'Beginner' ? 'text-emerald-500' : 'text-blue-500'}`}>
            {project.difficulty}
          </span>
        </div>
      </div>

      <button 
        onClick={() => setSelectedProject(project)}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 border border-blue-800 shadow-[2px_2px_0px_0px_rgba(30,58,138,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
      >
        View Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 pt-4 px-4 sm:px-6 lg:px-8">
      
      {/* Reopen Chat Button if closed */}
      {isChatClosed && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setIsChatClosed(false)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-bold text-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" /> Open AI Advisor
          </button>
        </div>
      )}

      {/* Interactive Chat Hero Section */}
      {!isChatClosed && (
        <div className={`bg-slate-900 dark:bg-slate-950 rounded-3xl p-4 sm:p-8 relative overflow-hidden border-2 border-slate-800 shadow-xl flex flex-col transition-all duration-300 ${isChatMinimized ? 'h-24 sm:h-28' : 'h-[calc(100vh-120px)] min-h-[600px] max-h-[900px]'}`}>
          {/* Background elements */}
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="w-64 h-64 text-blue-400" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">AI Project Advisor Chat</h1>
                  {!isChatMinimized && <p className="text-[10px] sm:text-xs text-slate-400 font-bold hidden sm:block">Ask for project recommendations</p>}
                </div>
              </div>
              
              {/* Window Controls (Minimize/Maximize, Close) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsChatMinimized(!isChatMinimized)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                  title={isChatMinimized ? "Maximize Chat" : "Minimize Chat"}
                >
                  {isChatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsChatClosed(true)}
                  className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            {!isChatMinimized && (
              <>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2 sm:pr-4 mb-4 sm:mb-6">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[95%] sm:max-w-[85%] gap-2 sm:gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-neo-cyan text-slate-900' : 'bg-blue-600 text-white'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className="flex flex-col gap-2">
                    <div className={`px-4 py-3 rounded-2xl text-sm font-medium ${msg.sender === 'user' ? 'bg-neo-cyan text-slate-900 rounded-tr-none' : 'bg-slate-800 text-white border border-slate-700 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    
                    {/* Project Recommendations Array inside Chat */}
                    {msg.projects && msg.projects.length > 0 && (
                      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 custom-scrollbar max-w-[85vw] sm:max-w-[600px]">
                        {msg.projects.map(p => (
                          <ProjectCard key={p.id} project={p} layout="horizontal" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="flex max-w-[95%] sm:max-w-[85%] gap-2 sm:gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-slate-800 text-white border border-slate-700 rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Area */}
              <form onSubmit={handleChatSubmit} className="relative mt-auto">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="E.g., I want an IoT project for smart agriculture..."
                  className="w-full bg-slate-800/80 backdrop-blur text-white pl-4 sm:pl-6 pr-14 sm:pr-16 py-3 sm:py-4 rounded-2xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold shadow-xl transition-all text-xs sm:text-sm"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 p-2 sm:p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
            )}
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-900 dark:border-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-black text-sm uppercase tracking-wider">Manual Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
            {allDepts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
          </select>
          <select value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
            {allTechs.map(t => <option key={t} value={t}>{t === 'All' ? 'All Technologies' : t}</option>)}
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
            {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced (Research)</option>
          </select>
        </div>
      </div>

      {/* Dynamic Content Area */}
      {isFiltering ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Filtered Results ({filteredProjects.length})</h2>
            <button 
              onClick={() => { setSelectedDept('All'); setSelectedTech('All'); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.slice(0, 20).map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">No projects found</h3>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your filters to broaden the search.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-16">
          
          {/* 🔥 Trending Projects */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Trending Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingProjects.map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
            </div>
          </section>

          {/* ⭐ Recommended Projects */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recommended Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedProjects.map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
            </div>
          </section>

          {/* 🆕 Newly Added */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Newly Added</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newlyAdded.map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
            </div>
          </section>

          {/* 🎓 Beginner Friendly */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Beginner Friendly</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {beginnerFriendly.map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
            </div>
          </section>

          {/* 🚀 Research Projects */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <Microscope className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Research Projects (Publication Ready)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {researchProjects.map(project => <ProjectCard key={project.id} project={project} layout="grid" />)}
            </div>
          </section>

          {/* 📚 Browse by Category */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {allCategories.filter(c => c !== 'All').slice(0, 12).map(cat => (
                <button 
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    window.scrollTo({ top: 700, behavior: 'smooth' });
                  }}
                  className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 hover:shadow-[2px_2px_0px_0px_rgba(37,99,235,1)] transition-all text-left flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
                >
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200">{cat}</span>
                </button>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* Details Modal */}
      {selectedProject && (
        <AIAdvisorDetailsModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onSelectSimilar={(p) => {
            setSelectedProject(p);
          }}
        />
      )}
    </div>
  );
}
