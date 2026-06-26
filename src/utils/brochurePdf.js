import { jsPDF } from "jspdf";
import { servicesData } from "../data/services";

// Hex to RGB helper to ensure maximum compatibility with different jsPDF versions
function hexToRgb(hex) {
  const sanitized = hex.replace("#", "");
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);
  return { r, g, b };
}

// Colors list
const COLORS = {
  dark: "#0f172a", // Slate dark
  yellow: "#fde047", // Yellow accent
  purple: "#c084fc", // Purple accent
  cyan: "#67e8f9", // Cyan accent
  pink: "#f472b6", // Pink accent
  green: "#86efac", // Green accent
  orange: "#fdba74", // Orange accent
  lime: "#a3e635", // Lime accent
  cream: "#fefcee", // Light cream yellow background for PDF pages
  white: "#ffffff",
};

export function generateServicesBrochure() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Draw a neobrutalist offset shadow rectangle
  const drawBrutalistBox = (
    x,
    y,
    w,
    h,
    fillHex,
    strokeHex = COLORS.dark,
    shadowOffset = 1.5,
    lineWidth = 0.5,
  ) => {
    // Draw offset shadow
    const shadowRgb = hexToRgb(strokeHex);
    doc.setFillColor(shadowRgb.r, shadowRgb.g, shadowRgb.b);
    doc.rect(x + shadowOffset, y + shadowOffset, w, h, "F");

    // Draw main container
    const fillRgb = hexToRgb(fillHex);
    doc.setFillColor(fillRgb.r, fillRgb.g, fillRgb.b);
    const strokeRgb = hexToRgb(strokeHex);
    doc.setDrawColor(strokeRgb.r, strokeRgb.g, strokeRgb.b);
    doc.setLineWidth(lineWidth);
    doc.rect(x, y, w, h, "FD");
  };

  // Helper to draw clean lines
  const drawBrutalistLine = (
    x1,
    y1,
    x2,
    y2,
    colorHex = COLORS.dark,
    width = 0.5,
  ) => {
    const rgb = hexToRgb(colorHex);
    doc.setDrawColor(rgb.r, rgb.g, rgb.b);
    doc.setLineWidth(width);
    doc.line(x1, y1, x2, y2);
  };

  // Draw header block on internal pages
  const drawPageHeader = (title, pageNumber) => {
    // Background color
    const creamRgb = hexToRgb(COLORS.cream);
    doc.setFillColor(creamRgb.r, creamRgb.g, creamRgb.b);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Outer margin border
    const darkRgb = hexToRgb(COLORS.dark);
    doc.setDrawColor(darkRgb.r, darkRgb.g, darkRgb.b);
    doc.setLineWidth(0.6);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "S");

    // Header strip
    drawBrutalistBox(
      15,
      15,
      pageWidth - 30,
      12,
      COLORS.yellow,
      COLORS.dark,
      1.2,
      0.4,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(darkRgb.r, darkRgb.g, darkRgb.b);
    doc.text("ARSHA FREELANCERS SOFTWARE SOLUTIONS", 19, 22.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      `SERVICE CATALOGUE - ${title.toUpperCase()}`,
      pageWidth - 19,
      22.5,
      { align: "right" },
    );

    // Footer indicator inside page margins
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Trusted Academic Project Advisors", 15, pageHeight - 14);
    doc.text(`Page ${pageNumber} of 3`, pageWidth - 15, pageHeight - 14, {
      align: "right",
    });
    drawBrutalistLine(
      15,
      pageHeight - 18,
      pageWidth - 15,
      pageHeight - 18,
      COLORS.dark,
      0.3,
    );
  };

  // ==========================================
  // PAGE 1: COVER PAGE (Brutalist Poster Style)
  // ==========================================
  // Fill background
  const creamRgb = hexToRgb(COLORS.cream);
  doc.setFillColor(creamRgb.r, creamRgb.g, creamRgb.b);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Outer framing border
  const darkRgb = hexToRgb(COLORS.dark);
  doc.setDrawColor(darkRgb.r, darkRgb.g, darkRgb.b);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "S");

  // Grid Drafting lines (subtle neobrutalist touches)
  drawBrutalistLine(40, 10, 40, pageHeight - 10, "#0f172a15", 0.2);
  drawBrutalistLine(
    pageWidth - 40,
    10,
    pageWidth - 40,
    pageHeight - 10,
    "#0f172a15",
    0.2,
  );
  // Header Logo Box
  drawBrutalistBox(16, 22, 55, 12, COLORS.cyan, COLORS.dark, 1.5, 0.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkRgb.r, darkRgb.g, darkRgb.b);
  doc.text("ARSHA FREELANCERS", 20, 29.5);

  // Status badge
  drawBrutalistBox(
    pageWidth - 62,
    22,
    46,
    12,
    COLORS.pink,
    COLORS.dark,
    1.5,
    0.5,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("★ ACADEMIC EXCELLENCE", pageWidth - 39, 29.5, { align: "center" });

  // Main Display Poster Title Box
  drawBrutalistBox(
    16,
    48,
    pageWidth - 32,
    55,
    COLORS.purple,
    COLORS.dark,
    2.5,
    0.6,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("OFFICIAL SERVICES", 24, 68);
  doc.setFontSize(32);
  doc.text("BROCHURE", 24, 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "High-Quality Software Deliverables & Professional Guidance",
    24,
    94,
  );

  // Sub-badge for curricula supported
  drawBrutalistBox(
    16,
    115,
    pageWidth - 32,
    10,
    COLORS.white,
    COLORS.dark,
    1,
    0.4,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(
    "SUPPORTING: B.SC | BCA | MCA | B.E | B.TECH | M.E | M.TECH | DIPLOMA CURRICULA",
    pageWidth / 2,
    121.5,
    { align: "center" },
  );

  // Key stats / why us grid on Cover
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Why Students Choose Us", 16, 142);
  drawBrutalistLine(16, 145, 80, 145, COLORS.dark, 0.6);

  const pillars = [
    {
      title: "100% Plagiarism-Free Work",
      desc: "Every line of code and documentation report is custom crafted from scratch.",
    },
    {
      title: "Experienced Team Panel",
      desc: "Developers with 4+ years of real-world corporate experience guiding your modules.",
    },
    {
      title: "Line-by-Line Walkthroughs",
      desc: "One-to-one mentoring calls explaining exact execution logic for your viva exams.",
    },
    {
      title: "Milestone-Based Payments",
      desc: "Secure payments split logically into project approvals milestones.",
    },
  ];

  pillars.forEach((p, idx) => {
    const xPos = 16 + (idx % 2) * 91;
    const yPos = 152 + Math.floor(idx / 2) * 32;

    // Feature card
    drawBrutalistBox(xPos, yPos, 87, 24, COLORS.white, COLORS.dark, 1, 0.4);
    // Tiny colored accent box
    const colors = [COLORS.yellow, COLORS.cyan, COLORS.pink, COLORS.green];
    drawBrutalistBox(
      xPos + 3,
      yPos + 3,
      5,
      5,
      colors[idx],
      COLORS.dark,
      0.5,
      0.3,
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(p.title, xPos + 11, yPos + 7.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const splitDesc = doc.splitTextToSize(p.desc, 78);
    doc.text(splitDesc, xPos + 4, yPos + 13.5);
  });

  // Stamp indicator / Contact Quick box at bottom
  drawBrutalistBox(
    16,
    218,
    pageWidth - 32,
    42,
    COLORS.green,
    COLORS.dark,
    2,
    0.5,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("★ GET GUIDANCE IN 24 HOURS ★", pageWidth / 2, 228, {
    align: "center",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Submit your abstract, choose your framework, and prepare to ace your final evaluation!",
    pageWidth / 2,
    235,
    { align: "center" },
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("WHATSAPP HELPLINE: +91 8300799120", pageWidth / 2, 244, {
    align: "center",
  });
  doc.text("WEBSITE: https://wa.me/918300799120", pageWidth / 2, 250, {
    align: "center",
  });

  // Page 1 Footer
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("ARSHA FREELANCERS SOFTWARE SOLUTIONS", 16, pageHeight - 14);
  doc.text("Page 1 of 3", pageWidth - 16, pageHeight - 14, { align: "right" });
  drawBrutalistLine(
    16,
    pageHeight - 18,
    pageWidth - 16,
    pageHeight - 18,
    COLORS.dark,
    0.3,
  );

  // ==========================================
  // PAGE 2: DETAILED SERVICES (1 to 4)
  // ==========================================
  doc.addPage();
  drawPageHeader("Core Technical Services", 2);

  let currentY = 35;

  // Render services 1 to 4 from database
  const firstHalfServices = servicesData.slice(0, 4);

  firstHalfServices.forEach((srv) => {
    // Service Container
    drawBrutalistBox(
      15,
      currentY,
      pageWidth - 30,
      48,
      COLORS.white,
      COLORS.dark,
      1.5,
      0.45,
    );

    // Sidebar Category indicator (Colored)
    let srvColor = COLORS.pink;
    if (srv.category.includes("Academic")) srvColor = COLORS.cyan;
    if (srv.category.includes("Documentation")) srvColor = COLORS.yellow;
    if (srv.category.includes("Presentation")) srvColor = COLORS.green;

    drawBrutalistBox(
      18,
      currentY + 3.5,
      30,
      7,
      srvColor,
      COLORS.dark,
      0.8,
      0.3,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(srv.category.toUpperCase(), 33, currentY + 8, { align: "center" });

    // ID Badge
    drawBrutalistBox(
      pageWidth - 36,
      currentY + 3.5,
      18,
      7,
      COLORS.orange,
      COLORS.dark,
      0.8,
      0.3,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(srv.id, pageWidth - 27, currentY + 8, { align: "center" });

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(srv.title, 52, currentY + 9);

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const descLines = doc.splitTextToSize(srv.description, pageWidth - 38);
    doc.text(descLines, 19, currentY + 16.5);

    // Deliverables Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Key Deliverables & Support Included:", 19, currentY + 28);
    drawBrutalistLine(
      19,
      currentY + 29.5,
      75,
      currentY + 29.5,
      COLORS.dark,
      0.4,
    );

    // Render 4 key bullets inside the service
    srv.details.forEach((bullet, bIdx) => {
      const col = bIdx % 2;
      const row = Math.floor(bIdx / 2);
      const bx = 19 + col * 83;
      const by = currentY + 34 + row * 8;

      // Small square
      drawBrutalistBox(bx, by - 2.5, 3, 3, srvColor, COLORS.dark, 0.4, 0.25);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const bulletText = doc.splitTextToSize(bullet, 76);
      doc.text(bulletText, bx + 5, by);
    });

    currentY += 56;
  });

  // ==========================================
  // PAGE 3: DETAILED SERVICES (5 to 8) & CTA
  // ==========================================
  doc.addPage();
  drawPageHeader("Advanced Technologies & How We Work", 3);

  currentY = 35;
  const secondHalfServices = servicesData.slice(4, 8);

  secondHalfServices.forEach((srv) => {
    // Service Container
    drawBrutalistBox(
      15,
      currentY,
      pageWidth - 30,
      39,
      COLORS.white,
      COLORS.dark,
      1.2,
      0.45,
    );

    // Sidebar Category indicator (Colored)
    let srvColor = COLORS.purple;
    if (srv.category.includes("Software")) srvColor = COLORS.cyan;
    if (srv.category.includes("Emerging")) srvColor = COLORS.yellow;
    if (srv.category.includes("Career")) srvColor = COLORS.lime;

    drawBrutalistBox(18, currentY + 3, 32, 6, srvColor, COLORS.dark, 0.6, 0.3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text(srv.category.toUpperCase(), 34, currentY + 7, { align: "center" });

    // ID Badge
    drawBrutalistBox(
      pageWidth - 34,
      currentY + 3,
      16,
      6,
      COLORS.pink,
      COLORS.dark,
      0.6,
      0.3,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(srv.id, pageWidth - 26, currentY + 7, { align: "center" });

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(srv.title, 54, currentY + 8);

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const descLines = doc.splitTextToSize(srv.description, pageWidth - 38);
    doc.text(descLines, 19, currentY + 14.5);

    // Render detailed points (first 2 elements to keep it brief and spacing safe)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("Key Specialties:", 19, currentY + 25);
    srv.details.slice(0, 2).forEach((bullet, bIdx) => {
      const bx = 19 + bIdx * 83;
      const by = currentY + 31;
      drawBrutalistBox(bx, by - 2, 2.5, 2.5, srvColor, COLORS.dark, 0.4, 0.25);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const bulletText = doc.splitTextToSize(bullet, 78);
      doc.text(bulletText, bx + 4, by + 0.3);
    });

    currentY += 45;
  });

  // How to order / Get Quote Section at bottom of page 3
  drawBrutalistBox(
    15,
    currentY + 4,
    pageWidth - 30,
    48,
    COLORS.pink,
    COLORS.dark,
    2,
    0.5,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Ready to Initiate Your Project Approval?", 22, currentY + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const stepsText =
    "1. Share your syllabus / concept. \n2. Receive a free scoping & tech architecture consultation. \n3. Get a customized, milestone-structured quotation. \n4. Secure high-scoring grades with professional viva prep walking you through code!";
  doc.text(stepsText, 22, currentY + 18.5);

  // Big CTA Box inside CTA Section
  drawBrutalistBox(
    pageWidth - 75,
    currentY + 10,
    52,
    24,
    COLORS.yellow,
    COLORS.dark,
    1.2,
    0.45,
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("WHATSAPP NOW", pageWidth - 49, currentY + 17, { align: "center" });
  doc.setFontSize(8);
  doc.text("+91 8300799120", pageWidth - 49, currentY + 23, {
    align: "center",
  });
  doc.text("24/7 Student Hotline", pageWidth - 49, currentY + 28, {
    align: "center",
  });

  // Save the PDF file
  doc.save("Arsha-Freelancers-Services-Brochure.pdf");
}
