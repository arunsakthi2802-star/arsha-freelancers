import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import {
  X, ShieldCheck, Server, Rocket, GraduationCap,
  CheckCircle2, Phone, MessageCircle, Download, Loader2, Sparkles
} from "lucide-react";
import { studentProjects } from "../data/projects";
import { logoBase64 } from "../utils/logoBase64.js";

export default function AIAdvisorDetailsModal({ project, onClose, onSelectSimilar }) {
  // ✅ ALL hooks must be called before any early return
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const similarProjects = useMemo(() => {
    if (!project) return [];
    return studentProjects
      .filter(p => p.id !== project.id && (
        p.category === project.category ||
        p.technology.some(t => project.technology.includes(t)) ||
        p.difficulty === project.difficulty
      ))
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  // ✅ Early return AFTER all hooks
  if (!project) return null;

  // ─── Handlers ────────────────────────────────────────────────
  const handleWhatsApp = () => {
    const text = `Hi Arsha Freelancers! I want to take the Complete Project Package for ID: *${project.id}* - *"${project.title}"*. Please guide me on next steps.`;
    window.open(`https://wa.me/918300799120?text=${encodeURIComponent(text)}`, "_blank");
  };

  // ─── Full Project Details PDF Generator ───────────────────────
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = doc.internal.pageSize.getWidth(); // 210
      const H = doc.internal.pageSize.getHeight(); // 297
      const margin = 14;
      const contentW = W - margin * 2;

      // ── Helper: new page with header/footer branding ──────────
      const brandHeader = (pageNum) => {
        // Top bar
        doc.setFillColor(23, 37, 84);
        doc.rect(0, 0, W, 16, "F");
        doc.addImage(logoBase64, "JPEG", margin, 2, 12, 12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text("ARSHA FREELANCERS", margin + 14, 9);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("Academic Project Package | wa.me/918300799120", W / 2, 9, { align: "center" });
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text(`Page ${pageNum}`, W - margin, 9, { align: "right" });

        // Footer bar
        doc.setFillColor(23, 37, 84);
        doc.rect(0, H - 10, W, 10, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(200, 210, 240);
        doc.text("www.arshafreelancers.com | +91 83007 99120 | +91 93616 45871", W / 2, H - 4, { align: "center" });
      };

      // ── Diagonal watermark (every page) ─────────────────────
      const addWatermark = () => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(38);
        doc.setTextColor(235, 237, 245);
        doc.text("ARSHA FREELANCERS", W / 2, H / 2, { align: "center", angle: 45 });
      };

      // ══════════════════════════════════════════════════════════
      // PAGE 1 — TITLE PAGE
      // ══════════════════════════════════════════════════════════
      let page = 1;
      addWatermark();
      brandHeader(page);

      // Blue gradient hero block
      doc.setFillColor(37, 99, 235);
      doc.roundedRect(margin, 22, contentW, 55, 4, 4, "F");

      // Category pill
      doc.setFillColor(255, 232, 0);
      doc.roundedRect(margin + 5, 26, 40, 7, 3, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(project.category.toUpperCase(), margin + 25, 31, { align: "center" });

      // Difficulty pill
      const diffColor = project.difficulty === "Advanced" ? [239, 68, 68] : project.difficulty === "Beginner" ? [16, 185, 129] : [59, 130, 246];
      doc.setFillColor(...diffColor);
      doc.roundedRect(margin + 48, 26, 35, 7, 3, 3, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(`⬤ ${project.difficulty}`, margin + 65, 31, { align: "center" });

      // Project Title (white, bold, multi-line)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      const titleLines = doc.splitTextToSize(project.title, contentW - 10);
      doc.text(titleLines, margin + 5, 43);

      // Meta row
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(186, 214, 255);
      doc.text(`ID: ${project.id} | Dept: ${project.department} | Duration: ${project.duration} | Score: ${project.innovationScore}/10`, margin + 5, 72);

      // — Tech Stack row —
      let txPos = margin;
      let tyPos = 84;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(30, 58, 138);
      doc.text("TECH STACK:", txPos, tyPos);
      txPos += 24;
      project.technology.forEach(tech => {
        const tw = doc.getTextWidth(tech) + 5;
        if (txPos + tw > W - margin) { txPos = margin + 24; tyPos += 8; }
        doc.setFillColor(219, 234, 254);
        doc.roundedRect(txPos, tyPos - 5, tw, 7, 2, 2, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(30, 64, 175);
        doc.text(tech, txPos + 2.5, tyPos);
        txPos += tw + 3;
      });
      let yPos = tyPos + 12;

      // — Student placeholder box —
      doc.setDrawColor(200, 210, 240);
      doc.setLineWidth(0.4);
      doc.setFillColor(248, 250, 255);
      doc.roundedRect(margin, yPos, contentW, 28, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 58, 138);
      doc.text("SUBMITTED BY", margin + 5, yPos + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 80);
      doc.text("Name: ___________________________________", margin + 5, yPos + 17);
      doc.text("Reg. No: ___________________ Academic Year: _________", margin + 5, yPos + 24);
      yPos += 36;

      // ══════════════════════════════════════════════════════════
      // PAGE 2 — PROJECT OVERVIEW
      // ══════════════════════════════════════════════════════════
      doc.addPage();
      page++;
      addWatermark();
      brandHeader(page);
      yPos = 24;

      const sectionTitle = (label, color = [37, 99, 235]) => {
        if (yPos > H - 30) { doc.addPage(); page++; addWatermark(); brandHeader(page); yPos = 24; }
        doc.setFillColor(...color);
        doc.rect(margin, yPos, 3, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...color);
        doc.text(label, margin + 6, yPos + 6.5);
        yPos += 12;
      };

      const bodyText = (text, indent = 0) => {
        const lines = doc.splitTextToSize(text, contentW - indent - 3);
        lines.forEach(line => {
          if (yPos > H - 20) { doc.addPage(); page++; addWatermark(); brandHeader(page); yPos = 24; }
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(55, 65, 81);
          doc.text(line, margin + indent, yPos);
          yPos += 5.5;
        });
        yPos += 2;
      };

      const bulletItem = (text, bullet = "•", color = [37, 99, 235]) => {
        if (yPos > H - 20) { doc.addPage(); page++; addWatermark(); brandHeader(page); yPos = 24; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...color);
        doc.text(bullet, margin + 3, yPos);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        const lines = doc.splitTextToSize(text, contentW - 12);
        doc.text(lines, margin + 10, yPos);
        yPos += lines.length * 5.5 + 1;
      };

      // Problem Statement
      sectionTitle("PROBLEM STATEMENT", [220, 38, 38]);
      bodyText(project.problemStatement || `Currently, systems in the ${project.category} domain lack scalable and automated solutions. Users face manual inefficiencies, high latency, and lack of real-time insights.`);

      // Solution Overview
      sectionTitle("SOLUTION OVERVIEW", [5, 150, 105]);
      bodyText(project.solutionOverview || project.description);

      // Core Features
      sectionTitle("CORE FEATURES", [37, 99, 235]);
      (project.features || []).forEach(f => bulletItem(f, "✓", [37, 99, 235]));

      // Security Features
      sectionTitle("SECURITY FEATURES", [124, 58, 237]);
      (project.securityFeatures || [
        "Role-based Access Control (RBAC)",
        "End-to-End Encryption (AES-256)",
        "JWT Authentication Tokens",
        "SQL Injection & XSS Protection"
      ]).forEach(s => bulletItem(s, "⚙", [124, 58, 237]));

      // Deployment Plan
      sectionTitle("DEPLOYMENT PLAN", [8, 145, 178]);
      (project.deploymentPlan || [
        "Phase 1: Local Environment Setup & DB Modeling",
        "Phase 2: Core API & Frontend Integration",
        "Phase 3: Testing & Quality Assurance",
        "Phase 4: Cloud Deployment (AWS / Vercel / Railway)"
      ]).forEach((plan, i) => bulletItem(plan, `${i + 1}.`, [8, 145, 178]));

      // Future Scope
      sectionTitle("FUTURE SCOPE", [217, 119, 6]);
      (project.futureScope || [
        "Integration with Mobile Applications",
        "AI/ML Predictive Analytics module",
        "Blockchain for immutable audit logs"
      ]).forEach(s => bulletItem(s, "→", [217, 119, 6]));

      // Learning Outcomes
      sectionTitle("LEARNING OUTCOMES", [79, 70, 229]);
      (project.learningOutcomes || [
        "Mastery in full-stack architecture design",
        `Hands-on experience with ${project.technology[0] || "modern frameworks"}`,
        "Understanding of modern deployment workflows",
        "Implementation of industry-standard security practices"
      ]).forEach(s => bulletItem(s, "★", [79, 70, 229]));

      // ══════════════════════════════════════════════════════════
      // LAST PAGE — ARSHA CONTACT / MARKETING
      // ══════════════════════════════════════════════════════════
      doc.addPage();
      page++;
      addWatermark();
      brandHeader(page);

      // Hero CTA box
      doc.setFillColor(23, 37, 84);
      doc.roundedRect(margin, 24, contentW, 80, 5, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 232, 0);
      doc.text("GET THE COMPLETE PROJECT PACKAGE", W / 2, 42, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(186, 214, 255);
      doc.text("Everything you need to submit & succeed in your final year project:", W / 2, 52, { align: "center" });

      const deliverables = [
        ["✅ Full Source Code", "✅ Project Report (IEEE Format)"],
        ["✅ Synopsis (Editable)", "✅ PPT Presentation"],
        ["✅ UML Diagrams", "✅ Database Schema"],
        ["✅ Installation Guide", "✅ Demo Video Link"],
      ];
      let dlY = 60;
      deliverables.forEach(([left, right]) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(200, 230, 255);
        doc.text(left, margin + 8, dlY);
        doc.text(right, W / 2 + 5, dlY);
        dlY += 8;
      });

      // Contact cards
      const cards = [
        { label: "WhatsApp", val: "+91 83007 99120", color: [22, 163, 74] },
        { label: "Call / WhatsApp", val: "+91 93616 45871", color: [37, 99, 235] },
        { label: "Website", val: "www.arshafreelancers.com", color: [124, 58, 237] },
      ];
      let cxPos = margin;
      const cardW = (contentW - 8) / 3;
      cards.forEach(({ label, val, color }) => {
        doc.setFillColor(...color);
        doc.roundedRect(cxPos, 112, cardW, 26, 3, 3, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(255, 255, 255);
        doc.text(label, cxPos + cardW / 2, 122, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text(val, cxPos + cardW / 2, 130, { align: "center" });
        cxPos += cardW + 4;
      });

      doc.save(`Arsha_Project_${project.id}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // ─── JSX ──────────────────────────────────────────────────────
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto" role="dialog" aria-modal="true">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl glass-card rounded-[2rem] border border-border-primary shadow-2xl overflow-hidden pointer-events-auto"
        >

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2.5 bg-bg-tertiary hover:bg-border-hover rounded-full border border-border-primary text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable body */}
          <div className="p-6 sm:p-10 space-y-10 max-h-[88vh] overflow-y-auto custom-scrollbar">

            {/* ── Header ── */}
            <div className="space-y-4 pr-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold uppercase px-3 py-1.5 bg-accent-primary/10 text-accent-primary rounded-full border border-accent-primary/20">
                  {project.category}
                </span>
                <span className="text-[10px] font-bold uppercase px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                  {project.difficulty}
                </span>
                <span className="text-[10px] font-bold uppercase px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                  Score: {project.innovationScore}/10
                </span>
                <span className="text-[10px] font-bold uppercase px-3 py-1.5 bg-bg-secondary text-text-secondary rounded-full border border-border-primary">
                  {project.duration}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-text-tertiary font-bold flex items-center gap-2">
                <span className="px-2 py-1 bg-bg-secondary rounded-md border border-border-primary">ID: {project.id}</span>
                <span className="text-border-primary">•</span>
                <span className="px-2 py-1 bg-bg-secondary rounded-md border border-border-primary">Dept: {project.department}</span>
              </p>
            </div>

            {/* ── Two-column details ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left */}
              <div className="space-y-8">
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-rose-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    Problem Statement
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10">
                    {project.problemStatement}
                  </p>
                </section>
                
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Solution Overview
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/10">
                    {project.solutionOverview || project.description}
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-accent-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-primary rounded-full"></span>
                    Core Features
                  </h2>
                  <ul className="space-y-2">
                    {(project.features || []).map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary font-medium bg-bg-secondary px-4 py-3 rounded-xl border border-border-primary">
                        <CheckCircle2 className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Security Features
                  </h2>
                  <ul className="space-y-1.5 bg-purple-500/5 p-5 rounded-2xl border border-purple-500/10">
                    {(project.securityFeatures || []).map((s, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-center gap-2 font-medium">
                        <span className="text-purple-500 font-black">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right */}
              <div className="space-y-8">
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-primary">Technology Stack</h2>
                  <div className="flex flex-wrap gap-2 p-5 bg-bg-secondary rounded-2xl border border-border-primary">
                    {project.technology.map(t => (
                      <span key={t} className="text-xs font-bold px-4 py-2 bg-text-primary text-bg-primary rounded-xl shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-500 flex items-center gap-2">
                    <Server className="w-4 h-4" /> Deployment Plan
                  </h2>
                  <ol className="space-y-2">
                    {(project.deploymentPlan || []).map((p, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-center gap-3 bg-cyan-500/5 px-4 py-3 rounded-xl border border-cyan-500/10 font-medium">
                        <span className="font-black text-cyan-500 text-xs">{i + 1}.</span> {p}
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> Future Scope
                  </h2>
                  <ul className="space-y-1.5 bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10">
                    {(project.futureScope || []).map((s, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-center gap-2 font-medium">
                        <span className="text-amber-500 font-black">→</span> {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Learning Outcomes
                  </h2>
                  <ul className="space-y-1.5 bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10">
                    {(project.learningOutcomes || []).map((o, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-center gap-2 font-medium">
                        <span className="text-indigo-500 font-black">✓</span> {o}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* ── Similar Projects ── */}
            <section className="space-y-4 pt-4 border-t border-border-primary">
              <h2 className="text-lg font-extrabold text-text-primary flex items-center gap-3">
                <span className="p-2 bg-accent-primary/10 text-accent-primary rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                Similar Projects
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProjects.map(sp => (
                  <button
                    key={sp.id}
                    onClick={() => onSelectSimilar(sp)}
                    className="p-4 bg-bg-secondary border border-border-primary hover:border-accent-primary rounded-2xl flex flex-col gap-3 text-left transition-all cursor-pointer group hover:shadow-md"
                  >
                    <h3 className="text-sm font-bold text-text-primary leading-snug group-hover:text-accent-primary transition-colors line-clamp-2">
                      {sp.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      <span className="text-[10px] font-bold uppercase text-text-secondary bg-bg-tertiary px-2 py-1 rounded-md">
                        {sp.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* ── CTA Contact ── */}
            <section className="bg-[#0a0f1c] p-6 sm:p-10 rounded-[2rem] border border-slate-800 relative overflow-hidden shadow-xl mt-8">
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-end pr-8">
                <Rocket className="w-48 h-48 text-blue-400" />
              </div>
              <div className="relative flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">📦 Need the Complete Project Package?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Source Code", "Report", "PPT", "Synopsis", "IEEE Paper", "UML Diagrams", "DB Design", "Install Guide"].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <span className="text-emerald-400">✅</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-64 flex-shrink-0">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" /> WhatsApp 8300799120
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="w-full py-4 px-6 bg-accent-primary hover:bg-accent-primary/90 disabled:bg-accent-primary/50 text-accent-text font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  >
                    {isGeneratingPDF
                      ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
                      : <><Download className="w-5 h-5" /> Download Full PDF</>
                    }
                  </button>
                  <a href="tel:9361645871" className="text-center text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 mt-2">
                    <Phone className="w-4 h-4" /> Call 9361645871
                  </a>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
}
