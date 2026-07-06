import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactView({ darkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 bg-transparent`}>
      
      {/* Background Orbs */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Let's Start a <span className="text-gradient-primary">Conversation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Have a project in mind? Contact our team of experts and let's discuss how we can help your business grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Office Address</h4>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>123 Tech Park Avenue,<br/>Innovation District, CA 94043</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Phone</h4>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>+91 83007 99120</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mon-Fri 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Email</h4>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>contact@arshafreelancers.com</p>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/918300799120"
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Form & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Form */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {submitted && (
                <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 z-20 flex flex-col items-center justify-center text-center p-6 backdrop-blur">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your Name</label>
                    <input 
                      required type="text" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50/40 backdrop-blur-md border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your Email</label>
                    <input 
                      required type="email" 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50/40 backdrop-blur-md border-slate-200 text-slate-900'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Subject</label>
                  <input 
                    required type="text" 
                    value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50/40 backdrop-blur-md border-slate-200 text-slate-900'}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                  <textarea 
                    required rows="4" 
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-blue-500' : 'bg-slate-50/40 backdrop-blur-md border-slate-200 text-slate-900'}`}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>

            {/* Embedded Map */}
            <div className="glass-card rounded-2xl overflow-hidden h-64 border border-slate-200 dark:border-slate-800 relative group">
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                {/* Fallback visual if iframe fails */}
                <MapPin className="w-12 h-12 text-slate-400" />
              </div>
              <iframe 
                className="absolute inset-0 w-full h-full border-0 relative z-10 opacity-90 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.811652033837!2d76.9960!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3N8KwNTknNDUuNiJF!5e0!3m2!1sen!2sin!4v1625560938383!5m2!1sen!2sin" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
