import { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Tv,
  Globe,
  Cpu,
  UserCheck,
  Check,
  MessageCircle,
  FileCode,
  FileText,
  Download,
  Loader2,
} from "lucide-react";
import { servicesData } from "../data/services";
import { generateServicesBrochure } from "../utils/brochurePdf";
import { getServices } from "../api/services.api";

export default function ServicesView({ onNavigate, onGetQuoteClick }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [servicesList, setServicesList] = useState(servicesData); // Initialize with fallback to prevent blank flash
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Academic Projects",
    "Documentation",
    "Presentation Services",
    "Software Development",
    "Emerging Technologies",
    "Career Services",
  ];

  const loadServices = async () => {
    try {
      const res = await getServices();
      if (res.success && res.data && res.data.length > 0) {
        // Map DB services to match the layout
        const mapped = res.data.map((s, idx) => ({
          id: s._id || idx,
          title: s.serviceName,
          category: s.category || "Academic Projects", // Fallback to category
          description: s.description,
          icon: s.icon || "GraduationCap",
          features: s.features || []
        }));
        setServicesList(mapped);
      } else {
        setServicesList(servicesData);
      }
    } catch (err) {
      console.warn("Failed to load services from API, using default catalog:", err);
      setServicesList(servicesData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Specific list items requested in prompt
  const detailedServiceItems = {
    "Academic Projects": [
      "Final Year Projects (B.Sc, BCA, MCA, BE, B.Tech)",
      "Mini Projects (Semester-level custom prototypes)",
      "Major Projects (Complex architectural software development)",
      "IEEE Projects (Based on latest peer-reviewed science papers)",
    ],
    Documentation: [
      "Internship Reports (Weekly task logs & summaries)",
      "Project Documentation (System design, ERDs, UMLs)",
      "Synopsis Writing (Early university approval drafts)",
      "Research Documentation (Thesis support, academic articles)",
      "IEEE Paper Formatting (Exact style guides conformities)",
    ],
    "Presentation Services": [
      "Seminar PPT (Detailed tech review presentation slides)",
      "Project PPT (Core presentation of project deliverables)",
      "Viva Slides (Dynamic, question-anticipating slides)",
      "Professional Presentation Design (Flowcharts, high-contrast layouts)",
    ],
    "Software Development": [
      "Business Websites (Commercial web portals, landing pages)",
      "Portfolio Websites (Showcasing single-developer achievements)",
      "Android Applications (Java/Kotlin & Flutter apps)",
      "Desktop Applications (Windows standalone software)",
      "REST APIs & Web Services (Express, Django, Flask servers)",
      "Database Design (MySQL, PostgreSQL, MongoDB structures)",
    ],
    "Emerging Technologies": [
      "Artificial Intelligence (Machine learning models, prediction grids)",
      "Machine & Deep Learning (Image, speech, neural classification)",
      "Data Science & Predictive Analytics (CSV/Pandas charts)",
      "Natural Language Processing (SpaCy NLP, sentiment classifiers)",
      "Blockchain (Solidity web3 smart contracts & ledgers)",
      "Cloud Computing & Cybersecurity (AWS setups, encryption keys)",
      "Ethical Hacking & Network Intrusion (NIDS scanners)",
      "SOC Analyst & Digital Forensics Projects (Image capture verifiers)",
      "Internet of Things (IoT) (Arduino, Raspberry Pi relay networks)",
    ],
    "Career Services": [
      "ATS Resume Writing (High scoring format resumes)",
      "LinkedIn Profile Optimization (Branding, content layout polishing)",
      "Personal Portfolio Web Design (Hosting code project gallery)",
      "Career Guidance & Technical Interview Coaching",
    ],
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-slate-950" />;
      case "FileCode":
        return <FileCode className="w-6 h-6 text-slate-950" />;
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-slate-950" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-slate-950" />;
      case "Tv":
        return <Tv className="w-6 h-6 text-slate-950" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-slate-950" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-slate-950" />;
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-slate-950" />;
      default:
        return <GraduationCap className="w-6 h-6 text-slate-950" />;
    }
  };

  const getCategoryColorClass = (category) => {
    switch (category) {
      case "Academic Projects":
        return "bg-neo-yellow text-slate-950";
      case "Documentation":
        return "bg-neo-pink text-slate-950";
      case "Presentation Services":
        return "bg-neo-orange text-slate-950";
      case "Software Development":
        return "bg-neo-lime text-slate-950";
      case "Emerging Technologies":
        return "bg-neo-cyan text-slate-950";
      case "Career Services":
        return "bg-neo-purple text-slate-950";
      default:
        return "bg-neo-blue text-slate-950";
    }
  };

  const filteredServices =
    activeCategory === "All"
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory);

  const handleInquiryLink = (title) => {
    const text = `Hi Arsha Freelancers! I want to inquire about your professional services for: *${title}*. Could you please share the pricing, standard timeline, and deliverables list?`;
    return `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16 pt-8 text-left">
      {/* HEADER SECTION */}
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-950 bg-neo-yellow px-3 py-1.5 rounded-full brutalist-border-sm">
          Our Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Comprehensive Educational & Software Development Services
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          From brainstorming custom project concepts to full-scale engineering
          deployments and flawless institution documentation, we support you
          through every major milestone.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => generateServicesBrochure()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neo-purple hover:bg-[#b070f8] text-slate-950 font-display font-black rounded-xl brutalist-border-sm hover:translate-y-[-1px] transition-all text-xs sm:text-sm cursor-pointer"
          >
            <Download className="w-4.5 h-4.5" />
            Download Service Brochure (PDF)
          </button>
        </div>
      </section>

      {/* HORIZONTAL CATEGORY FILTER TABS */}
      <section className="flex flex-wrap justify-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-8">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-950 dark:bg-slate-50 text-white dark:text-slate-950 brutalist-border-sm"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 hover:border-slate-950 dark:hover:border-slate-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* SERVICE LIST GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map((srv) => {
          const subItems = detailedServiceItems[srv.category] || [];
          const categoryColor = getCategoryColorClass(srv.category);
          return (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl brutalist-border-sm flex items-center justify-center ${categoryColor}`}
                  >
                    {getIcon(srv.icon)}
                  </div>
                  <div>
                    <span
                      className={`text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${categoryColor}`}
                    >
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-tight mt-1.5">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {srv.description}
                </p>

                {/* Sub-items list requested explicitly in the prompt */}
                {subItems.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-widest">
                      Included Specializations:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {subItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-slate-950 dark:text-slate-300 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights check bullet points */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <h4 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-widest">
                    Standard Deliverables Package:
                  </h4>
                  <ul className="space-y-1.5">
                    {srv.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 dark:bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3.5 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={onGetQuoteClick}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-slate-100 text-xs font-black rounded-xl text-center cursor-pointer brutalist-border-sm"
                >
                  Request Quote
                </button>
                <a
                  href={handleInquiryLink(srv.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-xl text-center brutalist-border-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Now
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* CORE STUDENT BENEFITS WRAPPER */}
      <section className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-8 space-y-6 bg-dot-grid">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
            Our Absolute Standard for Every Delivery
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Irrespective of the package chosen, we guarantee these premium
            elements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl">🧩</div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
              Clean Source Code
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Fully uncompiled, raw, and easy to run.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">📚</div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
              Zero Plagiarism
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Every page written uniquely for you.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🎙</div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
              Expert Walkthroughs
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              One-to-one tutoring before your external viva.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🛡</div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
              Free Minor Revisions
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Accommodating feedback from project guides.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
