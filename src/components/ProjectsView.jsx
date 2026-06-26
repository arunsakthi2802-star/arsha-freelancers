import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Send,
  Check,
  Upload,
  Calendar,
  User,
  Phone,
  Mail,
  BrainCircuit,
  MessageCircle,
  Sparkles,
  Terminal,
  Info,
  Download,
} from "lucide-react";
import { studentProjects, departmentSuggestions } from "../data/projects";

export const domainsList = [
  "All",
  "Web App",
  "Mobile App",
  "IoT",
  "Cybersecurity",
  "AI & ML",
];

export const getProjectDomain = (project) => {
  const titleLower = project.title.toLowerCase();
  const descLower = project.description.toLowerCase();
  const categoryLower = project.category.toLowerCase();
  const techLower = project.technology.map((t) => t.toLowerCase());

  // IoT
  if (
    categoryLower.includes("iot") ||
    titleLower.includes("iot") ||
    techLower.includes("arduino") ||
    techLower.includes("raspberry pi") ||
    techLower.includes("mqtt") ||
    descLower.includes("sensor") ||
    descLower.includes("hardware")
  ) {
    return "IoT";
  }

  // Cybersecurity
  if (
    categoryLower.includes("security") ||
    categoryLower.includes("cybersecurity") ||
    categoryLower.includes("cryptography") ||
    titleLower.includes("forensics") ||
    titleLower.includes("phishing") ||
    titleLower.includes("threat") ||
    titleLower.includes("intrusion") ||
    descLower.includes("cryptography") ||
    descLower.includes("sniffs") ||
    descLower.includes("phishing") ||
    descLower.includes("intrusion") ||
    descLower.includes("cyber threat")
  ) {
    return "Cybersecurity";
  }

  // Mobile App
  if (
    categoryLower.includes("android") ||
    categoryLower.includes("ios") ||
    techLower.includes("flutter") ||
    techLower.includes("react native") ||
    techLower.includes("dart") ||
    titleLower.includes("mobile app") ||
    descLower.includes("mobile app") ||
    descLower.includes("flutter app")
  ) {
    return "Mobile App";
  }

  // AI & ML
  if (
    categoryLower.includes("artificial intelligence") ||
    categoryLower.includes("machine learning") ||
    categoryLower.includes("data science") ||
    titleLower.includes("ai-powered") ||
    titleLower.includes("predictive") ||
    descLower.includes("face recognition") ||
    descLower.includes("nlp") ||
    descLower.includes("machine learning") ||
    descLower.includes("classification") ||
    descLower.includes("analytics")
  ) {
    return "AI & ML";
  }

  // Web App
  return "Web App";
};

export default function ProjectsView({
  onNavigate,
  openDetailsModal,
  preselectedDept = "All",
}) {
  // Department color helper
  const getDeptColorClass = (dept) => {
    switch (dept) {
      case "CS":
      case "CSE":
        return "bg-neo-yellow text-slate-950 border border-slate-950";
      case "IT":
      case "Cybersecurity":
        return "bg-neo-cyan text-slate-950 border border-slate-950";
      case "MCA":
      case "BCA":
        return "bg-neo-purple text-slate-950 border border-slate-950";
      case "AI&DS":
      case "AI&ML":
        return "bg-neo-pink text-slate-950 border border-slate-950";
      case "ECE":
      case "EEE":
        return "bg-neo-orange text-slate-950 border border-slate-950";
      case "CSBS":
      case "MBA":
        return "bg-neo-lime text-slate-950 border border-slate-950";
      default:
        return "bg-neo-blue text-slate-950 border border-slate-950";
    }
  };

  // Navigation / View Tabs inside Projects
  const [activeTab, setActiveTab] = useState("library");

  // Library States
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState(preselectedDept);
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");

  // Form states
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

  // Sync preselected department from parent if updated
  useEffect(() => {
    if (preselectedDept && preselectedDept !== "All") {
      setSelectedDept(preselectedDept);
    }
  }, [preselectedDept]);

  // Unique list of technologies from project database for the filter dropdown
  const allTechnologies = [
    "All",
    ...Array.from(new Set(studentProjects.flatMap((p) => p.technology))),
  ].sort();

  const allDepartments = [
    "All",
    ...Array.from(new Set(studentProjects.map((p) => p.department).filter(Boolean))),
  ].sort((a, b) => a.localeCompare(b));

  const allCategories = [
    "All",
    ...Array.from(new Set(studentProjects.map((p) => p.category).filter(Boolean))),
  ].sort();

  const allDurations = [
    "All",
    ...Array.from(new Set(studentProjects.map((p) => p.duration).filter(Boolean))),
  ].sort((a, b) => a.localeCompare(b));

  // Filter & Sort Logic
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

  // Reset visible count when filters change
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

  // Form Submission
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
      // Clear form except basic metadata
      setFormData({
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
      setFileAttached(null);
      setFormSubmitted(false);
    }, 4000);
  };

  // Pre-fill submission form from AI recommendation click
  const handleSuggestionClick = (suggestedTitle) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestedTitle,
      description: `I am interested in building the suggested project: "${suggestedTitle}". I would like help with database setups, system workflow diagrams, clean source code, and full project report documentation.`,
    }));
    setActiveTab("submit");
    // Scroll smoothly to form section
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Pre-fill form from card click "Select Project"

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

  // WhatsApp helper for single card Demo
  const handleRequestDemo = (project) => {
    const text = `Hi Arsha! I want to request a video demonstration or execution screenshots of the project: *[${project.id}] ${project.title}*. Could you please send me details?`;
    window.open(
      `https://wa.me/918300799120?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  // AI Project Suggestions depending on Selected Department
  const activeSuggestions =
    departmentSuggestions[formData.department] || departmentSuggestions["CS"];

  const studentBenefits = [
    {
      title: "Original Source Code",
      desc: "Clean, commented, raw code files with no locked or encrypted scripts.",
    },
    {
      title: "Professional Documentation",
      desc: "60-120 page detailed thesis complying strictly to your university criteria.",
    },
    {
      title: "PowerPoint Slides Included",
      desc: "Complete presentation slide files paired with detailed speaker notes.",
    },
    {
      title: "Viva Voce Preparation",
      desc: "One-to-one coaching calls clearing every single code line doubt before exams.",
    },
    {
      title: "Affordable Pricing",
      desc: "Extremely pocket-friendly plans designed specifically for students.",
    },
    {
      title: "University Format Layouts",
      desc: "Standard margins, exact fonts, appropriate tables, and bibliography citations.",
    },
    {
      title: "One-to-One Technical Support",
      desc: "Live support on Call/WhatsApp up until you successfully complete final evaluations.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8 text-left">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-950 bg-neo-yellow px-3 py-1.5 rounded-full brutalist-border-sm">
          The Project Hub
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Explore Outstanding Student Projects & Custom Ideas
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Browse our professionally curated library of final year concepts, or
          share your own raw requirements for a bespoke high-grade software
          solution built by our expert team.
        </p>

        {/* Dynamic Dual Choice CTA Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
          {/* Card Option 1 */}
          <div className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-2xl">📚</div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Option 1: Browse Our Project Library
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Explore dozens of pre-coded, highly optimized, and viva-ready
                student projects across Python, Machine Learning, Java, Web, and
                Cybersecurity.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab("library");
                setTimeout(
                  () =>
                    libraryRef.current?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
              className="mt-6 px-4 py-2.5 bg-neo-purple text-slate-950 font-extrabold text-xs rounded-xl brutalist-border-sm text-center cursor-pointer"
            >
              Browse Ready Projects
            </button>
          </div>

          {/* Card Option 2 */}
          <div className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-2xl">🧠</div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Option 2: Submit Your Custom Project Idea
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Already have a specific project topic or reference paper from
                your college? We will implement your concept, write the reports,
                and design slides from scratch.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab("submit");
                setTimeout(
                  () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
                  100,
                );
              }}
              className="mt-6 px-4 py-2.5 bg-neo-yellow text-slate-950 font-extrabold text-xs rounded-xl brutalist-border-sm text-center cursor-pointer"
            >
              Submit Custom Concept
            </button>
          </div>
        </div>
      </section>

      {/* VIEW SELECTOR SWITCH */}
      <div className="flex justify-center pt-4">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all ${
              activeTab === "library"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Project Library Database
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all ${
              activeTab === "submit"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Submit Custom Idea Form
          </button>
        </div>
      </div>

      {/* TAB 1: PROJECT LIBRARY */}
      {activeTab === "library" && (
        <div ref={libraryRef} className="space-y-8 scroll-mt-24">
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-950 dark:border-slate-800 space-y-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-none">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                Advanced Library Directory Filters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search project titles, keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {allCategories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  {allDepartments
                    .filter((d) => d !== "All")
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Domain Filter */}
              <div>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer animate-none"
                >
                  <option value="All">All Domains</option>
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="IoT">IoT (Internet of Things)</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="AI & ML">
                    AI & ML (Artificial Intelligence)
                  </option>
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="All">All Technologies</option>
                  {allTechnologies
                    .filter((t) => t !== "All")
                    .map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="All">All Complexities</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="All">All Durations</option>
                  {allDurations
                    .filter((d) => d !== "All")
                    .map((dur) => (
                      <option key={dur} value={dur}>
                        {dur}
                      </option>
                    ))}
                </select>
              </div>

              {/* Sort selector */}
              <div>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="Latest">Latest Projects</option>
                  <option value="ComplexityDesc">
                    Complexity (High to Low)
                  </option>
                  <option value="ComplexityAsc">
                    Complexity (Low to High)
                  </option>
                  <option value="DurationAsc">
                    Delivery Time (Shortest First)
                  </option>
                  <option value="DurationDesc">
                    Delivery Time (Longest First)
                  </option>
                  <option value="PopularityDesc">
                    Popularity (Highest First)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* PROJECT LISTINGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => {
              const deptColor = getDeptColorClass(project.department);
              return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-5 sm:p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Header (ID & Department indicator) */}
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 dark:border-slate-800 font-bold">
                      <span
                        className={`text-xs font-mono font-black px-2 py-0.5 rounded ${deptColor}`}
                      >
                        {project.id}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-black px-2 py-0.5 rounded ${deptColor}`}
                      >
                        Dept: {project.department}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technology badging */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technology.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Estimated parameters */}
                    <div className="flex flex-col gap-1.5 pt-2 text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                      <div className="flex justify-between">
                        <span>
                          Difficulty:{" "}
                          <span className="text-blue-600 dark:text-cyan-400">
                            {project.difficulty}
                          </span>
                        </span>
                        <span>
                          Duration:{" "}
                          <span className="text-slate-800 dark:text-slate-300">
                            {project.duration}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200/50 dark:border-slate-700/50 pt-1.5 mt-0.5">
                        <span>
                          Domain:{" "}
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {getProjectDomain(project)}
                          </span>
                        </span>
                        <span>
                          Category:{" "}
                          <span className="text-purple-600 dark:text-pink-400">
                            {project.category}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid card triggers */}
                  <div className="space-y-2 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => openDetailsModal(project)}
                      className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-slate-100 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 brutalist-border-sm"
                    >
                      View Project Details
                      <Info className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleRequestDemo(project)}
                        className="px-3 py-2 bg-slate-900 dark:bg-slate-950 text-white hover:bg-slate-800 text-[11px] font-black rounded-xl text-center cursor-pointer brutalist-border-sm"
                      >
                        Request Demo
                      </button>
                      <button
                        onClick={() => handleSelectCard(project)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black rounded-xl text-center cursor-pointer brutalist-border-sm"
                      >
                        Select Project
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {sortedProjects.length === 0 && (
              <div className="col-span-full text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <BrainCircuit className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h4 className="font-extrabold text-slate-800 dark:text-white text-base">
                  No Matching Projects Found
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Try resetting the search terms or technology filter above to
                  see all projects.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedDept("All");
                    setSelectedTech("All");
                    setSelectedDomain("All");
                    setSelectedDifficulty("All");
                    setSelectedSort("Latest");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset Library Filters
                </button>
              </div>
            )}
          </div>

          {visibleCount < sortedProjects.length && (
            <div ref={observerRef} className="h-10 flex items-center justify-center mt-4">
              <span className="text-slate-400 font-bold text-xs animate-pulse">Loading more projects...</span>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUBMIT YOUR OWN PROJECT IDEA FORM */}
      {activeTab === "submit" && (
        <div
          ref={formRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-24"
        >
          {/* Left: Dynamic Recommendations Box based on Department */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dynamic AI Suggestions Panel */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white p-6 rounded-3xl border-2 border-slate-950 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles className="w-32 h-32 text-cyan-400" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-600 rounded-lg">
                    <BrainCircuit className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400">
                    Dynamic AI Project Recommender
                  </h3>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black leading-tight">
                    Need a customized idea?
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Adjust the{" "}
                    <span className="text-white font-bold">"Department"</span>{" "}
                    selector in the adjacent form. Our analyzer instantly
                    updates suitable high-grade proposals below.
                  </p>
                </div>

                {/* Suggestions List */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    Recommended for {formData.department} Curriculum:
                  </p>
                  <div className="space-y-2">
                    {activeSuggestions.map((title, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(title)}
                        className="w-full text-left p-2.5 bg-slate-900/60 hover:bg-blue-900/40 border border-slate-800 rounded-xl text-xs font-bold transition-all text-slate-200 hover:text-white flex items-start gap-2 group cursor-pointer"
                      >
                        <span className="text-[10px] bg-slate-800 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center font-bold mt-0.5 group-hover:bg-blue-600 group-hover:text-white flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="leading-tight flex-1">{title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic font-medium pt-2 text-center">
                  💡 Click any recommendation above to instantly pre-fill the
                  form!
                </p>
              </div>
            </div>

          </div>

          {/* Right: Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-none relative overflow-hidden">
              {formSubmitted && (
                <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-30 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-2xl font-black mb-4 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">
                    Your Project Idea Received Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you,{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      {formData.name || "Scholar"}
                    </span>
                    ! Our academic panel has received your requirements and
                    reference inputs. We will review your files and call or
                    message you on{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      {formData.phone}
                    </span>{" "}
                    within 2 hours with an execution map.
                  </p>
                  <p className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider mt-4 animate-pulse">
                    Initializing direct counselor call schedule...
                  </p>
                </div>
              )}

              <h3 className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-none mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                Submit Your Project Requirement Map
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Student Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Arsha Freelancer"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      College Name *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        name="college"
                        required
                        list="tn-colleges"
                        placeholder="e.g. Anna University"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                      <datalist id="tn-colleges">
                        <option value="Anna University, Chennai"></option>
                        <option value="Sona College of Technology, Salem"></option>
                        <option value="Government College of Engineering, Salem"></option>
                        <option value="Knowledge Institute of Technology, Salem"></option>
                        <option value="PSG College of Technology, Coimbatore"></option>
                        <option value="Coimbatore Institute of Technology (CIT), Coimbatore"></option>
                        <option value="Kumaraguru College of Technology, Coimbatore"></option>
                        <option value="Sri Krishna College of Engineering and Technology, Coimbatore"></option>
                        <option value="VIT Vellore"></option>
                        <option value="SRM Institute of Science and Technology, Chennai"></option>
                        <option value="SSN College of Engineering, Chennai"></option>
                        <option value="SASTRA Deemed University, Thanjavur"></option>
                        <option value="Madras Institute of Technology (MIT), Chennai"></option>
                        <option value="Thiagarajar College of Engineering, Madurai"></option>
                        <option value="KSR College of Engineering, Tiruchengode"></option>
                        <option value="Mahendra Engineering College, Namakkal"></option>
                        <option value="Bannari Amman Institute of Technology, Sathyamangalam"></option>
                        <option value="Kongu Engineering College, Erode"></option>
                        <option value="Rajalakshmi Engineering College, Chennai"></option>
                        <option value="St. Joseph's College of Engineering, Chennai"></option>
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Department & Academic Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                    >
                      <option value="CS">
                        B.Sc / BE Computer Science (CS)
                      </option>
                      <option value="CSE">BE Computer Science & Engineering (CSE)</option>
                      <option value="IT">Information Technology (IT)</option>
                      <option value="AI&DS">Artificial Intelligence & Data Science (AI&DS)</option>
                      <option value="AI&ML">Artificial Intelligence & Machine Learning (AI&ML)</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="CSBS">Computer Science & Business Systems (CSBS)</option>
                      <option value="MCA">M.C.A Post-Graduate</option>
                      <option value="BCA">B.C.A Graduate</option>
                      <option value="ECE">Electronics & Comm (ECE)</option>
                      <option value="EEE">
                        Electrical & Electronics (EEE)
                      </option>
                      <option value="MBA">M.B.A Administration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Academic Year *
                    </label>
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                    >
                      <option value="Final Year">Final Year Student</option>
                      <option value="Pre-Final Year">
                        Pre-Final Year (Mini project)
                      </option>
                      <option value="1st Year">1st Year Postgraduate</option>
                      <option value="M.Tech/Research">
                        M.Tech / Research Scholar
                      </option>
                    </select>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      WhatsApp Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 8300799120"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. arshatech06@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Title & Tech */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Project Title / Topic *
                    </label>
                    <div className="relative">
                      <Terminal className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        name="title"
                        required
                        placeholder="e.g. Hand gesture translation system"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-black uppercase text-slate-500">
                      Preferred Tech Stack *
                    </label>
                    <select
                      name="technology"
                      value={formData.technology}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                    >
                      <option value="Python">Python / Machine Learning</option>
                      <option value="Java">Java / Spring Boot / Android</option>
                      <option value="React">
                        React / Node / Express (MERN)
                      </option>
                      <option value="Flutter">Flutter / Dart Mobile</option>
                      <option value="Cybersecurity">
                        Cybersecurity / Network Security
                      </option>
                      <option value="IoT">Internet of Things (IoT)</option>
                      <option value="PHP">PHP / Laravel / MySQL</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Project Description & Guidelines *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Briefly describe what modules, files, or reference papers are required. (Minimum 20 characters)"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  ></textarea>
                </div>

                {/* Expected Submission Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Expected Submission Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      name="expectedDate"
                      required
                      value={formData.expectedDate}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
                    />
                  </div>
                </div>

                {/* File Upload Area Mockup requested explicitly in instructions */}
                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Upload Reference Files / Syllabus (Optional)
                  </label>

                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                      dragActive
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="file"
                      id="ref-file-input"
                      multiple={false}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="ref-file-input"
                      className="cursor-pointer space-y-1.5 block"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                        <Upload className="w-4 h-4 text-slate-500" />
                      </div>

                      {fileAttached ? (
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />{" "}
                            {fileAttached.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            File attached (
                            {(fileAttached.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-800 dark:text-white">
                            Drag & drop files here or click to choose
                          </p>
                          <p className="text-[10px] text-slate-400">
                            PDF, Word, TXT, zip up to 10MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                  <button
                    type="submit"
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl border border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Submit Project Idea
                  </button>
                  <a
                    href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers!+I+want+to+book+a+free+one-on-one+academic+consultation+to+discuss+my+project+ideas."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl border border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Free Consultation
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CORE BENEFITS CHECKLIST (Always Visible on Projects page) */}
      <section className="bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Our Absolute Quality Standard
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Why hundreds of engineering and postgraduate scholars choose Arsha
            for their final presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentBenefits.slice(0, 4).map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 flex gap-3.5 items-start"
            >
              <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-none">
                  {benefit.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
