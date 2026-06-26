import {
  Compass,
  Eye,
  Award,
  Heart,
  MessageCircle,
  Cpu,
  Database,
  Terminal,
} from "lucide-react";

export default function AboutView({ onNavigate }) {
  const coreValues = [
    {
      title: "Academic Authenticity",
      desc: "We strictly write original, clean source codes and non-plagiarized manuals adhering fully to your institution guidelines.",
      icon: Award,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Student Centricity",
      desc: "Our work isn't done at delivery. We stay online past late nights answering examiner prep doubts or doing re-explanations.",
      icon: Heart,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20",
    },
    {
      title: "Excellence & Precision",
      desc: "No generic templates. From ER diagrams to system architectures, everything is generated to industrial norms.",
      icon: Compass,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const technologies = [
    {
      category: "Languages & Frameworks",
      items: [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "C#",
        "PHP",
        "Kotlin",
        "React.js",
        "Node.js",
        "Django",
        "Flask",
        "Flutter",
        "Spring Boot",
      ],
      icon: Terminal,
    },
    {
      category: "Databases & Cloud",
      items: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "AWS S3",
        "Firebase Firestore",
        "Neon",
        "Supabase",
      ],
      icon: Database,
    },
    {
      category: "Specializations & AI",
      items: [
        "TensorFlow",
        "Keras",
        "Scikit-Learn",
        "OpenCV",
        "MediaPipe",
        "NLTK",
        "MQTT IoT Broker",
        "Solidity Web3",
        "Wireshark",
        "Metasploit",
      ],
      icon: Cpu,
    },
  ];

  const journeyMilestones = [
    {
      year: "Year 1",
      title: "Humbling Beginnings",
      desc: "Started as a micro freelance collective assisting 10 local BCA students with simple database scripts.",
    },
    {
      year: "Year 2",
      title: "Expanding the Panel",
      desc: "Onboarded senior software architects. Successfully delivered 50+ final-year BE, B.Tech, and MCA projects.",
    },
    {
      year: "Year 3",
      title: "IEEE Focus Group",
      desc: "Engineered robust algorithms replicating international research papers, becoming Salem's top research guidance provider.",
    },
    {
      year: "Year 4 & Beyond",
      title: "SaaS & EdTech Platform",
      desc: "Reached the milestone of supporting 250+ scholars. Fully structured as Arsha Freelancers Software Solutions.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-16 pt-8 text-left">
      {/* 1. HERO HEADER */}
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-950 bg-neo-yellow px-3 py-1.5 rounded-full brutalist-border-sm">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
          Empowering Students Through Innovation & Academic Excellence
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Arsha Freelancers Software Solutions bridges the divide between
          university curricula and live industrial coding structures,
          transforming complex concepts into successful grades and practical
          skills.
        </p>
      </section>

      {/* 2. CORE BRIEF & PHOTO PLACEHOLDER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Narrative */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
            Our Identity & Mission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Arsha Freelancers Software Solutions was founded in Salem, Tamil
            Nadu, with a straightforward aspiration: to alleviate the high
            friction, fear, and ambiguity associated with academic projects and
            technical thesis writing.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Over the past four years, we've realized that students struggle not
            due to lack of intellect, but due to a gap in practical software
            development mentorship. Our seasoned engineers provide continuous
            supervision, source codes walkthroughs, and precise reports
            complying with complex university chapters.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-neo-cyan text-slate-950 p-4 rounded-xl brutalist-border-sm font-bold">
              <span className="block text-2xl font-black text-slate-950">
                250+
              </span>
              <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest">
                Alumni Supported
              </span>
            </div>
            <div className="bg-neo-yellow text-slate-950 p-4 rounded-xl brutalist-border-sm font-bold">
              <span className="block text-2xl font-black text-slate-950">
                98%
              </span>
              <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest">
                O/A grade success
              </span>
            </div>
          </div>
        </div>

        {/* Vision & Mission bento */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-neo-pink text-slate-950 p-6 rounded-2xl brutalist-border">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white text-slate-950 rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-950">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  To provide premium technical guidance, high-scoring
                  documentation, and practical code structures that empower
                  every student to confidently explain their software and score
                  stellar grades.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neo-lime text-slate-950 p-6 rounded-2xl brutalist-border">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-white text-slate-950 rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-950">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  To become India's most trusted, student-centric academic
                  software guidance platform, recognized for high-performance
                  integrations, premium presentations, and absolute educational
                  integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
            Our Core Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            The non-negotiable principles that shape our development workflows
            daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl brutalist-border text-left"
            >
              <div className="p-3 w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-neo-yellow text-slate-950 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-950 dark:text-slate-100 tracking-tight mb-2">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNOLOGIES WE WORK WITH */}
      <section className="bg-neo-purple/10 dark:bg-slate-900/40 p-8 sm:p-10 rounded-3xl brutalist-border space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-950 bg-neo-cyan px-2.5 py-1 rounded-md border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
            Enterprise Ready Skills
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight pt-2">
            Technologies We Specialize In
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            No code simulation is too ancient or complex for our active engineer
            panel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-slate-950">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl brutalist-border-sm space-y-4"
            >
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-neo-orange text-slate-950 rounded-lg border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  <tech.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-slate-100 uppercase tracking-wider">
                  {tech.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STUDENT SUCCESS JOURNEY (Timeline summary) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-slate-50 tracking-tight">
            Our Growth Story
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            From custom project scripts to a premium full-suite academic
            solutions platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {journeyMilestones.map((ms, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl brutalist-border relative text-left"
            >
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-slate-950 bg-neo-yellow px-2 py-0.5 rounded border border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                {ms.year}
              </div>
              <h3 className="text-sm font-black text-slate-950 dark:text-slate-100 tracking-tight mb-2 pt-2">
                {ms.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {ms.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About View Final Action */}
      <section className="text-center pt-4">
        <div className="inline-flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate("projects")}
            className="px-6 py-3 bg-neo-purple text-slate-950 font-black text-xs rounded-xl brutalist-border"
          >
            Explore Student Project Library
          </button>
          <a
            href="https://wa.me/918300799120?text=Hi+Arsha+Freelancers%2C+I+read+about+your+mission+on+the+About+Page+and+would+love+to+consult+with+an+expert."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-neo-green text-slate-950 font-black text-xs rounded-xl brutalist-border"
          >
            <MessageCircle className="w-4 h-4" />
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
