import { useState } from "react";
import {
  Star,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { portfolioItems, faqData } from "../data/portfolio";

export function PortfolioView({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "AI & ML",
    "Web Development",
    "Blockchain",
    "Cybersecurity",
    "IoT Projects",
    "Mobile Apps",
  ];

  const filteredItems =
    activeFilter === "All"
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
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200">
          Our Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Completed Student Portfolios & Live Systems
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Review a selected gallery of high-performance desktop tools, mobile
          solutions, database grids, and advanced AI systems we built for
          academic excellence.
        </p>
      </section>

      {/* Category filters */}
      <section className="flex flex-wrap justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
              activeFilter === cat
                ? "bg-blue-600 text-white border-slate-950 dark:border-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-450"
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
            className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-none hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all flex flex-col justify-between"
          >
            {/* Visual Header */}
            <div className="relative aspect-video w-full bg-slate-100 border-b-2 border-slate-950 dark:border-slate-850 overflow-hidden">
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
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Badges and actions */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {item.technology.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-white text-xs font-black rounded-xl transition-colors text-center"
                  >
                    Request Clone
                  </button>
                  <a
                    href={handleInquiry(item.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black rounded-xl text-center shadow-sm"
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
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200">
          Got Questions?
        </span>
        <h1 className="text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Frequently Answered Inquiries (FAQ)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
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
              className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] dark:shadow-none transition-all"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left gap-4 font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
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
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Live Support Help */}
      <section className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
            Still have unanswered questions or complex syllabus requirements?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Connect directly with our head technical counselor for an instant
            solution.
          </p>
        </div>
        <a
          href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+have+reviewed+your+FAQs+but+want+to+ask+a+specific+question+about+my+college+syllabus."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl"
        >
          <MessageCircle className="w-4 h-4" />
          Chat Live on WhatsApp
        </a>
      </section>
    </div>
  );
}
