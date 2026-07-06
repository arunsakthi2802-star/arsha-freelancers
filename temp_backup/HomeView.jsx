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
 Search
} from"lucide-react";
import { servicesData } from"../data/services";
import { generateServicesBrochure } from"../utils/brochurePdf";

export default function HomeView({ onNavigate, onGetQuoteClick }) {
 const stats = [
 {
 value:"250+",
 label:"Students Supported",
 icon: GraduationCap,
 },
 {
 value:"120+",
 label:"Academic Projects",
 icon: Laptop,
 },
 {
 value:"400+",
 label:"Documentation Reports",
 icon: BookOpen,
 },
 {
 value:"98%",
 label:"Satisfaction Rate",
 icon: Trophy,
 },
 ];

 const whyChooseUs = [
 {
 title:"Original Plagiarism-Free Work",
 desc:"No copy-paste. Every project code and report is crafted from scratch as per your custom instructions.",
 icon: CheckCircle2,
 },
 {
 title:"Experienced Technical Team",
 desc:"Our developer panel has 4+ years of industry experience across Web, AI, Android, and Cybersecurity.",
 icon: Cpu,
 },
 {
 title:"Professional Documentation",
 desc:"Receive 60 to 120-page reports formatted precisely with university-prescribed margins and chapters.",
 icon: FileText,
 },
 {
 title:"Full Source Code Included",
 desc:"We deliver full, uncompiled, editable source code with no locked files so you can study and host it easily.",
 icon: Terminal,
 },
 {
 title:"Affordable Pricing",
 desc:"Budget-friendly plans designed specifically for students, with convenient milestone-based split payments.",
 icon: DollarSign,
 },
 {
 title:"Viva & PPT Preparation Support",
 desc:"We design complete presentation slides and conduct one-to-one calls explaining code line-by-line before your exams.",
 icon: PlayCircle,
 },
 {
 title:"Free Revisions & After-Care",
 desc:"We accommodate updates suggested by your guide for free and support you right up to your final practicals.",
 icon: RefreshCcw,
 },
 {
 title:"Latest Modern Tech Stack",
 desc:"Deploy your project using elite frameworks like React, Node.js, Flutter, Python, TensorFlow, and AWS.",
 icon: Zap,
 },
 ];

 const previewServices = servicesData.slice(0, 4);

 return (
 <div className="bg-white">
 {/* 1. FREELANCER STYLE HERO SECTION */}
 <section className="relative overflow-hidden bg-white">
 {/* Background Graphic to mimic the Freelancer hero background pattern if desired, or keep it clean white */}
 <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
 
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 lg:pt-32 lg:pb-32">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 
 {/* Left Content */}
 <div className="lg:col-span-7 space-y-8 text-left">
 <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-tight text-slate-800 tracking-tight">
 Hire the best for your <br className="hidden sm:block" />
 <span className="text-blue-500">Academic Projects</span>, online.
 </h1>
 
 <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
 Arsha Freelancers connects students with elite developers. Get custom software, IEEE formatted reports, and comprehensive Viva preparation.
 </p>

 <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
 <button
 onClick={onGetQuoteClick}
 className="w-full sm:w-auto px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded text-sm transition-colors cursor-pointer"
 >
 Submit Your Requirement
 </button>
 <button
 onClick={() => onNavigate("projects")}
 className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 font-bold rounded text-sm transition-colors cursor-pointer"
 >
 Explore Project Library
 </button>
 </div>
 </div>

 {/* Right Graphic/Search Pattern */}
 <div className="hidden lg:block lg:col-span-5 relative">
 <div className="w-full aspect-square bg-slate-50 border border-slate-200 rounded p-8 shadow-sm flex flex-col justify-center relative">
 <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
 <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-50"></div>
 
 <h3 className="text-2xl font-bold text-slate-800 mb-6 relative z-10">Find what you need</h3>
 <div className="relative z-10">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
 <input 
 type="text" 
 placeholder="e.g. Machine Learning, ReactJS..." 
 className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-sm"
 />
 </div>
 <div className="mt-4 flex flex-wrap gap-2">
 {["Python","React","AI/ML","Node.js","Java"].map((tag) => (
 <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded cursor-pointer hover:bg-slate-200 border border-slate-200">
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* 2. LOGOS / METRICS BAR */}
 <section className="border-y border-slate-200 bg-slate-50 py-12">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-8">
 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by students across top universities</p>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
 {stats.map((stat, idx) => (
 <div key={idx} className="flex items-center justify-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
 <stat.icon className="w-8 h-8 text-blue-500" />
 <div className="text-left">
 <div className="text-xl font-bold text-slate-800">{stat.value}</div>
 <div className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 3. CATEGORY BROWSE SECTION (Mimicking Freelancer's grid) */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
 <div className="space-y-2">
 <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Browse by Service Category</h2>
 <p className="text-slate-500">Get work done in over 20+ specialized domains.</p>
 </div>
 <button
 onClick={() => onNavigate("services")}
 className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
 >
 See all categories
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {previewServices.map((srv, idx) => (
 <div
 key={idx}
 className="group border border-slate-200 rounded p-6 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col items-start"
 onClick={() => onNavigate("services")}
 >
 <div className="w-10 h-10 mb-4 bg-slate-50 rounded flex items-center justify-center text-slate-600 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
 <Laptop className="w-5 h-5" /> 
 </div>
 <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-500 transition-colors">
 {srv.title}
 </h3>
 <p className="text-sm text-slate-500">
 {srv.description}
 </p>
 </div>
 ))}
 </div>
 </section>

 {/* 4. WHY CHOOSE US (List style) */}
 <section className="bg-slate-50 py-20 border-y border-slate-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
 <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
 Why choose Arsha Freelancers?
 </h2>
 <p className="text-slate-500">
 We provide the highest quality technical deliverables designed specifically for academia.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 {whyChooseUs.map((item, idx) => (
 <div key={idx} className="flex gap-4">
 <div className="flex-shrink-0 mt-1">
 <item.icon className="w-6 h-6 text-blue-500" />
 </div>
 <div>
 <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
 <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 5. API / CTA BANNER (Mimicking Freelancer's bottom banner) */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
 <div className="bg-slate-800 rounded p-12 text-center text-white space-y-6 flex flex-col items-center">
 <h2 className="text-3xl font-bold max-w-2xl">
 Arsha Freelancers Enterprise Solution
 </h2>
 <p className="text-slate-300 max-w-xl mx-auto text-lg">
 Are you a college faculty or educational institution looking to train your students or manage bulk final year projects?
 </p>
 <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
 <button
 onClick={() => onNavigate("contact")}
 className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded shadow cursor-pointer"
 >
 Contact Enterprise
 </button>
 <button
 onClick={() => generateServicesBrochure()}
 className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded shadow cursor-pointer"
 >
 Download Brochure
 </button>
 </div>
 </div>
 </section>
 </div>
 );
}
