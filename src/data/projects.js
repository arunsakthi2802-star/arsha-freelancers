const baseProjects = [
  {
    id: "PRJ-001",
    title: "AI-Powered Medical Resume Screening & Parser",
    description:
      "An automated screening system using NLP and Machine Learning to parse, extract, and grade resumes against healthcare job descriptions.",
    technology: ["Python", "NLTK", "Flask", "React", "Tailwind CSS"],
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    duration: "4 Weeks",
    features: [
      "PDF text extraction",
      "NLP skill matching",
      "Ranking algorithm",
      "Dashboard analytics",
    ],
    department: "MCA",
  },
  {
    id: "PRJ-002",
    title: "Smart Attendance System using Facial Recognition",
    description:
      "Real-time attendance management system using OpenCV facial embedding models, auto-generating Excel sheets and sending SMS alerts to parents.",
    technology: ["Python", "OpenCV", "TensorFlow", "SQLite", "Tkinter"],
    category: "Machine Learning",
    difficulty: "Intermediate",
    duration: "3 Weeks",
    features: [
      "Real-time camera detection",
      "Face registration",
      "Automatic CSV reports",
      "Parent SMS trigger",
    ],
    department: "CS",
  },
  {
    id: "PRJ-003",
    title: "Decentralized Crowdfunding Platform on Ethereum",
    description:
      "A secure, transparent Web3 portal where creators launch campaigns and backers fund them via smart contracts with multi-signature milestones.",
    technology: ["Solidity", "React", "Ethers.js", "Hardhat", "Metamask"],
    category: "Blockchain",
    difficulty: "Advanced",
    duration: "6 Weeks",
    features: [
      "Smart contract funds release",
      "Milestone voting",
      "Low gas optimization",
      "NFT donor rewards",
    ],
    department: "IT",
  },
  {
    id: "PRJ-004",
    title: "Predictive Crop Yield & Soil Health Management",
    description:
      "An IoT-coupled agricultural prediction tool analyzing moisture, NPK values, and climate forecasts to suggest ideal seed and fertilizer types.",
    technology: ["Python", "Scikit-Learn", "IoT Sensors", "Flask", "Chart.js"],
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "4 Weeks",
    features: [
      "Real-time NPK readings",
      "Crop recommendations",
      "Price forecasting",
      "Fertilizer dosage recommendations",
    ],
    department: "BCA",
  },
  {
    id: "PRJ-005",
    title: "Cyber Threat Detection & SIEM Dashboard",
    description:
      "A high-fidelity log analysis dashboard monitoring network packets, flagging intrusion signatures (DDoS, Brute force), and raising instant triggers.",
    technology: ["Python", "Scapy", "React", "Node.js", "Socket.io"],
    category: "Cybersecurity",
    difficulty: "Advanced",
    duration: "5 Weeks",
    features: [
      "PCAP packet inspection",
      "IP Geolocation lookup",
      "Visual alert sirens",
      "Slack integration alerts",
    ],
    department: "IT",
  },
  {
    id: "PRJ-006",
    title: "Automated Hospital Management & Patient Portal",
    description:
      "A comprehensive MERN stack application designed for doctor scheduling, digital prescription storage, billing, and queue management.",
    technology: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
    category: "MERN Stack",
    difficulty: "Intermediate",
    duration: "3 Weeks",
    features: [
      "Appointment booking engine",
      "Virtual prescriptions",
      "PDF billing receipts",
      "Interactive floor maps",
    ],
    department: "MCA",
  },
  {
    id: "PRJ-007",
    title: "IoT-Based Intelligent Traffic Flow Controller",
    description:
      "A simulation of traffic lights that dynamically adjust green light timers based on vehicle density calculated from infrared sensor counts.",
    technology: ["Arduino", "Raspberry Pi", "Python", "MQTT Broker", "Tkinter"],
    category: "IoT",
    difficulty: "Intermediate",
    duration: "4 Weeks",
    features: [
      "Density calculation",
      "Emergency vehicle overrides",
      "Central monitoring server",
      "Solar backup control logic",
    ],
    department: "ECE",
  },
  {
    id: "PRJ-008",
    title: "Phishing Attack Detection & Guard Extension",
    description:
      "A web browser extension leveraging heuristic models and machine learning to scan page DOMs and URLs for phishing attributes.",
    technology: [
      "JavaScript",
      "Python",
      "Flask",
      "TensorFlow.js",
      "Chrome API",
    ],
    category: "Cybersecurity",
    difficulty: "Advanced",
    duration: "4 Weeks",
    features: [
      "Real-time URL checking",
      "Social engineering heuristics",
      "Popup warning blockers",
      "User reporting portal",
    ],
    department: "CS",
  },
  {
    id: "PRJ-009",
    title: "Secure Cloud-Based File Storage with Dynamic Keys",
    description:
      "A secure cloud storage platform with hybrid cryptography (AES & RSA), encrypting files client-side before uploading to cloud space.",
    technology: ["React", "Node.js", "AWS S3", "Web Crypto API", "MongoDB"],
    category: "Cloud Computing",
    difficulty: "Advanced",
    duration: "5 Weeks",
    features: [
      "Client-side RSA key generation",
      "Encrypted file streaming",
      "Dynamic link sharing",
      "Automated file shredding",
    ],
    department: "IT",
  },
  {
    id: "PRJ-010",
    title: "E-Commerce Logistics & Driver Fatigue Monitor",
    description:
      "A mobile Flutter app paired with an in-cab camera to detect facial fatigue patterns in logistics drivers, sounding alarms and reporting logs.",
    technology: [
      "Flutter",
      "Dart",
      "Firebase",
      "Python (Fatigue Detection)",
      "OpenCV",
    ],
    category: "Android",
    difficulty: "Advanced",
    duration: "5 Weeks",
    features: [
      "Yawning & eye blink ratio check",
      "Offline tracking capabilities",
      "Alert sirens for driver",
      "Manager panel telemetry",
    ],
    department: "MCA",
  },
  {
    id: "PRJ-011",
    title: "Student Learning Management System (LMS)",
    description:
      "A virtual classroom platform featuring interactive assignment tracking, automated grading for quizzes, and forum discussions.",
    technology: ["React", "Node.js", "Express.js", "PostgreSQL", "Socket.io"],
    category: "Full Stack",
    difficulty: "Intermediate",
    duration: "3 Weeks",
    features: [
      "Automatic quiz evaluation",
      "Real-time whiteboard",
      "Attendance logger",
      "Progress visual charts",
    ],
    department: "BCA",
  },
  {
    id: "PRJ-012",
    title: "Network Intrusion Detection System (NIDS)",
    description:
      "Sniffs network cards, analyzes metrics with random forest classification, and flags anomalies or malicious port scan behavior.",
    technology: ["Python", "Scipy", "Scikit-Learn", "MySQL", "React Dashboard"],
    category: "Networking",
    difficulty: "Advanced",
    duration: "5 Weeks",
    features: [
      "Live network sniffer",
      "Machine learning packet evaluation",
      "Intruder IP isolation",
      "Log history archive",
    ],
    department: "CS",
  },
  {
    id: "PRJ-013",
    title: "Smart Home Energy Grid Monitor",
    description:
      "A hardware-software platform logging energy spikes and patterns across household devices, recommending power-saving scheduling.",
    technology: ["Raspberry Pi", "React Native", "Firebase", "Python", "MQTT"],
    category: "IoT",
    difficulty: "Advanced",
    duration: "4 Weeks",
    features: [
      "Appliance energy log",
      "Abnormal load trip switch",
      "Weekly consumption predictions",
      "Cost estimates in local currency",
    ],
    department: "EEE",
  },
  {
    id: "PRJ-014",
    title: "Voice-Controlled Interactive Sign Language Aid",
    description:
      "An assistive application converting audio speech to instant sign language illustrations and hand gestures, or camera-read signs to text.",
    technology: ["Python", "MediaPipe", "OpenCV", "Flutter", "Web Speech API"],
    category: "Python",
    difficulty: "Intermediate",
    duration: "4 Weeks",
    features: [
      "Real-time visual playback",
      "Customizable sign avatar",
      "Voice commands parsing",
      "Educational quiz module",
    ],
    department: "CS",
  },
  {
    id: "PRJ-015",
    title: "Automated Resume Matcher & ATS Optimizer",
    description:
      "An intelligent platform for matching resumes against competitive positions, providing automated rewrite instructions for high ATS scoring.",
    technology: ["Python", "NLP", "Flask", "React", "Tailwind CSS"],
    category: "Python",
    difficulty: "Beginner",
    duration: "2 Weeks",
    features: [
      "Keyword denseness analyzer",
      "ATS standard formatter",
      "One-click layout download",
      "Skill gap feedback",
    ],
    department: "BCA",
  },
  {
    id: "PRJ-016",
    title: "Digital Forensics Image Log Integrity Checker",
    description:
      "Verifies the pixel-level integrity of surveillance captures and stores tamper-evident cryptographic hashes across a secure database.",
    technology: ["Java", "SHA-256", "Spring Boot", "PostgreSQL", "React"],
    category: "Java",
    difficulty: "Intermediate",
    duration: "3 Weeks",
    features: [
      "Metadata extraction & checking",
      "Batch file hashing",
      "Security log ledger",
      "Integrity warning badge",
    ],
    department: "CS",
  },
  {
    id: "PRJ-017",
    title: "Predictive Analytics for Retail Customer Churn",
    description:
      "An interactive dashboard enabling managers to upload sales files and view high-probability churn alerts with actionable target campaigns.",
    technology: ["Python", "Pandas", "Streamlit", "XGBoost", "React"],
    category: "Data Science",
    difficulty: "Intermediate",
    duration: "3 Weeks",
    features: [
      "CSV/Excel mass parsing",
      "Churn probability score",
      "Promotional message compiler",
      "Customer cluster segments",
    ],
    department: "MBA",
  },
];

export const departmentSuggestions = {
  CS: [
    "Smart Attendance System using Facial Recognition",
    "Phishing Attack Detection & Guard Extension",
    "Network Intrusion Detection System (NIDS)",
    "Voice-Controlled Interactive Sign Language Aid",
    "Digital Forensics Image Log Integrity Checker",
  ],
  IT: [
    "Decentralized Crowdfunding Platform on Ethereum",
    "Cyber Threat Detection & SIEM Dashboard",
    "Secure Cloud-Based File Storage with Dynamic Keys",
  ],
  MCA: [
    "AI-Powered Medical Resume Screening & Parser",
    "Automated Hospital Management & Patient Portal",
    "E-Commerce Logistics & Driver Fatigue Monitor",
  ],
  BCA: [
    "Predictive Crop Yield & Soil Health Management",
    "Student Learning Management System (LMS)",
    "Automated Resume Matcher & ATS Optimizer",
  ],
  ECE: [
    "IoT-Based Intelligent Traffic Flow Controller",
    "Smart Home Energy Grid Monitor",
  ],
  EEE: ["Smart Home Energy Grid Monitor"],
  MBA: [
    "Predictive Analytics for Retail Customer Churn",
    "Resume Matcher & ATS Optimizer",
  ],
};

// --- 5000 GENERATED PROJECTS ---
const TECH_PREFIXES = [
            "AI-Powered", "IoT-Based", "Blockchain-Enabled", "Smart", "Cloud-Based", 
            "Decentralized", "Automated", "Predictive", "Real-Time", "Mobile-First",
            "Data-Driven", "Web3", "Machine Learning", "Serverless", "Edge-Computing",
            "AR/VR", "5G-Enabled", "Autonomous", "Vision-Based", "Voice-Controlled",
            "Cross-Platform", "Open-Source", "Next-Gen", "Scalable", "Distributed"
        ];
const FUNCTIONS = [
            "Monitoring System", "Tracking Platform", "Management Tool", "Detection Engine", 
            "Analysis Dashboard", "Optimization Application", "Recommendation System", 
            "Reporting Portal", "Automation Network", "Forecasting Model",
            "Analytics Hub", "Decision Support System", "Virtual Assistant", "Resource Allocator",
            "Feedback Loop", "Control Interface", "Diagnostic Tool", "Alert Mechanism",
            "Verification Ledger", "Collaboration Workspace"
        ];
const SUBJECTS = {
            "Healthcare & Telemedicine": ["Patient Care", "Disease Outbreak", "Clinical Resource", "Medicine Supply", "Tele-consultation", "Vitals", "Mental Wellbeing", "Vaccine Distribution", "Maternal Health", "Medical Record"],
            "Agriculture & Food Security": ["Crop Yield", "Soil Health", "Weather Pattern", "Livestock", "Fertilizer Usage", "Irrigation", "Farm Machinery", "Seed Distribution", "Commodity Price", "Harvest Storage"],
            "Education & Skill Development": ["Student Performance", "E-Learning", "Exam Grading", "Skill Development", "Curriculum", "Attendance", "Career Counseling", "Special Education", "Library Resources", "Campus Safety"],
            "Environment & Sustainability": ["Air Quality", "Water Pollution", "Deforestation", "Waste Recycling", "Carbon Emission", "Energy Consumption", "Wildlife Conservation", "Noise Level", "Renewable Energy", "Climate Change"],
            "Disaster Management & Safety": ["Flood Alert", "Earthquake Rescue", "Evacuation Route", "Relief Material", "Cyclone Warning", "Structural Health", "Fire Emergency", "Volunteer Dispatch", "Hazard Risk", "Crisis Communication"],
            "Smart City & E-Governance": ["Traffic Flow", "Street Lighting", "Waste Collection", "Public Transit", "Parking Space", "Civic Grievance", "Water Supply", "Energy Grid", "Public Space Safety", "Municipal Infrastructure"],
            "Accessibility & Inclusion": ["Visual Impairment", "Hearing Aid", "Mobility Assistance", "Sign Language", "Speech Therapy", "Cognitive Support", "Wheelchair Routing", "Braille Learning", "Autism Care", "Accessible Transit"],
            "Financial Inclusion & Livelihood": ["Micro-Loan", "Remittance", "Expense Tracking", "Financial Literacy", "Credit Scoring", "Chit-Fund", "Insurance Claim", "Gig Worker Payout", "Street Vendor Sales", "Rural Banking"],
            "Transportation & Logistics": ["Fleet Route", "Public Bus", "Cargo Delivery", "Road Condition", "Electric Vehicle", "Traffic Accident", "Driver Fatigue", "Logistics", "Toll Collection", "Commuter Ride"],
            "Data Security & Privacy": ["Data Privacy", "Cyber Threat", "Identity Fraud", "Phishing Attack", "Network Intrusion", "Access Control", "Ransomware", "Secure Messaging", "Endpoint Security", "System Vulnerability"]
        };
const META = {
            "Healthcare & Telemedicine": {
                stack: ["Python, Flask, TensorFlow (CNN), MySQL, React", "Flutter, Firebase, TensorFlow Lite", "Node.js, MongoDB, React Native, WebRTC"],
                users: "patients, primary health center staff, and doctors in remote regions",
                existing: "Most public clinics rely on manual registers and physical walk-ins. Diagnostic workflows depend on specialist availability, leading to severe delays.",
                impact: "Reduces travel time for underserved patients and enables early detection, directly lowering mortality risks and healthcare costs."
            },
            "Agriculture & Food Security": {
                stack: ["IoT (ESP32/Sensors), Android App, Firebase", "Python, Machine Learning (XGBoost), Flask, React", "Solidity, Web3.js, Node.js, MongoDB"],
                users: "small/marginal farmers, cooperative societies, and agronomists",
                existing: "Farmers depend on guesswork or local middlemen for input decisions and price discovery, leading to reduced yields and unfair margins.",
                impact: "Improves crop yield and farmer income by providing data-driven insights and direct market access, supporting sustainable farming."
            },
            "Education & Skill Development": {
                stack: ["React, Node.js, MongoDB, Express", "Python, NLP (spaCy), Django, PostgreSQL", "Android (Kotlin), SQLite (Offline-first), Firebase"],
                users: "government school students, first-generation learners, and rural educators",
                existing: "E-learning platforms demand high-speed internet. Public schools teach at a single pace, leaving slow learners behind.",
                impact: "Narrows the urban-rural education gap by bringing personalized, accessible, and offline-capable learning to low-resource regions."
            },
            "Environment & Sustainability": {
                stack: ["Python, GIS/Rasterio, Flask, React", "IoT (Air/Water sensors), NodeMCU, ThingSpeak", "Node.js, Mapbox, MongoDB, React"],
                users: "environmental NGOs, local municipalities, and eco-conscious citizens",
                existing: "Pollution and deforestation tracking relies on sparse manual surveys or delayed media reports rather than real-time localized data.",
                impact: "Empowers rapid policy and enforcement actions against ecological damage, and encourages sustainable habits among citizens."
            },
            "Disaster Management & Safety": {
                stack: ["Python, ML (LSTM time-series), GIS, Flask", "Android, Firebase, Google Maps API, SMS Gateway", "React Native, Node.js, Socket.io"],
                users: "disaster response teams, vulnerable coastal/hill communities, and local authorities",
                existing: "Alerts are unpersonalized and broad. Relief distribution and damage assessment are manual, leading to delays and duplicate efforts.",
                impact: "Minimizes loss of life through hyperlocal early warnings and optimizes the routing of critical relief resources during chaos."
            },
            "Smart City & E-Governance": {
                stack: ["React, Node.js, MongoDB, GIS mapping", "Blockchain (Hyperledger), Express, React", "Python, Computer Vision, Flask, MySQL"],
                users: "municipal administrators, ward officers, and everyday citizens",
                existing: "Civic complaints are paper-based and untrackable. Infrastructure faults are only fixed when heavily escalated by frustrated citizens.",
                impact: "Increases government transparency, reduces bureaucratic delays, and creates a data-driven approach to maintaining public infrastructure."
            },
            "Accessibility & Inclusion": {
                stack: ["Python, MediaPipe/OpenCV, Android App", "Flutter, Web Speech API, Firebase", "Arduino/Raspberry Pi, Sensors, Python"],
                users: "visually, hearing, or mobility impaired individuals and their caregivers",
                existing: "Digital and physical infrastructure is rarely designed inclusively, forcing disabled individuals into dependency for routine tasks.",
                impact: "Restores independence and dignity to disabled users, allowing better participation in education, employment, and society."
            },
            "Financial Inclusion & Livelihood": {
                stack: ["Python, ML (Credit Scoring), Django, PostgreSQL", "Android, Voice API, Firebase", "Solidity, Ethereum Testnet, React, Node"],
                users: "unbanked individuals, daily wage earners, and migrant workers",
                existing: "Traditional banks ignore users without formal credit histories. Migrants lose significant money to informal remittance channels.",
                impact: "Frees low-income earners from exploitative money lenders and provides transparent, low-cost access to welfare and savings."
            },
            "Transportation & Logistics": {
                stack: ["Android (Kotlin), GPS API, Firebase", "Python, ML (Computer Vision), Flask", "React, Node.js, Socket.io, MongoDB"],
                users: "daily commuters, public transit authorities, and logistics companies",
                existing: "Public transit lacks real-time tracking. Traffic enforcement is manual, and supply chain inefficiencies lead to massive resource waste.",
                impact: "Reduces wait times, improves road safety through automation, and cuts carbon emissions via optimized routing and logistics."
            },
            "Data Security & Privacy": {
                stack: ["Python, NLP/Transformers, Flask", "Node.js, React, Cryptography Libraries", "Machine Learning (Anomaly Detection), Django"],
                users: "NGOs, vulnerable populations, everyday internet users, and small businesses",
                existing: "High-end cybersecurity tools are too expensive for NGOs or individuals, leaving them completely vulnerable to data leaks and fraud.",
                impact: "Democratizes digital safety, protecting sensitive user data and ensuring democratic processes remain untampered by bad actors."
            }
        };

const DEPARTMENTS = ['CSE', 'IT', 'AI&DS', 'AI&ML', 'Cybersecurity', 'CSBS', 'MCA', 'BCA', 'ECE', 'EEE', 'MBA'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['2 Weeks', '3 Weeks', '4 Weeks', '5 Weeks', '6 Weeks'];

const generatedProjects = [];
let sno = 18; // base projects has 17

Object.keys(SUBJECTS).forEach(category => {
  const catSubjects = SUBJECTS[category];
  const meta = META[category];
  
  TECH_PREFIXES.forEach((tech, tIdx) => {
    FUNCTIONS.forEach((func, fIdx) => {
      const subject = catSubjects[(tIdx + fIdx) % 10];
      const title = `${tech} ${subject} ${func}`;
      
      const stackString = meta.stack[sno % meta.stack.length];
      const technology = stackString.split(',').map(s => s.trim());
      
      const categoryName = category.split('&')[0].trim().toLowerCase();
      const description = `The "${title}" is a specialized software engineering initiative targeting ${categoryName} challenges. Designed specifically for ${meta.users}, it utilizes modern IT frameworks to replace manual inefficiencies with scalable automation.`;
      
      const details = `Core Architecture involves: (1) Secure Authentication, (2) The core processing engine using ${technology[0]}, (3) Database management via ${technology[technology.length-1]}, and (4) An administrative dashboard for real-time overview. Tested for high availability and low latency. Recommended complete stack: ${stackString}.`;
      
      generatedProjects.push({
        id: `PRJ-${sno.toString().padStart(4, '0')}`,
        title: title,
        description: description,
        technology: technology,
        category: category,
        difficulty: DIFFICULTIES[sno % DIFFICULTIES.length],
        duration: DURATIONS[sno % DURATIONS.length],
        features: [
            'Secure Authentication',
            'Real-time Dashboard',
            'Automated Reporting',
            'Scalable Database'
        ],
        department: DEPARTMENTS[sno % DEPARTMENTS.length],
        details: details,
        impact: meta.impact,
        existing: meta.existing
      });
      sno++;
    });
  });
});

export const studentProjects = [...baseProjects, ...generatedProjects];
