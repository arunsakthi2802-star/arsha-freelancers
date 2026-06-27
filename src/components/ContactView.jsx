import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";
import { submitContact } from "../api/contact.api";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    department: "CS",
    serviceRequired: "Final Year Projects",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedGeneralInquiries, setSavedGeneralInquiries] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("arsha_general_inquiries");
    if (raw) {
      try {
        setSavedGeneralInquiries(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Save to MongoDB via API (non-blocking)
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.serviceRequired || "General Enquiry",
        message: `College: ${formData.college} | Dept: ${formData.department}\n\n${formData.message}`,
      });
    } catch (err) {
      console.warn("API submit failed, continuing with WhatsApp:", err.message);
    }

    const text = `Hi Arsha Freelancers! My name is ${formData.name || "Student"}. I want to inquire about *${formData.serviceRequired}* for my studies at *${formData.college || "my college"}*. Here are my guidelines: ${formData.message || "Please consult me."}`;
    const whatsappUrl = `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        college: "",
        department: "CS",
        serviceRequired: "Final Year Projects",
        message: "",
      });
      setFormSubmitted(false);
    }, 4000);
  };

  const getWhatsAppLink = () => {
    const text = `Hi Arsha Freelancers! My name is ${formData.name || "Student"}. I want to inquire about *${formData.serviceRequired}* for my studies at *${formData.college || "my college"}*. Here are my guidelines: ${formData.message || "Please consult me."}`;
    return `https://wa.me/918300799120?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8 text-left">
      {/* Header */}
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200">
          Connect With Us
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          We Are Ready to Bring Your Project to Life
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Submit your requirements through our secure form, drop by our Salem
          office, or click the WhatsApp button for an instant discussion with
          our academic counselor.
        </p>
      </section>

      {/* Grid: Contact Details & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Details Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border-2 border-slate-950 space-y-6 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
            <h3 className="text-xl font-black tracking-tight border-b border-slate-800 pb-3">
              Office Contact Details
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-blue-600 rounded-xl flex-shrink-0 text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">
                    Active Counselor Phone
                  </h4>
                  <a
                    href="tel:+918300799120"
                    className="text-white hover:text-blue-400 font-bold tracking-wide"
                  >
                    +91 83007 99120
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-cyan-500 rounded-xl flex-shrink-0 text-slate-950">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">
                    Academic Email
                  </h4>
                  <a
                    href="mailto:arshatech06@gmail.com"
                    className="text-white hover:text-cyan-400 font-bold tracking-wide"
                  >
                    arshatech06@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-purple-600 rounded-xl flex-shrink-0 text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">
                    Corporate Office
                  </h4>
                  <p className="text-white font-bold leading-relaxed">
                    Salem, Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 border-t border-slate-800 pt-4 mt-4">
                <div className="p-2.5 bg-slate-800 rounded-xl flex-shrink-0 text-slate-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">
                    Support Consultation Hours
                  </h4>
                  <p className="text-white font-bold leading-relaxed">
                    Monday – Sunday:{" "}
                    <span className="text-yellow-400">9:00 AM – 10:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Connect with our social channels:
              </h4>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-pink-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-slate-950 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (pointing to Salem, Tamil Nadu, India) */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm aspect-video relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.06915222718!2d78.07722320493635!3d11.65345995252033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!2sSalem%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1563219201948!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salem Tamil Nadu Google Map Office Location"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:shadow-none relative overflow-hidden">
            {formSubmitted && (
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-30 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-2xl font-black mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-950 dark:text-white font-sans">
                  Inquiry Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed font-sans">
                  Hello,{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formData.name}
                  </span>
                  ! Your educational inquiry for{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formData.serviceRequired}
                  </span>{" "}
                  has been logged. Our student counselor will notify your email
                  (
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formData.email}
                  </span>
                  ) and call your mobile within 2 hours.
                </p>
              </div>
            )}

            <h3 className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-none mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Submit Direct Inquiry
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-slate-500">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Anand R"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 83007 99120"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. arshatech06@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>
              </div>

              {/* College & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    College Name *
                  </label>
                  <input
                    type="text"
                    name="college"
                    required
                    placeholder="e.g. Sona College of Technology"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-black uppercase text-slate-500">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                  >
                    <option value="CS">B.Sc / BE Computer Science (CS)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="MCA">M.C.A Post-Graduate</option>
                    <option value="BCA">B.C.A Graduate</option>
                    <option value="ECE">ECE / EEE Electronics</option>
                    <option value="Polytechnic">Polytechnic / Diploma</option>
                    <option value="MBA">M.B.A Management</option>
                  </select>
                </div>
              </div>

              {/* Service Required */}
              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-slate-500">
                  Service Required *
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-bold cursor-pointer"
                >
                  <option value="Final Year Projects">
                    Final Year Academic Projects
                  </option>
                  <option value="Mini Projects">
                    Mini Projects (Semester Level)
                  </option>
                  <option value="Project Reports & Documentation">
                    Project Reports & Documentation
                  </option>
                  <option value="Internship Reports Support">
                    Internship Reports Support
                  </option>
                  <option value="Seminar / Project PPT Design">
                    Seminar / Project PPT Design
                  </option>
                  <option value="Custom Web / Mobile Application">
                    Custom Web / Mobile Application
                  </option>
                  <option value="Career Services / ATS Resume">
                    Career Services & ATS Resume
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-black uppercase text-slate-500">
                  Syllabus Requirements or Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project topic, required technologies, final submission dates, or any special requests."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  type="submit"
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl border border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl border border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Inquiry
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Local storage registered inquiries visualization */}
      {savedGeneralInquiries.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Your registered general inquiries ({savedGeneralInquiries.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedGeneralInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2"
              >
                <div className="flex justify-between items-center font-bold">
                  <span className="text-blue-600 font-mono">{inq.id}</span>
                  <span className="text-[10px] text-slate-400">
                    {inq.createdAt}
                  </span>
                </div>
                <p className="font-extrabold text-slate-800 dark:text-slate-150 leading-tight">
                  Service: {inq.serviceRequired}
                </p>
                <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
                  {inq.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
