import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function Pricing({ darkMode, onGetQuoteClick }) {
  const plans = [
    {
      name: "Basic",
      desc: "Perfect for students and small projects.",
      price: "₹2799",
      features: [
        "Academic Project Code",
        "Basic Documentation",
        "1 Revision",
        "Email Support",
        "Standard Delivery (7 Days)"
      ],
      highlight: false,
    },
    {
      name: "Professional",
      desc: "Ideal for startups and comprehensive projects.",
      price: "₹5999",
      features: [
        "Full-Stack Web App",
        "IEEE Standard Report",
        "3 Revisions",
        "Viva/Presentation Prep",
        "Priority WhatsApp Support",
        "Fast Delivery (3 Days)"
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      desc: "For large scale businesses and complex software.",
      price: "Custom",
      features: [
        "Custom Architecture (AWS/Azure)",
        "AI/ML Integration",
        "Unlimited Revisions",
        "Dedicated Tech Lead",
        "24/7 SLA Support",
        "Post-Launch Maintenance"
      ],
      highlight: false,
    },
  ];

  return (
    <section className={`py-24 relative overflow-hidden bg-transparent`}>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Transparent <span className="text-gradient-primary">Pricing</span>
          </motion.h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Premium quality software development at competitive rates. Choose the plan that fits your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative glass-card rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight 
                  ? 'border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] transform md:-translate-y-4' 
                  : `border ${darkMode ? 'border-slate-800' : 'border-slate-200'}`
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm h-10 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
              </div>
              
              <div className="mb-8">
                <span className={`text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                {plan.price !== "Custom" && <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/project</span>}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-500 font-bold" />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={onGetQuoteClick}
                className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700'
                    : `glass hover:bg-blue-50 hover:text-blue-600 ${darkMode ? 'text-white' : 'text-slate-900'}`
                }`}
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
