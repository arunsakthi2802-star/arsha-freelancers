import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read logo image and convert to base64
const logoPath = path.join(__dirname, 'public', 'arsha logo.jpeg');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
    const bitmap = fs.readFileSync(logoPath);
    logoBase64 = `data:image/jpeg;base64,${bitmap.toString('base64')}`;
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arsha Freelancers - Premium Corporate Brochure</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            primary: '#2563EB',
                            secondary: '#7C3AED',
                            accent: '#06B6D4',
                            bg: '#F8FAFC',
                            text: '#111827',
                            muted: '#6B7280'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Poppins', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body { background-color: #e5e7eb; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
        .page { width: 210mm; height: 297mm; background: #F8FAFC; margin: 10mm auto; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; }
        @media print {
            body { background: transparent; }
            .page { margin: 0; box-shadow: none; border: none; page-break-after: always; }
            .page:last-child { page-break-after: avoid; }
        }
        .gradient-text { background: linear-gradient(135deg, #2563EB, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .bg-gradient-brand { background: linear-gradient(135deg, #2563EB, #7C3AED); }
        .glass-card { background: white; border-radius: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.03); padding: 24px; }
        .bullet-list { list-style: none; padding: 0; margin: 0; }
        .bullet-list li { position: relative; padding-left: 24px; margin-bottom: 14px; font-size: 13px; color: #6B7280; line-height: 1.5; font-weight: 500; }
        .bullet-list li::before { content: ""; position: absolute; left: 0; top: 6px; width: 8px; height: 8px; border-radius: 50%; background-color: #2563EB; }
        .pill { display: inline-block; padding: 8px 20px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: white; color: #111827; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(229,231,235,0.5); }
        .bg-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; z-index: 0; }
    </style>
</head>
<body class="font-sans text-brand-text">

    <!-- PAGE 1: Cover -->
    <div class="page justify-center items-center text-center">
        <div class="bg-blob bg-brand-primary/20 w-96 h-96 top-0 left-0"></div>
        <div class="bg-blob bg-brand-secondary/20 w-96 h-96 bottom-0 right-0"></div>
        
        <div class="z-10 flex flex-col items-center max-w-2xl">
            <div class="mb-10 p-1 bg-white rounded-[2rem] shadow-xl border border-gray-100">
                ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" class="w-40 h-40 rounded-[1.8rem] object-cover">` : `<div class="w-40 h-40 bg-brand-primary rounded-[1.8rem]"></div>`}
            </div>
            <h1 class="text-5xl font-display font-bold tracking-tight mb-3">ARSHA FREELANCERS</h1>
            <h2 class="text-2xl font-medium text-brand-muted mb-8 tracking-wide">SOFTWARE SOLUTIONS</h2>
            
            <div class="w-24 h-1.5 bg-gradient-brand rounded-full mb-12"></div>
            
            <h3 class="text-3xl font-display font-semibold gradient-text mb-12 leading-snug">Premium Academic, Software<br>& AI Solutions</h3>
            
            <div class="glass-card text-left">
                <h4 class="text-xl font-display font-bold mb-4 text-brand-text">Company Overview</h4>
                <p class="text-sm text-brand-muted leading-relaxed mb-4">
                    Arsha Freelancers Software Solutions bridges the gap between academic theory and industry reality. We empower students, startups, and enterprises by delivering high-quality, fully functional digital solutions. 
                </p>
                <p class="text-sm text-brand-muted leading-relaxed mb-6">
                    Specializing in custom software development, artificial intelligence, and premium academic projects, our mission is to provide affordable, innovative, and reliable technology backed by expert 24/7 technical support.
                </p>
                
                <div class="flex justify-between items-center pt-6 border-t border-gray-100">
                    <div>
                        <span class="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">Our Vision</span>
                        <span class="text-xs text-brand-muted">Accessible Technology for All</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1">Our Mission</span>
                        <span class="text-xs text-brand-muted">Deliver Excellence On-Time</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 2: Services & Tech -->
    <div class="page">
        <div class="z-10 h-full flex flex-col">
            <div class="mb-10">
                <span class="text-xs font-bold text-brand-primary uppercase tracking-widest">What We Do</span>
                <h2 class="text-3xl font-display font-bold mt-2">Our Core Services</h2>
            </div>
            
            <div class="grid grid-cols-2 gap-6 flex-grow">
                <!-- Card 1 -->
                <div class="glass-card flex flex-col">
                    <div class="w-12 h-12 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7"></path></svg>
                    </div>
                    <h3 class="text-lg font-display font-bold mb-4">Academic Solutions</h3>
                    <div class="w-full h-px bg-gray-100 mb-5"></div>
                    <ul class="bullet-list flex-grow">
                        <li>Final Year Projects (UG & PG)</li>
                        <li>IEEE Standard Projects</li>
                        <li>Research Paper Publishing Support</li>
                        <li>Complete Thesis & Documentation</li>
                        <li>Project Demo & Viva Videos</li>
                        <li>Synopsis & PPT Preparations</li>
                        <li>AI Project Idea Generation</li>
                        <li>One-on-One Code Explanations</li>
                    </ul>
                </div>
                
                <!-- Card 2 -->
                <div class="glass-card flex flex-col">
                    <div class="w-12 h-12 rounded-xl bg-purple-50 text-brand-secondary flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </div>
                    <h3 class="text-lg font-display font-bold mb-4">Software Development</h3>
                    <div class="w-full h-px bg-gray-100 mb-5"></div>
                    <ul class="bullet-list flex-grow">
                        <li>Custom Web Application Development</li>
                        <li>Native & Cross-Platform Mobile Apps</li>
                        <li>SaaS Product Engineering</li>
                        <li>Enterprise ERP & CRM Systems</li>
                        <li>E-commerce & Payment Gateways</li>
                        <li>Scalable API & Backend Architecture</li>
                        <li>UI/UX Design Prototyping</li>
                        <li>Database Optimization & Security</li>
                    </ul>
                </div>
                
                <!-- Card 3 -->
                <div class="glass-card flex flex-col">
                    <div class="w-12 h-12 rounded-xl bg-cyan-50 text-brand-accent flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="text-lg font-display font-bold mb-4">AI & Emerging Tech</h3>
                    <div class="w-full h-px bg-gray-100 mb-5"></div>
                    <ul class="bullet-list flex-grow">
                        <li>Machine Learning Models</li>
                        <li>Deep Learning & Neural Networks</li>
                        <li>Natural Language Processing (NLP)</li>
                        <li>Computer Vision & Image Processing</li>
                        <li>Generative AI Solutions</li>
                        <li>Cloud Infrastructure (AWS/Azure)</li>
                        <li>Cybersecurity & Pen Testing</li>
                        <li>IoT & Embedded Systems</li>
                    </ul>
                </div>
                
                <!-- Card 4 -->
                <div class="glass-card flex flex-col">
                    <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 class="text-lg font-display font-bold mb-4">Training & Career</h3>
                    <div class="w-full h-px bg-gray-100 mb-5"></div>
                    <ul class="bullet-list flex-grow">
                        <li>Student Internship Programs</li>
                        <li>Corporate Technical Training</li>
                        <li>ATS-Friendly Resume Building</li>
                        <li>Mock Interviews & Assessment</li>
                        <li>Career Guidance & Roadmaps</li>
                        <li>GitHub Portfolio Construction</li>
                        <li>Agile & Scrum Workshops</li>
                        <li>Soft Skills Development</li>
                    </ul>
                </div>
            </div>
            
            <div class="mt-8">
                <span class="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4 block">Our Technology Stack</span>
                <div class="flex flex-wrap gap-3">
                    <span class="pill">React.js</span>
                    <span class="pill">Next.js</span>
                    <span class="pill">Node.js</span>
                    <span class="pill">Python</span>
                    <span class="pill">Java</span>
                    <span class="pill">FastAPI</span>
                    <span class="pill">MongoDB</span>
                    <span class="pill">MySQL</span>
                    <span class="pill">Firebase</span>
                    <span class="pill">AWS</span>
                    <span class="pill">Azure</span>
                    <span class="pill">Docker</span>
                    <span class="pill">GitHub</span>
                    <span class="pill">TensorFlow</span>
                    <span class="pill">PyTorch</span>
                    <span class="pill">OpenCV</span>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 3: Features & Solutions -->
    <div class="page">
        <div class="z-10 h-full flex flex-col">
            <div class="mb-10">
                <span class="text-xs font-bold text-brand-secondary uppercase tracking-widest">Why We Stand Out</span>
                <h2 class="text-3xl font-display font-bold mt-2">Features & Deliverables</h2>
            </div>
            
            <div class="grid grid-cols-2 gap-8 flex-grow">
                <!-- Feature 1 -->
                <div class="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col bg-white">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <h3 class="text-lg font-display font-bold">AI Features</h3>
                        </div>
                    </div>
                    <div class="p-6 flex-grow">
                        <ul class="bullet-list">
                            <li>AI Project Advisor & Idea Generator</li>
                            <li>AI Career Guidance & Resume Builder</li>
                            <li>AI Interview Preparation Bot</li>
                            <li>AI Code Explanation Assistant</li>
                            <li>AI Automated Documentation Setup</li>
                            <li>AI Bug & Error Analyzer</li>
                            <li>AI Personalized Study Planner</li>
                            <li>AI Research & Quiz Assistant</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Feature 2 -->
                <div class="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col bg-white">
                    <div class="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7"></path></svg>
                            <h3 class="text-lg font-display font-bold">Student Features</h3>
                        </div>
                    </div>
                    <div class="p-6 flex-grow">
                        <ul class="bullet-list">
                            <li>Access to 5,000+ Free Project Ideas</li>
                            <li>Highly Affordable & College-Friendly Pricing</li>
                            <li>Transparent Live Project Tracking</li>
                            <li>100% Source Code & Lifetime Access</li>
                            <li>Perfectly Formatted Documentation</li>
                            <li>Step-by-Step Installation Guides</li>
                            <li>Free Expert Consultation Sessions</li>
                            <li>Free Pre-Delivery Code Modifications</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Feature 3 -->
                <div class="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col bg-white">
                    <div class="bg-gradient-to-r from-cyan-600 to-cyan-400 p-6 text-white">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8"></path></svg>
                            <h3 class="text-lg font-display font-bold">Business Solutions</h3>
                        </div>
                    </div>
                    <div class="p-6 flex-grow">
                        <ul class="bullet-list">
                            <li>Tailored Custom Software Development</li>
                            <li>Inventory & HR Management Systems</li>
                            <li>Secure Billing & Attendance Solutions</li>
                            <li>Interactive Admin & Analytics Dashboards</li>
                            <li>Seamless Payment Gateway Integration</li>
                            <li>Legacy System Migration & Upgrades</li>
                            <li>Cloud Hosting & Deployment Strategies</li>
                            <li>Post-Launch Maintenance & Support</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Feature 4 -->
                <div class="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col bg-white">
                    <div class="bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            <h3 class="text-lg font-display font-bold">Project Deliverables</h3>
                        </div>
                    </div>
                    <div class="p-6 flex-grow">
                        <ul class="bullet-list">
                            <li>Complete Unlocked Source Code</li>
                            <li>Exported Database & Config Files</li>
                            <li>Extensive Project Documentation (IEEE)</li>
                            <li>Professional PowerPoint Presentations</li>
                            <li>Project Synopsis & Abstract</li>
                            <li>Comprehensive User & Installation Manuals</li>
                            <li>Detailed API Postman Documentation</li>
                            <li>Video Demonstration of Execution</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 4: Why Us & Resources -->
    <div class="page">
        <div class="z-10 h-full flex flex-col">
            
            <div class="mb-8">
                <h2 class="text-3xl font-display font-bold">Why Choose Arsha?</h2>
            </div>
            
            <div class="grid grid-cols-4 gap-4 mb-8">
                <!-- Mini Cards -->
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-primary mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>
                    <span class="text-xs font-bold">Expert Developers</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-secondary mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <span class="text-xs font-bold">On-Time Delivery</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-accent mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>
                    <span class="text-xs font-bold">Quality Assurance</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-emerald-500 mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div>
                    <span class="text-xs font-bold">24/7 Support</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-primary mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <span class="text-xs font-bold">100% Satisfaction</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-secondary mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <span class="text-xs font-bold">Affordable Pricing</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-brand-accent mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg></div>
                    <span class="text-xs font-bold">Latest Tech</span>
                </div>
                <div class="glass-card !p-4 flex flex-col items-center text-center">
                    <div class="text-emerald-500 mb-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg></div>
                    <span class="text-xs font-bold">Custom Coding</span>
                </div>
            </div>

            <div class="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
                <div class="text-amber-500 mt-1">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                </div>
                <div>
                    <h3 class="text-lg font-display font-bold text-amber-800 mb-2">Special Student Offers</h3>
                    <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-amber-700 font-medium">
                        <li class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Discounts for Final-Year Students</li>
                        <li class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Group Project Discounts</li>
                        <li class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Referral Rewards & Internships</li>
                    </ul>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-4 flex-grow">
                <div class="glass-card">
                    <h3 class="text-base font-display font-bold mb-2 flex items-center gap-2"><svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> Free Resources</h3>
                    <p class="text-xs text-brand-muted leading-relaxed">5,000+ Project Ideas, Learning Roadmaps, Programming Notes, Interview Questions, Coding Challenges, GitHub Resources, Open Source Projects, Career Blogs, Technical Articles, and Premium AI Learning Materials.</p>
                </div>
                
                <div class="glass-card">
                    <h3 class="text-base font-display font-bold mb-2 flex items-center gap-2"><svg class="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8"></path></svg> Industries We Serve</h3>
                    <p class="text-xs text-brand-muted leading-relaxed">Education, Healthcare, Retail, Finance & Banking, Manufacturing, Agriculture, Logistics, Hospitality, Startups, Government, NGOs, and Small Businesses.</p>
                </div>
                
                <div class="glass-card">
                    <h3 class="text-base font-display font-bold mb-2 flex items-center gap-2"><svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Continuous Support</h3>
                    <p class="text-xs text-brand-muted leading-relaxed">Live Chat, WhatsApp, Email, Scheduled Project Updates, Bug Fixes, Remote AnyDesk/TeamViewer Installation, Technical Training Sessions, and Post-Delivery Assistance.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 5: Contact -->
    <div class="page text-white bg-gray-900 !p-0">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0YjU1NjMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djIwaDIwVjM0SDM2ek0xMCAxMGgyMHYyMEgxMFYxMHptMjYgMGgyMHYyMEgzNlYxMHpNMTAgMzRoMjB2MjBIMTBWMzR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20"></div>
        
        <div class="z-10 flex flex-col h-full p-12 relative">
            <div class="text-center mt-12 mb-16">
                <span class="text-sm font-bold text-brand-accent uppercase tracking-widest block mb-4">Start Your Journey</span>
                <h1 class="text-5xl font-display font-bold leading-tight">Let's Build Your<br>Dream Project</h1>
            </div>
            
            <div class="grid grid-cols-2 gap-12 mb-16">
                <!-- Contact Methods -->
                <div class="space-y-8">
                    <div class="flex items-center gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                        <div class="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                            <span class="block text-sm text-gray-400 mb-1">Direct Call / WhatsApp</span>
                            <span class="block text-xl font-bold">+91 83007 99120</span>
                            <span class="block text-xl font-bold">+91 93616 45871</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                        <div class="w-16 h-16 rounded-full bg-brand-secondary flex items-center justify-center">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                        </div>
                        <div>
                            <span class="block text-sm text-gray-400 mb-1">Official Website</span>
                            <span class="block text-lg font-bold text-blue-300">arsha-freelancers.netlify.app</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                        <div class="w-16 h-16 rounded-full bg-brand-accent flex items-center justify-center text-gray-900">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                        </div>
                        <div>
                            <span class="block text-sm text-gray-400 mb-1">AI Advisor & Project Ideas</span>
                            <span class="block text-sm font-bold text-blue-300">arsha-freelancers.netlify.app/advisor</span>
                            <span class="block text-sm font-bold text-blue-300">arsha-freelancers.netlify.app/projects</span>
                        </div>
                    </div>
                </div>
                
                <!-- QR Codes & Social -->
                <div class="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl font-display font-bold mb-6 text-center">Scan to Connect</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Placeholder QR boxes using data uris or just styling -->
                            <div class="bg-white p-3 rounded-xl flex flex-col items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://arsha-freelancers.netlify.app" class="w-full aspect-square bg-gray-200 rounded-lg mb-2" alt="Website QR"/>
                                <span class="text-[10px] font-bold text-gray-800">Website</span>
                            </div>
                            <div class="bg-white p-3 rounded-xl flex flex-col items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/918300799120" class="w-full aspect-square bg-gray-200 rounded-lg mb-2" alt="WhatsApp QR"/>
                                <span class="text-[10px] font-bold text-gray-800">WhatsApp</span>
                            </div>
                            <div class="bg-white p-3 rounded-xl flex flex-col items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://arsha-freelancers.netlify.app/advisor" class="w-full aspect-square bg-gray-200 rounded-lg mb-2" alt="AI Advisor QR"/>
                                <span class="text-[10px] font-bold text-gray-800">AI Advisor</span>
                            </div>
                            <div class="bg-white p-3 rounded-xl flex flex-col items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://arsha-freelancers.netlify.app/projects" class="w-full aspect-square bg-gray-200 rounded-lg mb-2" alt="Projects QR"/>
                                <span class="text-[10px] font-bold text-gray-800">Project Ideas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-auto border-t border-white/10 pt-8 flex justify-between items-center text-sm text-gray-400">
                <p>&copy; 2026 Arsha Freelancers Software Solutions</p>
                <div class="flex gap-4 font-bold tracking-widest uppercase text-[10px] text-gray-300">
                    <span>Innovation</span> &bull; <span>Quality</span> &bull; <span>Excellence</span>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
`;

async function generatePDF() {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Set content and wait for network/styles to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Give external fonts and Tailwind a moment to render
    await new Promise(r => setTimeout(r, 3000));
    
    const outputPath = path.join(__dirname, 'public', 'Arsha_Brochure.pdf');
    
    console.log("Generating Premium PDF to " + outputPath);
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    console.log("Premium PDF generated successfully!");
    await browser.close();
}

generatePDF().catch(console.error);
