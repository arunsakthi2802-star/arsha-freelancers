import React, { useState } from "react";
import {
  X,
  Check,
  MessageCircle,
  ArrowRight,
  Code,
  Presentation,
  Download,
} from "lucide-react";
import { logoBase64 } from "../utils/logoBase64.js";

let cachedLogoDataUrl = null;

export default function DetailsModal({ project, onClose, onSelectProject }) {
  if (!project) return null;

  const handleWhatsAppDemo = () => {
    const text = `Hi Arsha Freelancers! I want to request a live demo video, database screenshots, or a synopsis draft for project ID: *${project.id}* - *"${project.title}"*. Please guide me on next steps.`;
    window.open(
      `https://wa.me/918300799120?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadSinglePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF("portrait");

      const safeId = project?.id || "N/A";
      const safeTitle = String(project?.title || "Untitled Project");
      const safeDept = project?.department || "N/A";
      const safeCat = project?.category || "N/A";
      const safeDesc = String(project?.description || "No description provided.");
      const techStack = Array.isArray(project?.technology) 
        ? project.technology.join(', ') 
        : (project?.technology || "Not specified");

      let yPos = 25;
      
      const checkPageBreak = (requiredSpace) => {
        if (yPos + requiredSpace > 270) {
          doc.addPage();
          yPos = 20;
        }
      };

      // Header Area
      // Draw Logo (Left side)
      doc.addImage(logoBase64, 'JPEG', 15, 12, 25, 25);

      // Main Header Text (Centered in remaining space)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235); // Blue
      doc.text("ARSHA FREELANCERS", 115, yPos, { align: "center" });
      
      yPos += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Academic Project Proposal & Specifications", 115, yPos, { align: "center" });
      
      yPos += 15;
      
      // Divider Line
      doc.setDrawColor(220, 220, 220);
      doc.line(15, yPos, 195, yPos);
      yPos += 12;

      // Project Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(20);
      const splitTitle = doc.splitTextToSize(safeTitle, 180);
      doc.text(splitTitle, 15, yPos);
      yPos += (splitTitle.length * 7) + 5;

      // Badges (Text format)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text("ID:", 15, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(safeId, 22, yPos);

      doc.setFont("helvetica", "bold");
      doc.text("Dept:", 60, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(safeDept, 72, yPos);

      doc.setFont("helvetica", "bold");
      doc.text("Category:", 120, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(safeCat, 138, yPos);
      yPos += 15;

      // Summary Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.text("PROJECT SUMMARY", 15, yPos);
      yPos += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60);
      const splitDesc = doc.splitTextToSize(safeDesc, 180);
      doc.text(splitDesc, 15, yPos);
      yPos += (splitDesc.length * 5) + 12;

      // Tech Stack Box
      checkPageBreak(50);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(15, yPos, 180, 35, 3, 3, 'FD'); // Fill and border

      yPos += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30);
      doc.text("Technical Details", 20, yPos);
      
      yPos += 7;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text("Technology Stack:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(techStack, 55, yPos);
      
      yPos += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Complexity:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(project?.difficulty || "Not specified", 45, yPos);
      
      yPos += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Delivery Estimate:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(project?.duration || "Not specified", 55, yPos);
      yPos += 20;

      // Architecture & Implementation
      if (project?.details) {
        checkPageBreak(40);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(37, 99, 235);
        doc.text("ARCHITECTURE & IMPLEMENTATION", 15, yPos);
        yPos += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60);
        const splitDetails = doc.splitTextToSize(project.details, 180);
        doc.text(splitDetails, 15, yPos);
        yPos += (splitDetails.length * 5) + 10;
      }

      // Key Features
      if (project?.features && project.features.length > 0) {
        checkPageBreak(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(37, 99, 235);
        doc.text("KEY FEATURES", 15, yPos);
        yPos += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60);
        project.features.forEach((feat, idx) => {
          doc.text(`• ${feat}`, 20, yPos + (idx * 6));
        });
        yPos += (project.features.length * 6) + 10;
      }

      // Project Impact & Existing Systems
      if (project?.impact || project?.existing) {
        checkPageBreak(40);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(37, 99, 235);
        doc.text("PROJECT SCOPE & IMPACT", 15, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        if (project.existing) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(30);
          doc.text("Limitations of Existing Systems:", 15, yPos);
          yPos += 5;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(60);
          const splitExisting = doc.splitTextToSize(project.existing, 180);
          doc.text(splitExisting, 15, yPos);
          yPos += (splitExisting.length * 5) + 8;
        }
        
        if (project.impact) {
          checkPageBreak(25);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(30);
          doc.text("Proposed Impact:", 15, yPos);
          yPos += 5;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(60);
          const splitImpact = doc.splitTextToSize(project.impact, 180);
          doc.text(splitImpact, 15, yPos);
          yPos += (splitImpact.length * 5) + 10;
        }
      }
      
      // Deliverables
      checkPageBreak(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(37, 99, 235);
      doc.text("INCLUDED DELIVERABLES", 15, yPos);
      yPos += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60);
      documentationDeliverables.forEach((item, index) => {
        // Bullet point
        doc.setFillColor(37, 99, 235);
        doc.circle(17, yPos - 1 + (index * 6), 1, 'F');
        doc.text(item, 22, yPos + (index * 6));
      });

      // Contact Footer (Bottom of page - fixed position)
      const pageHeight = doc.internal.pageSize.height;
      doc.setFillColor(37, 99, 235); // Solid Blue Banner
      doc.rect(0, pageHeight - 35, 210, 35, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text("Ready to build this project?", 105, pageHeight - 22, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Email: arshatech06@gmail.com   |   Mobile: +91 8300799120", 105, pageHeight - 14, { align: "center" });

      doc.save(`Arsha_Project_${safeId}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Failed to generate PDF. Error: " + error.message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const documentationDeliverables = [
    "Abstract & Detailed System Design Chapter (UMLs, ERDs, Flowcharts)",
    "Comprehensive SDLC & Software Engineering Analysis Chapter",
    "Source Code listing with explanation markers",
    "Screen Capture Logs and Database Verification screenshots",
    "IEEE citation references bibliography index",
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Positioning */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6 lg:p-8">
        {/* Modal Window */}
        <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 text-left transition-all sm:my-8 w-full max-w-2xl brutalist-border">
          {/* Close corner button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-xl brutalist-border-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header section with tags */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-black text-slate-950 bg-neo-yellow px-2.5 py-1 rounded-md border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  {project.id}
                </span>
                <span className="text-xs font-bold text-slate-950 bg-neo-cyan px-2.5 py-1 rounded-md border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  {project.category}
                </span>
                <span className="text-xs font-extrabold text-slate-950 bg-neo-pink px-2.5 py-1 rounded-md border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  Dept: {project.department}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-tight pt-1">
                {project.title}
              </h3>
            </div>

            {/* Core Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Project Summary
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl brutalist-border-sm">
                {project.description}
              </p>
            </div>

            {/* Spec Matrix Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Tech Spec */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-3 brutalist-border-sm">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-slate-100 tracking-tight">
                    Technical Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technology.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-black px-2 py-0.5 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-300 border border-slate-950 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimate Delivery Info */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-3 brutalist-border-sm">
                <div className="flex items-center gap-2">
                  <Presentation className="w-4 h-4 text-cyan-600" />
                  <h4 className="text-xs font-black uppercase text-slate-900 dark:text-slate-100 tracking-tight">
                    Delivery Estimates
                  </h4>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-semibold">
                  <p>
                    Estimated Build:{" "}
                    <span className="text-slate-800 dark:text-white font-bold">
                      {project.duration}
                    </span>
                  </p>
                  <p>
                    Academic Complexity:{" "}
                    <span className="text-slate-800 dark:text-white font-bold">
                      {project.difficulty} Level
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* University Standard Report Deliverables */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Included Plagiarism-Free Report Chapters:
              </h4>
              <ul className="space-y-1.5">
                {documentationDeliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-450 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleDownloadSinglePDF}
                disabled={isGeneratingPDF}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer brutalist-border-sm"
              >
                <Download className="w-4.5 h-4.5" />
                {isGeneratingPDF ? "Wait..." : "PDF"}
              </button>
              <button
                onClick={handleWhatsAppDemo}
                className="px-4 py-3 bg-neo-purple text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer brutalist-border-sm"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                Demo
              </button>
              <button
                onClick={() => {
                  onSelectProject(project);
                  onClose();
                }}
                className="px-4 py-3 bg-neo-yellow text-slate-950 font-black rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer brutalist-border-sm"
              >
                Select Idea
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
