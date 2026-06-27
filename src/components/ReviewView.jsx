import React, { useState, useEffect } from "react";
import {
  Star,
  MessageCircle,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  Send,
  User,
  BookOpen,
  Trophy,
} from "lucide-react";

// Star rating labels
const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

// Quick review tags per star level
const STAR_TAGS = {
  1: ["Too Slow", "Poor Quality", "Not Satisfied", "Will Not Return"],
  2: ["Needs Improvement", "Partially Delivered", "Average Work", "Delayed"],
  3: ["Good Work", "Mostly On Time", "Helpful Team", "Decent Quality"],
  4: [
    "Great Support",
    "On-Time Delivery",
    "Professional",
    "Highly Detailed Docs",
  ],
  5: [
    "Excellent Work",
    "Super Fast Delivery",
    "Top Quality Code",
    "100% Recommended",
    "Viva Ready",
    "Beyond Expectations",
  ],
};

const SERVICE_OPTIONS = [
  "Final Year Academic Project",
  "Mini Semester Project",
  "IEEE Report Documentation",
  "Seminar / Presentation PPT",
  "Python / AI / ML Project",
  "Web / Mobile App Development",
  "ATS Resume & Portfolio",
  "Cybersecurity Project",
  "IoT / Embedded Project",
  "Other Service",
];

// Existing review testimonials to show social proof
const SAMPLE_REVIEWS = [
  {
    name: "Rahul M.",
    college: "Sona College of Technology, MCA",
    rating: 5,
    text: "Arsha team was absolutely amazing! They delivered my final year project in 3 days with full documentation. Viva went smoothly — I scored O grade!",
    service: "Final Year Academic Project",
    avatar: "R",
    color: "bg-blue-500",
  },
  {
    name: "Sneha K.",
    college: "PSG Tech, B.E CSE",
    rating: 5,
    text: "The IEEE report was formatted perfectly. My professor had zero corrections. The walkthrough call made everything so clear before my exam.",
    service: "IEEE Report Documentation",
    avatar: "S",
    color: "bg-purple-500",
  },
  {
    name: "Aravind J.",
    college: "KSR Institutions, M.Tech",
    rating: 5,
    text: "Python AI project delivered with 95% accuracy model. The team was patient with every revision and explained each module step by step.",
    service: "Python / AI / ML Project",
    avatar: "A",
    color: "bg-emerald-500",
  },
  {
    name: "Divya P.",
    college: "VIT University, BCA",
    rating: 4,
    text: "Good quality work and very professional team. The slides were creative and my seminar presentation was well-received.",
    service: "Seminar / Presentation PPT",
    avatar: "D",
    color: "bg-cyan-500",
  },
];

function StarRating({ value, onChange, size = "lg" }) {
  const [hovered, setHovered] = useState(0);
  const starSize = size === "lg" ? "w-10 h-10" : "w-5 h-5";

  return (
    <div className="flex gap-1.5" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            className={`${starSize} transition-all duration-150 cursor-pointer focus:outline-none hover:scale-110 active:scale-95`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star
              className={`w-full h-full transition-colors duration-150 ${
                isActive
                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                  : "fill-slate-200 text-slate-300 dark:fill-slate-700 dark:text-slate-600"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <div
      className="bg-white dark:bg-slate-900 brutalist-border rounded-2xl p-5 flex flex-col gap-3 text-left"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3.5 h-3.5 ${
              s <= review.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div
          className={`w-8 h-8 rounded-full ${review.color} flex items-center justify-center text-white font-black text-xs border-2 border-slate-950 dark:border-slate-700`}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-xs font-black text-slate-800 dark:text-slate-200 leading-none">
            {review.name}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {review.college}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewView() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [form, setForm] = useState({
    name: "",
    college: "",
    service: "",
    review: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1); // 1=rate, 2=details, 3=confirm

  // Reset tags when rating changes
  useEffect(() => {
    setSelectedTags([]);
  }, [rating]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppMessage = () => {
    // WhatsApp formatting: *bold*, _italic_, ```mono```, dividers with ─────
    const DIVIDER = "━━━━━━━━━━━━━━━━━━━━━━";

    // Star visuals — filled vs empty unicode stars
    const filledStar = "⭐";
    const starRow = filledStar.repeat(rating) + "☆".repeat(5 - rating);

    // Rating badge emoji based on score
    const ratingBadge =
      rating === 5 ? "🏆 *EXCELLENT*" :
      rating === 4 ? "🥇 *GREAT*" :
      rating === 3 ? "🥈 *GOOD*" :
      rating === 2 ? "🥉 *FAIR*" :
                     "⚠️ *POOR*";

    // Tags line — each tag wrapped as a chip-style label
    const tagsLine =
      selectedTags.length > 0
        ? `\n🏷️ *Highlights:* ${selectedTags.map((t) => `[${t}]`).join("  ")}`
        : "";

    // Review quote — use WhatsApp italic _text_ style
    const reviewLine =
      form.review
        ? `\n\n💬 *Client's Words:*\n_"${form.review}"_`
        : "";

    // Date formatted nicely
    const dateStr = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return [
      `${DIVIDER}`,
      `🌟 *NEW CLIENT REVIEW*`,
      `*Arsha Freelancers Software Solutions*`,
      `${DIVIDER}`,
      ``,
      `${starRow}`,
      `*Rating: ${rating} / 5 Stars*  ${ratingBadge}`,
      ``,
      `${DIVIDER}`,
      `📋 *REVIEWER DETAILS*`,
      `${DIVIDER}`,
      ``,
      `👤 *Name:*  ${form.name || "_Anonymous_"}`,
      `🎓 *College:*  ${form.college || "_Not specified_"}`,
      `🛠️ *Service:*  ${form.service || "_Not specified_"}`,
      tagsLine,
      reviewLine,
      ``,
      `${DIVIDER}`,
      `📅 *Submitted:*  ${dateStr}`,
      `🌐 *Via:*  arsha-freelancers.netlify.app/review`,
      `${DIVIDER}`,
    ]
      .filter((line) => line !== null && line !== undefined)
      .join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/918300799120?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  const handleReset = () => {
    setRating(0);
    setSelectedTags([]);
    setForm({ name: "", college: "", service: "", review: "" });
    setSubmitted(false);
    setStep(1);
  };

  const canProceedStep1 = rating > 0;
  const canProceedStep2 = form.name.trim().length > 0;

  return (
    <div className="space-y-20 pb-16">
      {/* ─── HERO HEADER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-black rounded-full uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Client Reviews
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-tight text-slate-950 dark:text-slate-50 tracking-tight"
            id="review-page-headline"
          >
            Share Your{" "}
            <span className="text-amber-500 dark:text-amber-400">
              Experience
            </span>{" "}
            With Us
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Your honest feedback helps us grow and helps future students choose
            confidently. Takes less than 60 seconds!
          </p>
        </div>

        {/* ─── MAIN REVIEW FORM CARD ─── */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full border-4 border-slate-950 dark:border-emerald-700 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                  Review Submitted! 🎉
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                  Thank you{form.name ? `, ${form.name}` : ""}! Your review has
                  been sent to our WhatsApp. We truly appreciate your feedback —
                  it means the world to our team.
                </p>
              </div>

              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-7 h-7 ${
                      s <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-xs rounded-xl brutalist-border-sm cursor-pointer"
                >
                  Submit Another Review
                </button>
                <a
                  href="https://wa.me/918300799120"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl brutalist-border-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat With Us
                </a>
              </div>
            </div>
          ) : (
            /* ── MULTI-STEP FORM ── */
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 brutalist-border rounded-3xl overflow-hidden"
            >
              {/* Step indicator bar */}
              <div className="flex border-b-2 border-slate-950 dark:border-slate-700">
                {[
                  { num: 1, label: "Rate" },
                  { num: 2, label: "Details" },
                  { num: 3, label: "Confirm" },
                ].map((s) => (
                  <div
                    key={s.num}
                    className={`flex-1 py-3 text-center text-[10px] font-black uppercase tracking-wider transition-colors ${
                      step === s.num
                        ? "bg-blue-600 text-white"
                        : step > s.num
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-400"
                    } ${s.num < 3 ? "border-r-2 border-slate-950 dark:border-slate-700" : ""}`}
                  >
                    {step > s.num ? "✓ " : `${s.num}. `}
                    {s.label}
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* ── STEP 1: Rate ── */}
                {step === 1 && (
                  <div className="space-y-6 text-center">
                    <div>
                      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                        How would you rate our service?
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Tap a star to rate your overall experience
                      </p>
                    </div>

                    {/* Star selector */}
                    <div className="flex flex-col items-center gap-4">
                      <StarRating value={rating} onChange={setRating} size="lg" />

                      {rating > 0 && (
                        <div className="flex items-center gap-2 animate-in fade-in duration-300">
                          <span
                            className={`text-sm font-black px-3 py-1 rounded-full border-2 border-slate-950 dark:border-slate-600 ${
                              rating === 5
                                ? "bg-amber-400 text-slate-950"
                                : rating === 4
                                ? "bg-emerald-400 text-slate-950"
                                : rating === 3
                                ? "bg-cyan-400 text-slate-950"
                                : rating === 2
                                ? "bg-orange-300 text-slate-950"
                                : "bg-red-300 text-slate-950"
                            }`}
                          >
                            {STAR_LABELS[rating]}
                          </span>
                          <span className="text-slate-400 text-xs font-bold">
                            {rating}/5 Stars
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick tags */}
                    {rating > 0 && STAR_TAGS[rating] && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Quick Tags (optional — tap to select)
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {STAR_TAGS[rating].map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border-2 transition-all cursor-pointer ${
                                selectedTags.includes(tag)
                                  ? "bg-blue-600 text-white border-slate-950"
                                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={!canProceedStep1}
                      onClick={() => setStep(2)}
                      className={`w-full py-3.5 font-extrabold text-sm rounded-xl brutalist-border-sm transition-all ${
                        canProceedStep1
                          ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {canProceedStep1
                        ? `Continue with ${rating} Star${rating > 1 ? "s" : ""} →`
                        : "Please select a star rating"}
                    </button>
                  </div>
                )}

                {/* ── STEP 2: Details ── */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="text-center">
                      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                        Tell us a bit about yourself
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        This helps us personalize your feedback record
                      </p>
                    </div>

                    {/* Show selected rating summary */}
                    <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        Your Rating:
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200 dark:fill-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                        <User className="w-3.5 h-3.5" /> Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Rahul M."
                        value={form.name}
                        onChange={handleChange}
                        id="review-name-input"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>

                    {/* College */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                        <GraduationCap className="w-3.5 h-3.5" /> College &
                        Degree
                      </label>
                      <input
                        type="text"
                        name="college"
                        placeholder="e.g. Sona College, MCA"
                        value={form.college}
                        onChange={handleChange}
                        id="review-college-input"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>

                    {/* Service Used */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" /> Service Used
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        id="review-service-select"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
                      >
                        <option value="">Select a service…</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Written review */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> Your Review
                        (optional)
                      </label>
                      <textarea
                        name="review"
                        rows={3}
                        placeholder="Share your experience — what went well, any highlights…"
                        value={form.review}
                        onChange={handleChange}
                        id="review-text-input"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-medium placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl brutalist-border-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        disabled={!canProceedStep2}
                        onClick={() => setStep(3)}
                        className={`flex-[2] py-3 font-extrabold text-sm rounded-xl brutalist-border-sm transition-all ${
                          canProceedStep2
                            ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Preview Review →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Confirm ── */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="text-center">
                      <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                        Confirm & Send Review
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Your review will open WhatsApp — just hit Send!
                      </p>
                    </div>

                    {/* Preview card */}
                    <div className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3 text-left">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-5 h-5 ${
                              s <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-300 text-slate-300 dark:fill-slate-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs font-black text-amber-500">
                          {STAR_LABELS[rating]}
                        </span>
                      </div>

                      {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {form.review && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed">
                          &ldquo;{form.review}&rdquo;
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-black text-xs border-2 border-slate-950 dark:border-slate-600">
                          {form.name ? form.name[0].toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 dark:text-slate-200 leading-none">
                            {form.name || "Anonymous"}
                          </p>
                          {form.college && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                              {form.college}
                            </p>
                          )}
                          {form.service && (
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                              {form.service}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live WhatsApp message preview */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                        WhatsApp Message Preview
                      </p>
                      <div className="bg-[#e5ddd5] dark:bg-[#1a2436] rounded-2xl p-3">
                        {/* Fake WA chat bubble */}
                        <div className="bg-white dark:bg-[#202c33] rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-full shadow-sm">
                          <pre
                            className="text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans break-words"
                            style={{ fontFamily: "inherit" }}
                          >
                            {buildWhatsAppMessage()}
                          </pre>
                          <p className="text-[9px] text-slate-400 text-right mt-1.5">
                            {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} ✓✓
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA notice */}
                    <div className="flex items-start gap-2.5 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                      <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed">
                        WhatsApp will open with this message pre-filled. Just tap{" "}
                        <strong>Send</strong> to submit your review instantly.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl brutalist-border-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        ← Edit
                      </button>
                      <button
                        type="submit"
                        id="review-submit-btn"
                        className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl brutalist-border-sm cursor-pointer flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send via WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ─── EXISTING REVIEWS SECTION ─── */}
      <section className="bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 dark:text-amber-400">
              What Our Students Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
              250+ Happy Students Reviewed
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Real feedback from real students across top Tamil Nadu colleges.
            </p>

            {/* Average rating display */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-6 h-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-black text-slate-950 dark:text-white">
                4.9
              </span>
              <span className="text-xs text-slate-500 font-bold">/ 5.0</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                250+ reviews
              </span>
            </div>
          </div>

          {/* Review cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_REVIEWS.map((review, idx) => (
              <ReviewCard key={idx} review={review} index={idx} />
            ))}
          </div>

          {/* CTA to leave review */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 brutalist-border rounded-xl cursor-pointer hover:bg-amber-300 transition-colors font-black text-slate-950 text-sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              role="button"
            >
              <Trophy className="w-4 h-4" />
              Add Your Review Above
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES STRIP ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Star, value: "4.9/5", label: "Average Rating", bg: "bg-amber-50 dark:bg-amber-950/30 text-amber-600" },
            { icon: Trophy, value: "250+", label: "Reviews Received", bg: "bg-blue-50 dark:bg-blue-950/30 text-blue-600" },
            { icon: CheckCircle2, value: "98%", label: "Positive Reviews", bg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" },
            { icon: MessageCircle, value: "24h", label: "Response Time", bg: "bg-purple-50 dark:bg-purple-950/30 text-purple-600" },
          ].map(({ icon: Icon, value, label, bg }, idx) => (
            <div
              key={idx}
              className={`${bg} brutalist-border rounded-2xl p-5 flex flex-col items-center text-center gap-2`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-2xl font-black text-slate-950 dark:text-white">{value}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
