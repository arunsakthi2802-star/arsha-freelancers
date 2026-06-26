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
      await import("jspdf-autotable");

      const doc = new jsPDF("portrait");

      // Add Watermark first so it acts as background
      doc.setTextColor(240, 240, 240);
      doc.setFontSize(70);
      doc.text("ARSHA", doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2 - 20, {
        align: 'center',
        angle: 45
      });
      doc.text("FREELANCER", doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2 + 20, {
        align: 'center',
        angle: 45
      });

      if (!cachedLogoDataUrl) {
        try {
          const response = await fetch("/arsha%20logo.jpeg");
          const blob = await response.blob();
          cachedLogoDataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.error("Failed to load logo", e);
        }
      }

      if (cachedLogoDataUrl) {
        doc.addImage(cachedLogoDataUrl, 'JPEG', 15, 10, 30, 30);
      }

      doc.setFontSize(22);
      doc.setTextColor(20);
      doc.text("Arsha Freelancers - Project Details", 50, 25);
      
      doc.setFontSize(16);
      doc.setTextColor(40);
      const safeTitle = String(project?.title || "Untitled Project");
      const splitTitle = doc.splitTextToSize(safeTitle, 180);
      doc.text(splitTitle, 15, 55);
      
      const yAfterTitle = 55 + (splitTitle.length * 7);

      doc.setFontSize(12);
      const safeId = project?.id || "N/A";
      const safeDept = project?.department || "N/A";
      const safeCat = project?.category || "N/A";
      doc.text(`ID: ${safeId} | Dept: ${safeDept} | Category: ${safeCat}`, 15, yAfterTitle + 5);

      doc.setFontSize(11);
      doc.setTextColor(60);
      doc.text("Project Summary:", 15, yAfterTitle + 20);
      doc.setFontSize(10);
      doc.setTextColor(80);
      
      const safeDesc = String(project?.description || "No description provided.");
      const splitDesc = doc.splitTextToSize(safeDesc, 180);
      doc.text(splitDesc, 15, yAfterTitle + 28);
      
      const yAfterDesc = yAfterTitle + 28 + (splitDesc.length * 5) + 10;

      const techStack = Array.isArray(project?.technology) 
        ? project.technology.join(', ') 
        : (project?.technology || "Not specified");

      doc.autoTable({
        head: [['Specification', 'Details']],
        body: [
          ['Technology Stack', techStack],
          ['Academic Complexity', project?.difficulty || "Not specified"],
          ['Delivery Estimate', project?.duration || "Not specified"]
        ],
        startY: yAfterDesc,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [37, 99, 235] },
      });

      const finalY = doc.lastAutoTable.finalY + 15;
      
      doc.setFontSize(11);
      doc.setTextColor(60);
      doc.text("Included Deliverables:", 15, finalY);
      doc.setFontSize(10);
      doc.setTextColor(80);
      documentationDeliverables.forEach((item, index) => {
        doc.text(`- ${item}`, 20, finalY + 10 + (index * 6));
      });

      // Contact Details Footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.text("Contact for Consultation:", doc.internal.pageSize.width / 2, pageHeight - 25, { align: "center" });
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Arsha Freelancer | Email: arshatech06@gmail.com | Mobile: +91 8300799120", doc.internal.pageSize.width / 2, pageHeight - 15, { align: "center" });

      doc.save(`Arsha_Project_${safeId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Failed to generate PDF. Please try again.");
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
