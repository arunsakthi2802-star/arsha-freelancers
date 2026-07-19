import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Filter, BookOpen, Send, Check, Upload, Calendar, User, Phone,
  Mail, BrainCircuit, MessageCircle, Sparkles, Terminal, Info, Download
} from "lucide-react";
import { studentProjects, departmentSuggestions } from "../data/projects";
import { fadeUp, staggerContainer, hoverCard } from "../utils/animations";

export const domainsList = [
  "All", "Web App", "Mobile App", "IoT", "Cybersecurity", "AI & ML",
];

export const getProjectDomain = (project) => {
  const titleLower = project.title.toLowerCase();
  const descLower = project.description.toLowerCase();
  const categoryLower = project.category.toLowerCase();
  const techLower = project.technology.map((t) => t.toLowerCase());

  if (
    categoryLower.includes("iot") || titleLower.includes("iot") ||
    techLower.includes("arduino") || techLower.includes("raspberry pi") ||
    techLower.includes("mqtt") || descLower.includes("sensor") ||
    descLower.includes("hardware")
  ) {
    return "IoT";
  }

  if (
    categoryLower.includes("security") || categoryLower.includes("cybersecurity") ||
    categoryLower.includes("cryptography") || titleLower.includes("forensics") ||
    titleLower.includes("phishing") || titleLower.includes("threat") ||
    titleLower.includes("intrusion") || descLower.includes("cryptography") ||
    descLower.includes("sniffs") || descLower.includes("phishing") ||
    descLower.includes("intrusion") || descLower.includes("cyber threat")
  ) {
    return "Cybersecurity";
  }

  if (
    categoryLower.includes("android") || categoryLower.includes("ios") ||
    techLower.includes("flutter") || techLower.includes("react native") ||
    techLower.includes("dart") || titleLower.includes("mobile app") ||
    descLower.includes("mobile app") || descLower.includes("flutter app")
  ) {
    return "Mobile App";
  }

  if (
    categoryLower.includes("artificial intelligence") || categoryLower.includes("machine learning") ||
    categoryLower.includes("data science") || titleLower.includes("ai-powered") ||
    titleLower.includes("predictive") || descLower.includes("face recognition") ||
    descLower.includes("nlp") || descLower.includes("machine learning") ||
    descLower.includes("classification") || descLower.includes("analytics")
  ) {
    return "AI & ML";
  }

  return "Web App";
};

export default function ProjectsView({
  onNavigate,
  openDetailsModal,
  preselectedDept = "All",
  defaultTab = "advisor",
}) {
  const getDeptColorClass = (dept) => {
    switch (dept) {
      case "CS":
      case "CSE":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "IT":
      case "Cybersecurity":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "MCA":
      case "BCA":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "AI&DS":
      case "AI&ML":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
      case "ECE":
      case "EEE":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "CSBS":
      case "MBA":
        return "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debounceTimer = useRef(null);
  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    setSearchInput(val);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setSearch(val), 300);
  }, []);

  const [selectedDept, setSelectedDept] = useState(preselectedDept);
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    department: "CS",
    academicYear: "Final Year",
    phone: "",
    email: "",
    title: "",
    technology: "Python",
    description: "",
    expectedDate: "",
  });
  const [fileAttached, setFileAttached] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const libraryRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (preselectedDept && preselectedDept !== "All") {
      setSelectedDept(preselectedDept);
    }
  }, [preselectedDept]);

  const allTechnologies = ["All", ...Array.from(new Set(studentProjects.flatMap((p) => p.technology)))].sort();
  const allDepartments = ["All", ...Array.from(new Set(studentProjects.map((p) => p.department).filter(Boolean)))].sort((a, b) => a.localeCompare(b));
  const allCategories = ["All", ...Array.from(new Set(studentProjects.map((p) => p.category).filter(Boolean)))].sort();
  const allDurations = ["All", ...Array.from(new Set(studentProjects.map((p) => p.duration).filter(Boolean)))].sort((a, b) => a.localeCompare(b));

  const { filteredProjects, sortedProjects } = useMemo(() => {
    const filtered = studentProjects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technology.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchDept = selectedDept === "All" || p.department === selectedDept;
      const matchTech = selectedTech === "All" || p.technology.includes(selectedTech);
      const matchDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchDomain = selectedDomain === "All" || getProjectDomain(p) === selectedDomain;
      const matchDuration = selectedDuration === "All" || p.duration === selectedDuration;
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;

      return (
        matchSearch && matchDept && matchTech && matchDifficulty &&
        matchDomain && matchDuration && matchCategory
      );
    });

    const getDifficultyScore = (diff) => {
      switch (diff) {
        case "Advanced": return 3;
        case "Intermediate": return 2;
        case "Beginner": return 1;
        default: return 0;
      }
    };

    const getDurationWeeks = (dur) => {
      const match = dur.match(/\d+/);
      return match ? parseInt(match[0], 10) : 99;
    };

    const getPopularityScore = (p) => {
      const idNum = parseInt(p.id.replace("PRJ-", ""), 10) || 1;
      return p.features.length * 15 + (p.title.length % 7) * 4 + idNum * 2;
    };

    const sorted = [...filtered].sort((a, b) => {
      if (selectedSort === "ComplexityDesc") return getDifficultyScore(b.difficulty) - getDifficultyScore(a.difficulty);
      if (selectedSort === "ComplexityAsc") return getDifficultyScore(a.difficulty) - getDifficultyScore(b.difficulty);
      if (selectedSort === "DurationAsc") return getDurationWeeks(a.duration) - getDurationWeeks(b.duration);
      if (selectedSort === "DurationDesc") return getDurationWeeks(b.duration) - getDurationWeeks(a.duration);
      if (selectedSort === "PopularityDesc" || selectedSort === "Popular") return getPopularityScore(b) - getPopularityScore(a);
      if (selectedSort === "Trending") return b.description.length - a.description.length;
      return b.id.localeCompare(a.id);
    });

    return { filteredProjects: filtered, sortedProjects: sorted };
  }, [search, selectedDept, selectedTech, selectedDifficulty, selectedDomain, selectedDuration, selectedCategory, selectedSort]);

  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    setVisibleCount(30);
  }, [search, selectedCategory, selectedDept, selectedDomain, selectedTech, selectedDifficulty, selectedDuration, selectedSort]);

  const paginatedProjects = sortedProjects.slice(0, visibleCount);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedProjects.length) {
          setVisibleCount((prev) => prev + 30);
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [visibleCount, sortedProjects.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileAttached(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttached(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = `*New Custom Project Idea*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*College:* ${formData.college} (${formData.department} - ${formData.academicYear})\n*Project Title:* ${formData.title}\n*Technology:* ${formData.technology}\n*Deadline:* ${formData.expectedDate}\n*Details:* ${formData.description}`;
    const whatsappUrl = `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "", college: "", department: "CS", academicYear: "Final Year",
        phone: "", email: "", title: "", technology: "Python",
        description: "", expectedDate: "",
      });
      setFileAttached(null);
      setFormSubmitted(false);
    }, 4000);
  };

  const handleSuggestionClick = (suggestedTitle) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestedTitle,
      description: `I am interested in building the suggested project: "${suggestedTitle}". I would like help with database setups, system workflow diagrams, clean source code, and full project report documentation.`,
    }));
    setActiveTab("submit");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSelectCard = (project) => {
    setFormData((prev) => ({
      ...prev,
      title: project.title,
      technology: project.technology[0] || "Python",
      department: project.department,
      description: `I want to select project ID ${project.id}: "${project.title}". Please share the source files, project architecture diagrams, slide details, and standard pricing.`,
    }));
    setActiveTab("submit");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleRequestDemo = (project) => {
    const text = `Hi Arsha! I want to request a video demonstration or execution screenshots of the project: *[${project.id}] ${project.title}*. Could you please send me details?`;
    window.open(`https://wa.me/918300799120?text=${encodeURIComponent(text)}`, "_blank");
  };

  const activeSuggestions = departmentSuggestions[formData.department] || departmentSuggestions["CS"];

  const studentBenefits = [
    { title: "Original Source Code", desc: "Clean, commented, raw code files with no locked or encrypted scripts." },
    { title: "Professional Documentation", desc: "60-120 page detailed thesis complying strictly to your university criteria." },
    { title: "PowerPoint Slides Included", desc: "Complete presentation slide files paired with detailed speaker notes." },
    { title: "Viva Voce Preparation", desc: "One-to-one coaching calls clearing every single code line doubt before exams." },
    { title: "Affordable Pricing", desc: "Extremely pocket-friendly plans designed specifically for students." },
    { title: "University Format Layouts", desc: "Standard margins, exact fonts, appropriate tables, and bibliography citations." },
    { title: "One-to-One Technical Support", desc: "Live support on Call/WhatsApp up until you successfully complete final evaluations." },
  ];

  const baseInputClasses = `w-full px-4 py-3 rounded-xl text-sm transition-colors border outline-none ${
    'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-white placeholder-gray-400 dark:bg-gray-900/50 dark:border-gray-800 dark:text-white dark:focus:border-blue-500/50 dark:focus:bg-gray-900 dark:placeholder-gray-600'
  }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24 pt-32 text-left">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            The Project Hub
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Explore Outstanding Student Projects
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-500 dark:text-gray-400"
        >
          Browse our professionally curated library of final year concepts, or
          share your own raw requirements for a bespoke high-grade software
          solution built by our expert team.
        </motion.p>
      </section>

      {/* VIEW SELECTOR SWITCH */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "library"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Project Library Database
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "submit"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Submit Custom Idea
          </button>
        </div>
      </div>

      {/* TAB 1: PROJECT LIBRARY */}
      {activeTab === "library" && (
        <div ref={libraryRef} className="space-y-12 scroll-mt-32">
          
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="p-6 md:p-8 rounded-3xl border bg-white border-gray-100 shadow-sm dark:bg-gray-900/50 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                <Filter className="w-5 h-5 text-blue-500" />
                Library Filters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search titles, keywords..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className={`${baseInputClasses} pl-10`}
                />
              </div>

              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={baseInputClasses}>
                <option value="All">All Categories</option>
                {allCategories.filter((c) => c !== "All").map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className={baseInputClasses}>
                <option value="All">All Departments</option>
                {allDepartments.filter((d) => d !== "All").map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>

              <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)} className={baseInputClasses}>
                <option value="All">All Domains</option>
                {domainsList.filter(d=>d!=="All").map(d=><option key={d} value={d}>{d}</option>)}
              </select>

              <select value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)} className={baseInputClasses}>
                <option value="All">All Technologies</option>
                {allTechnologies.filter((t) => t !== "All").map((tech) => <option key={tech} value={tech}>{tech}</option>)}
              </select>

              <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className={baseInputClasses}>
                <option value="All">All Complexities</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className={baseInputClasses}>
                <option value="All">All Durations</option>
                {allDurations.filter((d) => d !== "All").map((dur) => <option key={dur} value={dur}>{dur}</option>)}
              </select>

              <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className={baseInputClasses}>
                <option value="Latest">Latest Projects</option>
                <option value="ComplexityDesc">Complexity (High to Low)</option>
                <option value="ComplexityAsc">Complexity (Low to High)</option>
                <option value="DurationAsc">Delivery Time (Shortest First)</option>
                <option value="DurationDesc">Delivery Time (Longest First)</option>
                <option value="PopularityDesc">Popularity (Highest First)</option>
              </select>
            </div>
          </div>

          {/* PROJECT LISTINGS */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedProjects.map((project) => {
                const deptColor = getDeptColorClass(project.department);
                return (
                  <motion.div
                    layout
                    variants={fadeUp}
                    whileHover="hover"
                    key={project.id}
                    className="flex flex-col justify-between p-6 rounded-2xl border transition-colors bg-white border-gray-100 hover:border-gray-200 shadow-sm dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-gray-700"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                        <span className={`text-xs font-mono font-bold px-2 py-1 rounded-md ${deptColor}`}>
                          {project.id}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${deptColor}`}>
                          {project.department}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight leading-tight line-clamp-2 text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-3 text-gray-500 dark:text-gray-400">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technology.map((tech) => (
                          <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-md border bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-4 text-xs font-medium p-4 rounded-xl bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                        <div>
                          <span className="block mb-1 opacity-70">Difficulty</span>
                          <span className="text-blue-500">{project.difficulty}</span>
                        </div>
                        <div>
                          <span className="block mb-1 opacity-70">Duration</span>
                          <span className="text-gray-700 dark:text-gray-300">{project.duration}</span>
                        </div>
                        <div className="pt-2">
                          <span className="block mb-1 opacity-70">Domain</span>
                          <span className="text-emerald-500">{getProjectDomain(project)}</span>
                        </div>
                        <div className="pt-2">
                          <span className="block mb-1 opacity-70">Category</span>
                          <span className="text-purple-500">{project.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => openDetailsModal(project)}
                        className="w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                      >
                        View Details
                        <Info className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleRequestDemo(project)}
                          className="px-3 py-2.5 text-xs font-medium rounded-xl text-center border transition-colors border-gray-200 hover:bg-gray-50 text-gray-600 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                        >
                          Request Demo
                        </button>
                        <button
                          onClick={() => handleSelectCard(project)}
                          className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl text-center transition-colors shadow-sm"
                        >
                          Select Project
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {sortedProjects.length === 0 && (
              <div className="col-span-full text-center py-16">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">No Projects Found</h4>
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
                <button
                  onClick={() => {
                    setSearch(""); setSelectedDept("All"); setSelectedTech("All");
                    setSelectedDomain("All"); setSelectedDifficulty("All"); setSelectedSort("Latest");
                  }}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {visibleCount < sortedProjects.length && (
            <div ref={observerRef} className="h-20 flex items-center justify-center">
              <span className="text-sm font-medium animate-pulse text-gray-400 dark:text-gray-500">
                Loading more projects...
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUBMIT YOUR OWN PROJECT IDEA FORM */}
      {activeTab === "submit" && (
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-32">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl border relative overflow-hidden bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-32 h-32 text-blue-500" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-xl shadow-sm shadow-blue-600/20">
                    <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm tracking-wide uppercase text-blue-700 dark:text-blue-400">
                    AI Recommender
                  </h3>
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                    Need an idea?
                  </h4>
                  <p className="text-sm leading-relaxed text-blue-900/70 dark:text-blue-200/70">
                    Change the "Department" in the form to see tailored project proposals instantly.
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-blue-200/30 dark:border-blue-800/30">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-800/50 dark:text-blue-300/50">
                    Recommended for {formData.department}:
                  </p>
                  <div className="space-y-3">
                    {activeSuggestions.map((title, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(title)}
                        className="w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-3 group cursor-pointer border bg-white border-gray-200 hover:border-blue-300 text-gray-700 hover:text-gray-900 shadow-sm dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-blue-500/50 dark:text-gray-300 dark:hover:text-white"
                      >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors bg-gray-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-gray-800 dark:text-blue-400">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border relative overflow-hidden bg-white border-gray-100 shadow-sm dark:bg-gray-900/50 dark:border-gray-800">
              
              {formSubmitted && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-8 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-4xl mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Idea Received Successfully!
                  </h3>
                  <p className="text-base max-w-md mx-auto leading-relaxed text-gray-500 dark:text-gray-400">
                    Thank you, <span className="font-semibold text-gray-900 dark:text-white">{formData.name || "Scholar"}</span>! 
                    We will review your requirements and reach out to <span className="font-semibold text-gray-900 dark:text-white">{formData.phone}</span> shortly.
                  </p>
                </div>
              )}

              <h3 className="text-2xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white">
                Project Requirements
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Full Name *</label>
                    <input type="text" name="name" required placeholder="e.g. John Doe" value={formData.name} onChange={handleInputChange} className={baseInputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">College Name *</label>
                    <input type="text" name="college" required placeholder="e.g. MIT" value={formData.college} onChange={handleInputChange} className={baseInputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Department *</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} className={baseInputClasses}>
                      {allDepartments.filter(d=>d!=='All').map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Academic Year *</label>
                    <select name="academicYear" value={formData.academicYear} onChange={handleInputChange} className={baseInputClasses}>
                      <option value="Final Year">Final Year Student</option>
                      <option value="Pre-Final Year">Pre-Final Year</option>
                      <option value="1st Year">1st Year Postgraduate</option>
                      <option value="M.Tech/Research">M.Tech / Research Scholar</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">WhatsApp Number *</label>
                    <input type="tel" name="phone" required placeholder="e.g. 8300799120" value={formData.phone} onChange={handleInputChange} className={baseInputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Email Address *</label>
                    <input type="email" name="email" required placeholder="name@domain.com" value={formData.email} onChange={handleInputChange} className={baseInputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Project Title *</label>
                    <input type="text" name="title" required placeholder="AI Translation System" value={formData.title} onChange={handleInputChange} className={baseInputClasses} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Preferred Stack *</label>
                    <select name="technology" value={formData.technology} onChange={handleInputChange} className={baseInputClasses}>
                      <option value="Python">Python / Machine Learning</option>
                      <option value="Java">Java / Spring Boot / Android</option>
                      <option value="React">React / Node (MERN)</option>
                      <option value="Flutter">Flutter / Dart</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Project Details *</label>
                  <textarea name="description" required rows={4} placeholder="Describe requirements, modules, or references..." value={formData.description} onChange={handleInputChange} className={baseInputClasses}></textarea>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Submission Date *</label>
                  <input type="date" name="expectedDate" required value={formData.expectedDate} onChange={handleInputChange} className={baseInputClasses} />
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CORE BENEFITS CHECKLIST */}
      <section className="p-8 md:p-12 rounded-3xl border bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
        <div className="text-center space-y-3 mb-12">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Arsha Standard
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Why scholars choose our solutions for their final deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentBenefits.slice(0, 4).map((benefit, idx) => (
            <div key={idx} className="p-6 rounded-2xl border transition-colors bg-white border-gray-100 shadow-sm dark:bg-gray-800/50 dark:border-gray-700">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{benefit.title}</h4>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
