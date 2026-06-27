import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Send,
  Phone,
  Mail,
  Check,
} from "lucide-react";

export default function Footer({ activeView, setActiveView, onGetQuoteClick }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t-2 border-slate-900 pt-16 pb-8 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleNavClick("home")}
            >
              <div className="bg-blue-600 text-white p-2 rounded-xl border border-white font-black text-sm tracking-widest">
                AF
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white leading-none uppercase">
                  Arsha <span className="text-blue-500">Freelancers</span>
                </span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Software Solutions
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              A premium, trust-oriented academic software solutions platform
              helping undergraduate and research scholars bridge structural gaps
              between theory and working codes.
            </p>

            <div className="flex gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-pink-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-blue-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-white hover:text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-bold">
              <li>
                <button
                  onClick={() => handleNavClick("home")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Landing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("about")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academic Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Project Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("portfolio")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Completed Portfolios
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("review")}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-500 font-black"
                >
                  ⭐ Rate Our Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-wider">
              Our Specializations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-bold">
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Final Year Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  IEEE Report Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seminar & Viva PPT Slides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Python AI & Data Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Web & Flutter Mobile Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ATS Resumes & Portfolios
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-wider">
              Academic Newsletter
            </h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Subscribe to receive free alerts on latest trending final-year
              project lists and IEEE research guides.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3.5 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Thank you for subscribing!
                </p>
              )}
            </form>

            {/* Direct Contact triggers */}
            <div className="pt-2 text-xs font-semibold text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-500" /> +91 83007 99120
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />{" "}
                arshatech06@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Quick credits and legal) */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs font-semibold text-slate-500 gap-4">
          <p className="text-center sm:text-left">
            © 2026 Arsha Freelancers Software Solutions. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNavClick("faq")}
              className="hover:text-slate-400 transition-colors"
            >
              FAQ Answers
            </button>
            <button
              onClick={() => handleNavClick("gallery")}
              className="hover:text-slate-400 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={onGetQuoteClick}
              className="hover:text-slate-400 transition-colors font-black text-blue-500"
            >
              Instant Get Quote
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
