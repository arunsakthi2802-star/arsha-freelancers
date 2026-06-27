import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Tag, Eye, Calendar, Search, ChevronLeft, X, User, ArrowRight, Loader2 } from "lucide-react";
import { getStories, getStory } from "../api/stories.api";

const CATEGORIES = ["All", "Success Story", "Project Showcase", "Workshop", "Announcement", "Tips & Tricks", "Other"];

const categoryColors = {
  "Success Story": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Project Showcase": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Workshop": "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Announcement": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Tips & Tricks": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  "Other": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

function StoryCard({ story, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const date = new Date(story.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(37,99,235,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.8)] hover:-translate-y-1 transition-all cursor-pointer group"
      onClick={() => onClick(story._id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgErr || !story.coverImage ? FALLBACK_IMG : story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgErr(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-black uppercase px-2 py-1 rounded-lg border border-white/20 ${categoryColors[story.category] || categoryColors["Other"]}`}>
          {story.category}
        </span>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/80 text-[10px]">
          <Eye className="w-3 h-3" />
          <span>{story.views || 0}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-black text-slate-950 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {story.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {story.description?.replace(/<[^>]*>/g, "") || ""}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          {story.author && (
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <User className="w-3 h-3" />
              <span className="font-medium">{story.author.fullName || "Admin"}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold group-hover:gap-2 transition-all">
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

function StoryDetail({ storyId, onBack }) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStory(storyId);
        if (res.success) setStory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [storyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center py-32">
        <p className="text-slate-500">Story not found.</p>
        <button onClick={onBack} className="mt-4 text-blue-600 font-bold text-sm cursor-pointer">← Back to Stories</button>
      </div>
    );
  }

  const date = new Date(story.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4 pb-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white mb-6 cursor-pointer transition-colors"
        id="story-back-btn"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Stories
      </button>

      {/* Cover */}
      {(story.coverImage && !imgErr) && (
        <div className="rounded-3xl overflow-hidden border-2 border-slate-950 dark:border-slate-700 shadow-[6px_6px_0px_0px_rgba(37,99,235,0.5)] mb-8">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-72 object-cover"
            onError={() => setImgErr(true)}
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 ${categoryColors[story.category] || categoryColors["Other"]}`}>
          {story.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" /> {date}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Eye className="w-3 h-3" /> {story.views} views
        </span>
        {story.author && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <User className="w-3 h-3" /> {story.author.fullName}
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mb-6 leading-tight">
        {story.title}
      </h1>

      <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
        {story.description}
      </div>

      {story.tags && story.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Tag className="w-4 h-4 text-slate-400 mt-0.5" />
          {story.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function StoriesView() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadStories = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== "All") params.category = category;

      const res = await getStories(params);
      if (res.success) {
        setStories(res.data);
        setTotal(res.total);
      }
    } catch {
      // Handle API not available — show empty state gracefully
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedId) {
      const timeout = setTimeout(loadStories, 300);
      return () => clearTimeout(timeout);
    }
  }, [search, category, page, selectedId]);

  if (selectedId) {
    return (
      <div className="py-12">
        <StoryDetail storyId={selectedId} onBack={() => setSelectedId(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Stories & Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mb-3 tracking-tight">
          Student Success Stories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
          Real stories from our students — project showcases, workshops, and tips from Arsha Freelancers.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
            id="stories-search"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-3.5 py-2.5 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-sm text-slate-400 font-medium">Loading stories...</p>
          </div>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-300 mb-2">No Stories Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {search ? "No stories match your search." : "Check back soon for student success stories!"}
          </p>
          {search && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="mt-4 flex items-center gap-1 mx-auto text-sm font-bold text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} onClick={setSelectedId} />
            ))}
          </div>

          {/* Pagination */}
          {total > 9 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 hover:border-blue-500 transition-colors cursor-pointer"
              >
                ← Prev
              </button>
              <span className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                Page {page} of {Math.ceil(total / 9)}
              </span>
              <button
                disabled={page >= Math.ceil(total / 9)}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 hover:border-blue-500 transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
