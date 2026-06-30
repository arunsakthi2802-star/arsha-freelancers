import {
  GraduationCap,
  Laptop,
  BookOpen,
  Terminal,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Star,
  Cpu,
  Zap,
  DollarSign,
  RefreshCcw,
  Trophy,
  FileText,
  PlayCircle,
  Download,
} from "lucide-react";
import { servicesData } from "../data/services";
import { generateServicesBrochure } from "../utils/brochurePdf";

export default function HomeView({ onNavigate, onGetQuoteClick }) {
  const stats = [
    {
      value: "250+",
      label: "Students Supported",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      value: "120+",
      label: "Academic Projects",
      icon: Laptop,
      color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20",
    },
    {
      value: "400+",
      label: "Documentation Reports",
      icon: BookOpen,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: Trophy,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      value: "4+",
      label: "Years of Experience",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  const whyChooseUs = [
    {
      title: "Original Plagiarism-Free Work",
      desc: "No copy-paste. Every project code and report is crafted from scratch as per your custom instructions.",
      icon: CheckCircle2,
    },
    {
      title: "Experienced Technical Team",
      desc: "Our developer panel has 4+ years of industry experience across Web, AI, Android, and Cybersecurity.",
      icon: Cpu,
    },
    {
      title: "Professional Documentation",
      desc: "Receive 60 to 120-page reports formatted precisely with university-prescribed margins and chapters.",
      icon: FileText,
    },
    {
      title: "Full Source Code Included",
      desc: "We deliver full, uncompiled, editable source code with no locked files so you can study and host it easily.",
      icon: Terminal,
    },
    {
      title: "Affordable Pricing",
      desc: "Budget-friendly plans designed specifically for students, with convenient milestone-based split payments.",
      icon: DollarSign,
    },
    {
      title: "Viva & PPT Preparation Support",
      desc: "We design complete presentation slides and conduct one-to-one calls explaining code line-by-line before your exams.",
      icon: PlayCircle,
    },
    {
      title: "Free Revisions & After-Care",
      desc: "We accommodate updates suggested by your guide for free and support you right up to your final practicals.",
      icon: RefreshCcw,
    },
    {
      title: "Latest Modern Tech Stack",
      desc: "Deploy your project using elite frameworks like React, Node.js, Flutter, Python, TensorFlow, and AWS.",
      icon: Zap,
    },
  ];

  const previewServices = servicesData.slice(0, 4);

  const processSteps = [
    {
      number: "01",
      title: "Share Your Requirement",
      desc: "Submit your custom project topic, college guidelines, and specific technology preferences.",
    },
    {
      number: "02",
      title: "Free Consultation",
      desc: "Discuss with our technical experts to refine project scope and select optimal tech stacks.",
    },
    {
      number: "03",
      title: "Project Planning",
      desc: "We map out major modules, design architectures, and draft an initial project synopsis.",
    },
    {
      number: "04",
      title: "Development Phase",
      desc: "Our experienced team builds clean, well-commented code incorporating your core deliverables.",
    },
    {
      number: "05",
      title: "Documentation Drafting",
      desc: "We prepare exhaustive reports covering system designs, flowcharts, and source code listings.",
    },
    {
      number: "06",
      title: "Presentation (PPT)",
      desc: "We outline seminar decks, key evaluation slides, and prepare slide presenter notes.",
    },
    {
      number: "07",
      title: "Code Walkthrough",
      desc: "Conduct one-to-one walkthrough calls demonstrating how to configure, run, and explain the code.",
    },
    {
      number: "08",
      title: "Final Ace Delivery",
      desc: "Submit your flawless deliverables to your college, fully prepared to score top grades!",
    },
  ];

  // College logo mock names
  const collegeLogos = [
    "Sona College of Technology",
    "GCE Salem",
    "Periyar University",
    "KSR Institutions",
    "VIT University",
    "PSG Tech",
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO & BENTO GRID DASHBOARD SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-auto">
          {/* Bento Block A: Hero Intro Panel (lg:col-span-8, bg-dot-grid) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 bg-dot-grid relative overflow-hidden min-h-[380px]">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-black rounded-full uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Academic Excellence Theme
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[1.1] text-slate-950 dark:text-slate-50 tracking-tight"
                id="hero-headline"
              >
                Your Trusted Partner for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Academic Projects
                </span>{" "}
                & Solutions
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                Arsha Freelancers Software Solutions has successfully supported{" "}
                <span className="font-bold underline decoration-blue-500 decoration-2">
                  250+ students
                </span>{" "}
                with premium academic projects, professional IEEE formatted
                documentation, PPT presentations, and walkthrough mentorship.
              </p>
            </div>

            {/* Action buttons integrated */}
            <div className="flex flex-wrap gap-3 mt-auto relative z-10">
              <button
                onClick={() => onNavigate("projects")}
                className="px-5 py-3 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 font-display font-bold rounded-xl brutalist-border-sm text-xs cursor-pointer"
              >
                Explore Projects
              </button>
              <button
                onClick={() => onNavigate("services")}
                className="px-5 py-3 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-display font-bold rounded-xl brutalist-border-sm text-xs cursor-pointer"
              >
                Our Services
              </button>
              <button
                onClick={() => generateServicesBrochure()}
                className="px-5 py-3 bg-neo-purple text-slate-950 font-display font-bold rounded-xl brutalist-border-sm text-xs cursor-pointer flex items-center gap-1.5 hover:bg-opacity-95 transition-all"
                title="Download complete services PDF catalog"
              >
                <Download className="w-3.5 h-3.5" />
                Brochure PDF
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="px-5 py-3 bg-cyan-400 text-slate-950 font-display font-bold rounded-xl brutalist-border-sm text-xs cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bento Block B: Developer Interactive Console Mockup (lg:col-span-4) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-slate-900 text-slate-100 brutalist-border rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[380px] text-left font-mono text-xs leading-relaxed">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
              </div>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                ArshaTechCompiler.sh
              </span>
            </div>

            {/* Terminal Logs */}
            <div className="space-y-2 pt-3 text-[11px] flex-grow">
              <p className="text-slate-500">
                # Initializing academic compilation engine...
              </p>
              <p className="text-slate-300">
                $ <span className="text-cyan-400">load_curricula</span>{" "}
                --target=MCA_MTech_BCA_BSc_BE
              </p>
              <p className="text-emerald-400">
                ✔ Loaded 10 disciplines successfully [100% OK]
              </p>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1 my-1 text-[10px]">
                <p className="text-amber-400 font-bold">
                  --- ACTIVE DELIVERABLES MODULES ---
                </p>
                <p className="text-slate-300">
                  ⚡ Code:{" "}
                  <span className="text-white font-bold">
                    100% Custom Source Modules
                  </span>
                </p>
                <p className="text-slate-300">
                  📄 Docs:{" "}
                  <span className="text-white font-bold">
                    IEEE Standard (O Grade)
                  </span>
                </p>
                <p className="text-slate-300">
                  📊 Slides:{" "}
                  <span className="text-white font-bold">
                    60-fps Interactive PPT
                  </span>
                </p>
              </div>

              <p className="text-slate-300">
                $ <span className="text-cyan-400">compile_viva_score</span>
              </p>
              <p className="text-emerald-400 font-bold">
                ★ Target Achieved: GPA 9.4+ / O Rating! ★
              </p>
            </div>

            {/* Floating absolute badge */}
            <div className="pt-2 border-t border-slate-800 mt-2 flex items-center justify-between text-slate-400 text-[10px]">
              <span>STATUS: READY</span>
              <span className="text-blue-400">arshatech06@gmail.com</span>
            </div>
          </div>

          {/* Bento Block C: Students Supported stats panel (lg:col-span-4) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-neo-purple dark:bg-slate-900 text-slate-950 dark:text-white brutalist-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[190px]">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl brutalist-border-sm flex items-center justify-center text-slate-950 dark:text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-poppins font-black">250+</div>
                <div className="text-[10px] text-slate-800 dark:text-slate-400 uppercase tracking-wider font-bold">
                  Students Supported
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-950/20 dark:bg-slate-800 w-full my-4"></div>

            <div className="flex justify-between items-end">
              <div className="text-left">
                <div className="text-3xl font-poppins font-black">98%</div>
                <div className="text-[10px] text-slate-800 dark:text-slate-400 uppercase tracking-wider font-bold">
                  Success Pass Rate
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">
                  R
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">
                  S
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-white">
                  A
                </div>
              </div>
            </div>
          </div>

          {/* Bento Block D: Submit Your Idea Card (lg:col-span-4) */}
          <div
            onClick={() => onNavigate("contact")}
            className="col-span-1 sm:col-span-2 lg:col-span-4 bg-neo-yellow dark:bg-slate-900 text-slate-950 dark:text-slate-50 brutalist-border rounded-3xl p-6 sm:p-8 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[190px]"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="space-y-2">
              <h3 className="text-lg font-poppins font-black text-slate-950 dark:text-slate-50">
                Submit Your Project Idea
              </h3>
              <p className="text-xs text-slate-800 dark:text-slate-400 font-medium leading-relaxed">
                Have a specific project syllabus or custom application
                requirement? Share your guidelines and we will map out an exact
                solution.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-blue-800 dark:text-cyan-400 font-black text-xs mt-4">
              Get Started Today{" "}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bento Block E: Explore our library tag panel (lg:col-span-4) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-neo-cyan dark:bg-slate-900 text-slate-950 dark:text-slate-50 brutalist-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[190px]">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 brutalist-border-sm rounded text-[9px] font-black uppercase text-slate-950 dark:text-white">
                AI & ML
              </span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 brutalist-border-sm rounded text-[9px] font-black uppercase text-slate-950 dark:text-white">
                Cyber
              </span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 brutalist-border-sm rounded text-[9px] font-black uppercase text-slate-950 dark:text-white">
                IoT
              </span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 brutalist-border-sm rounded text-[9px] font-black uppercase text-slate-950 dark:text-white">
                Full Stack
              </span>
            </div>

            <h4 className="text-xl font-poppins font-black text-slate-950 dark:text-white mt-1">
              Explore Our Project Library
            </h4>

            <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-950/10 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-400">
                Browse hundreds of industry-standard projects.
              </p>
              <button
                onClick={() => onNavigate("projects")}
                className="w-8 h-8 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 rounded-full flex items-center justify-center brutalist-border-sm cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bento Block F: 400+ Reports Delivered count (lg:col-span-3) */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-neo-orange dark:bg-slate-900 text-slate-950 dark:text-white brutalist-border rounded-3xl p-6 flex flex-col justify-center items-center text-center min-h-[160px]">
            <BookOpen className="w-8 h-8 text-slate-950 dark:text-slate-400 mb-2" />
            <div className="text-3xl font-poppins font-black mb-1">400+</div>
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-slate-800 dark:text-slate-400">
              Reports Delivered
            </div>
          </div>

          {/* Bento Block G: 120+ Projects Completed count (lg:col-span-3) */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-neo-lime dark:bg-slate-900 text-slate-950 dark:text-white brutalist-border rounded-3xl p-6 flex flex-col justify-center items-center text-center min-h-[160px]">
            <Laptop className="w-8 h-8 text-slate-950 dark:text-slate-400 mb-2" />
            <div className="text-3xl font-poppins font-black mb-1">120+</div>
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-slate-800 dark:text-slate-400">
              Projects Completed
            </div>
          </div>

          {/* Bento Block H: Experience stat (lg:col-span-3) */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-neo-pink dark:bg-slate-900 text-slate-950 dark:text-white brutalist-border rounded-3xl p-6 flex flex-col justify-center items-center text-center min-h-[160px]">
            <Zap className="w-8 h-8 text-slate-950 dark:text-slate-400 mb-2" />
            <div className="text-3xl font-poppins font-black mb-1">4+</div>
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-slate-800 dark:text-slate-400">
              Years Expert Experience
            </div>
          </div>

          {/* Bento Block I: Satisfaction Rating stat (lg:col-span-3) */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 bg-neo-green dark:bg-slate-900 text-slate-950 dark:text-white brutalist-border rounded-3xl p-6 flex flex-col justify-center items-center text-center min-h-[160px]">
            <Trophy className="w-8 h-8 text-slate-950 dark:text-slate-400 mb-2" />
            <div className="text-3xl font-poppins font-black mb-1">100%</div>
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-slate-800 dark:text-slate-400">
              After-Care Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Graphics representation */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl brutalist-border flex items-center justify-center p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap className="w-48 h-48" />
              </div>

              <div className="text-center space-y-4 relative z-10">
                <span className="text-xs uppercase font-extrabold tracking-widest bg-slate-950/30 px-3 py-1 rounded-full">
                  Established Tech Panel
                </span>
                <h3 className="text-2xl font-black">
                  Bridging Academia & Corporate Requirements
                </h3>
                <p className="text-xs text-blue-50/90 max-w-md mx-auto leading-relaxed font-medium">
                  We empower students by designing practical, fully working
                  solutions instead of theoretical slides, fostering job
                  readiness and technical confidence.
                </p>
                <div className="pt-2">
                  <span
                    className="inline-block bg-white text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer brutalist-border-sm"
                    onClick={() => onNavigate("about")}
                  >
                    Our Success Journey →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-none">
              About Arsha Freelancers
            </h2>
            <div className="w-16 h-2 bg-blue-600 rounded"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              We are a team of veteran software engineers, database architects,
              and academic consultants committed to helping students navigate
              the high-stress phases of final year projects and technical
              curriculum development.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              By delivering fully operational source code, comprehensive reports
              formatted precisely to local college criteria, and conducting
              tailored explainers, we ensure you don't just clear your
              degree—you understand the technologies built.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate("about")}
                className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Learn More About Our Mission
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ARSHA (Premium interactive layout) */}
      <section className="bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">
              The Arsha Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
              Why Choose Arsha for Your Academic Project?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Outstanding software development, original technical
              documentation, and stellar grade results guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 brutalist-border p-5 rounded-2xl text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 brutalist-border-sm flex items-center justify-center text-blue-600 dark:text-cyan-400 font-bold">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-950 dark:text-slate-100 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">
              Our Domain Expertise
            </span>
            <h2 className="text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
              Academic Services We Provide
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              From final year codes and synopsis to ATS resume prep, we hold
              expert masterclasses in all.
            </p>
          </div>
          <button
            onClick={() => onNavigate("services")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl brutalist-border-sm whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Explore All Services
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewServices.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 brutalist-border rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded">
                  {srv.category}
                </span>
                <h3 className="font-extrabold text-slate-950 dark:text-slate-100 text-lg tracking-tight leading-tight">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                  {srv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate("services")}
                  className="w-full inline-flex items-center justify-between text-xs font-black text-blue-600 dark:text-cyan-400 group cursor-pointer"
                >
                  <span>Learn More Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 7. THE PROCESS SECTION (Timeline layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">
            Our Workflow Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
            How We Build Your Project Success
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Our thorough eight-stage developmental milestone strategy guarantees
            zero-error submissions.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-10 space-y-8 max-w-4xl mx-auto">
          {processSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Bullet counter circle */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 dark:bg-blue-500 border-2 border-slate-950 dark:border-slate-900 text-white flex items-center justify-center font-black text-[10px] sm:text-xs shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] dark:shadow-none group-hover:scale-110 transition-transform">
                {step.number}
              </div>

              <div className="bg-white dark:bg-slate-900 brutalist-border p-5 rounded-2xl">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 dark:text-slate-100 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-1.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 sm:p-12 brutalist-border relative overflow-hidden text-center">
          {/* Accent decoration overlay */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <GraduationCap className="w-80 h-80" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-800/30">
              Immediate Open Registrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
              Ready to Build Your Academic Project?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Don't leave your degrees, GPA, and vital presentation scoring to
              guesswork. Reserve your project topic with us and secure expert
              source code, IEEE formatted reports, and total viva assistance.
            </p>

            <div className="flex flex-wrap justify-center gap-3.5 pt-4">
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl brutalist-border-sm cursor-pointer"
              >
                Inquire Contact Form
              </button>
              <a
                href="https://wa.me/918300799120?text=Hello!+I+am+ready+to+build+my+academic+project+with+Arsha+Freelancers.+Please+help+me+book+a+consultation."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl brutalist-border-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
