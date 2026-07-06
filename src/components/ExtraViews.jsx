import { useState } from"react";
import {
 Star,
 HelpCircle,
 ChevronDown,
 ChevronUp,
 MessageCircle,
 Quote,
 ShieldCheck,
} from"lucide-react";
import { portfolioItems, faqData } from"../data/portfolio";

export function PortfolioView({ onNavigate }) {
 const [activeFilter, setActiveFilter] = useState("All");

 const categories = ["All","AI & ML","Web Development","Blockchain","Cybersecurity","IoT Projects","Mobile Apps",
 ];

 const filteredItems =
 activeFilter ==="All"
 ? portfolioItems
 : portfolioItems.filter((item) => item.category === activeFilter);

 const handleInquiry = (title) => {
 const text = `Hi Arsha! I saw your completed portfolio project: *"${title}"* and would love to get a similar system developed. Please share details.`;
 return `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
 };

 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8 text-left">
 {/* Header */}
 <section className="text-center space-y-4 max-w-4xl mx-auto">
 <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200">
 Our Showcase
 </span>
 <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
 Completed Student Portfolios & Live Systems
 </h1>
 <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
 Review a selected gallery of high-performance desktop tools, mobile
 solutions, database grids, and advanced AI systems we built for
 academic excellence.
 </p>
 </section>

 {/* Category filters */}
 <section className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6">
 {categories.map((cat) => (
 <button
 key={cat}
 onClick={() => setActiveFilter(cat)}
 className={`px-4 py-2 text-xs font-black rounded border-2 transition-all cursor-pointer ${
 activeFilter === cat
 ?"bg-blue-600 text-white border-slate-950 shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow"
 :"bg-white text-slate-700 border-slate-200 hover:border-slate-450"
 }`}
 >
 {cat}
 </button>
 ))}
 </section>

 {/* Showcase Grid */}
 <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredItems.map((item) => (
 <div
 key={item.id}
 className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow hover:shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow transition-all flex flex-col justify-between"
 >
 {/* Visual Header */}
 <div className="relative aspect-video w-full bg-slate-100 border-b-2 border-slate-950 overflow-hidden">
 <img
 src={item.image}
 alt={item.title}
 referrerPolicy="no-referrer"
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 />

 <span className="absolute top-3 left-3 text-[10px] font-mono font-black text-white bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/20 uppercase tracking-widest">
 {item.category}
 </span>
 </div>

 {/* Narrative Content */}
 <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
 <div className="space-y-2">
 <h3 className="text-lg font-black text-slate-900 tracking-tight">
 {item.title}
 </h3>
 <p className="text-xs text-slate-500 leading-relaxed font-medium">
 {item.description}
 </p>
 </div>

 {/* Badges and actions */}
 <div className="space-y-4 pt-4 border-t border-slate-100">
 <div className="flex flex-wrap gap-1.5">
 {item.technology.map((tech) => (
 <span
 key={tech}
 className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded"
 >
 {tech}
 </span>
 ))}
 </div>

 <div className="grid grid-cols-2 gap-3 pt-2">
 <button
 onClick={() => onNavigate("contact")}
 className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black rounded transition-colors text-center"
 >
 Request Clone
 </button>
 <a
 href={handleInquiry(item.title)}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black rounded text-center shadow-sm"
 >
 <MessageCircle className="w-3.5 h-3.5" />
 WhatsApp
 </a>
 </div>
 </div>
 </div>
 </div>
 ))}

 {filteredItems.length === 0 && (
 <div className="col-span-full text-center py-12">
 <p className="text-slate-400 font-bold text-xs">
 No project archives currently indexed under this filter.
 </p>
 </div>
 )}
 </section>
 </div>
 );
}



// ==========================================
// 3. FAQ VIEW (ACCORDION)
// ==========================================
export function FaqView() {
 const [openIndex, setOpenIndex] = useState(0);

 const toggleAccordion = (idx) => {
 setOpenIndex(openIndex === idx ? null : idx);
 };

 return (
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8 text-left">
 {/* Header */}
 <section className="text-center space-y-4">
 <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200">
 Got Questions?
 </span>
 <h1 className="text-4xl font-black text-slate-950 tracking-tight">
 Frequently Answered Inquiries (FAQ)
 </h1>
 <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
 Everything you need to know about academic code delivery timelines,
 custom report guidelines, free revisions, and easy milestone split
 payments.
 </p>
 </section>

 {/* Accordion List */}
 <section className="space-y-4 pt-4">
 {faqData.map((faq, idx) => {
 const isOpen = openIndex === idx;
 return (
 <div
 key={idx}
 className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow transition-all"
 >
 <button
 onClick={() => toggleAccordion(idx)}
 className="w-full px-6 py-4 flex justify-between items-center text-left gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
 >
 <span className="flex items-center gap-2.5">
 <HelpCircle className="w-4.5 h-4.5 text-blue-600 flex-shrink-0" />
 {faq.question}
 </span>
 {isOpen ? (
 <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
 ) : (
 <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
 )}
 </button>

 {isOpen && (
 <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
 {faq.answer}
 </div>
 )}
 </div>
 );
 })}
 </section>

 {/* Live Support Help */}
 <section className="bg-blue-50 p-6 rounded-md border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
 <div className="space-y-1">
 <h4 className="font-extrabold text-sm text-slate-900">
 Still have unanswered questions or complex syllabus requirements?
 </h4>
 <p className="text-xs text-slate-500 font-medium">
 Connect directly with our head technical counselor for an instant
 solution.
 </p>
 </div>
 <a
 href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+have+reviewed+your+FAQs+but+want+to+ask+a+specific+question+about+my+college+syllabus."
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded"
 >
 <MessageCircle className="w-4 h-4" />
 Chat Live on WhatsApp
 </a>
 </section>
 </div>
 );
}
