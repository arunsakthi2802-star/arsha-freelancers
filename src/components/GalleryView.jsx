import React, { useState } from "react";
import { Camera, MessageSquare, Image as ImageIcon, Star } from "lucide-react";

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'photos', 'reviews'

  // Mock data for the gallery
  const [galleryItems] = useState([
    {
      id: 1,
      type: "photo",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      caption: "Team discussing AI algorithms for final year project.",
      date: "Oct 2025",
    },
    {
      id: 2,
      type: "review",
      author: "Priya M.",
      course: "B.E. Computer Science",
      text: "The Flutter app they developed was phenomenal. Clean code and great UI! I scored full marks in my final viva.",
      rating: 5,
      date: "Nov 2025",
    },
    {
      id: 3,
      type: "photo",
      url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      caption: "Student presenting the completed IoT Smart Agriculture project.",
      date: "Jan 2026",
    },
    {
      id: 4,
      type: "review",
      author: "Rahul S.",
      course: "MCA Graduate",
      text: "Excellent support for IEEE papers. Their documentation is top-notch and they explained the code line by line.",
      rating: 5,
      date: "Feb 2026",
    },
    {
      id: 5,
      type: "photo",
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      caption: "Our developers working late to deliver urgent project requirements.",
      date: "Mar 2026",
    },
    {
      id: 6,
      type: "review",
      author: "Kavya T.",
      course: "M.Tech IT",
      text: "Highly professional service. They delivered the Blockchain project on time without any bugs. Very satisfied!",
      rating: 4,
      date: "Apr 2026",
    },
  ]);

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8 text-left font-sans">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto relative">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200">
          Success Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Project Gallery & Student Reviews
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Explore our collection of successful project deliveries, student presentations, and authentic feedback from our graduates.
        </p>
      </section>



      {/* Gallery Filters */}
      <section className="flex flex-wrap justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-slate-900 text-white border-slate-950 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-4 py-2 text-xs font-black rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "photos"
              ? "bg-blue-600 text-white border-slate-950 dark:border-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
          }`}
        >
          <Camera className="w-3.5 h-3.5" /> Photos
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-xs font-black rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "bg-purple-600 text-white border-slate-950 dark:border-slate-100 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Reviews
        </button>
      </section>

      {/* Gallery Grid - Responsive layout across all screen sizes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="h-full">
            {item.type === "photo" ? (
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Photo
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-[10px] font-bold">
                    {item.date}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-neo-yellow dark:bg-slate-800 border-2 border-slate-950 dark:border-slate-700 rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-none hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Review
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                      {item.date}
                    </span>
                  </div>
                  
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900 dark:fill-amber-400 dark:text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 font-medium italic leading-relaxed mb-6">
                    "{item.text}"
                  </p>
                </div>
                
                <div className="border-t border-slate-950/20 dark:border-slate-700 pt-4 mt-auto">
                  <h4 className="font-extrabold text-sm text-slate-950 dark:text-white leading-none">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-400 mt-1">
                    {item.course}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-500 font-bold">
          No items found in this category.
        </div>
      )}
    </div>
  );
}
