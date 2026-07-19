import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, MapPin, Phone, Mail, MessageCircle, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "../utils/animations";

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

  const baseInputClasses = `w-full px-4 py-3.5 rounded-xl text-sm transition-colors border outline-none ${
    darkMode 
      ? 'bg-gray-900/50 border-gray-800 text-white focus:border-blue-500/50 focus:bg-gray-900 placeholder-gray-600' 
      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-white placeholder-gray-400'
  }`;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Let's Start a Conversation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Have a project in mind? Contact our team of experts and let's discuss how we can help your business grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
              <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Office Address</h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>L-4, Staff Quarters Near,<br/>Periyar University Salem - 636011.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>+91 83007 99120</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Mon-Fri 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>info@arshafreelancers.com</p>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/918300799120"
                target="_blank"
                rel="noreferrer"
                className="mt-10 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Form & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Form */}
            <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
              
              {submitted && (
                <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 backdrop-blur-md ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'}`}>
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              )}

              <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Name</label>
                    <input 
                      required type="text" 
                      placeholder="Jane Doe"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className={baseInputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Email</label>
                    <input 
                      required type="email" 
                      placeholder="jane@example.com"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className={baseInputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subject</label>
                  <input 
                    required type="text" 
                    placeholder="How can we help you?"
                    value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                    className={baseInputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Message</label>
                  <textarea 
                    required rows="5" 
                    placeholder="Write your message here..."
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className={baseInputClasses}
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Embedded Map */}
            <div className={`rounded-3xl overflow-hidden h-72 border relative group ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className={`absolute inset-0 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <MapPin className={`w-8 h-8 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
              </div>
              <iframe 
                className={`absolute inset-0 w-full h-full border-0 relative z-10 transition-opacity duration-500 ${darkMode ? 'opacity-80 hover:opacity-100 grayscale hover:grayscale-0' : 'opacity-90 hover:opacity-100 grayscale hover:grayscale-0'}`}
                src="https://maps.google.com/maps?q=Periyar%20University,%20Salem&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen="" 
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
