require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Service = require("./models/Service");

const connectDB = require("./config/db");

const seedData = async () => {
  await connectDB();

  console.log("🌱 Starting database seed...");

  // Create admin user
  // Create or Update admin user
  let admin = await User.findOne({ email: "arunsakthi2802@gmail.com" });
  if (!admin) {
    admin = new User({
      email: "arunsakthi2802@gmail.com",
      role: "admin",
      college: "Arsha Freelancers",
      department: "Management",
    });
  }
  admin.fullName = "Arsha Freelancer";
  admin.phone = "+918300799120";
  admin.password = "Arsha@admin202606"; // will be hashed by pre-save hook
  admin.status = "active";
  
  await admin.save();
  console.log(`✅ Admin seeded/updated: ${admin.email} | Name: ${admin.fullName} | Password: Arsha@admin202606`);

  // Create sample student user
  const existingUser = await User.findOne({ email: "student@arsha.com" });
  if (!existingUser) {
    const student = await User.create({
      fullName: "Ganesh Kumar",
      email: "student@arsha.com",
      phone: "+919876543210",
      password: "Arsha@Student2024",
      role: "user",
      college: "Sona College of Technology",
      department: "CSE",
      status: "active",
      projectTitle: "IoT Smart Agriculture System",
      driveLink: "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j",
    });
    console.log(`✅ Sample Student created: ${student.email} | Password: Arsha@Student2024`);
  } else {
    console.log(`ℹ️  Student already exists: ${existingUser.email}`);
  }

  // Seed default services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    const services = [
      {
        serviceName: "Final Year Academic Projects",
        description: "Complete IEEE-standard final year projects with full source code, documentation, and presentation support for B.E, B.Tech, MCA, BCA, and M.E students.",
        icon: "GraduationCap",
        price: "₹2,500 – ₹15,000",
        features: ["Full Source Code", "IEEE Documentation", "PPT Slides", "Demo Video", "6 months support"],
        status: "active",
        order: 1,
      },
      {
        serviceName: "IoT & Embedded Systems",
        description: "Hardware + software projects using Arduino, Raspberry Pi, NodeMCU, and ESP32 with real-world sensor integrations.",
        icon: "Cpu",
        price: "₹5,000 – ₹25,000",
        features: ["Hardware Setup", "Firmware Code", "Mobile App Integration", "Cloud Dashboard"],
        status: "active",
        order: 2,
      },
      {
        serviceName: "AI & Machine Learning",
        description: "Deep learning, computer vision, NLP, and data science projects using Python, TensorFlow, PyTorch, and Scikit-learn.",
        icon: "Brain",
        price: "₹4,000 – ₹20,000",
        features: ["Dataset Preparation", "Model Training", "Accuracy Reports", "Web Interface"],
        status: "active",
        order: 3,
      },
      {
        serviceName: "Web Development",
        description: "Full-stack web applications using React, Node.js, Django, PHP, and MySQL/MongoDB for projects and commercial use.",
        icon: "Globe",
        price: "₹3,000 – ₹30,000",
        features: ["Responsive Design", "Backend API", "Database", "Hosting Support"],
        status: "active",
        order: 4,
      },
      {
        serviceName: "Mobile App Development",
        description: "Android and cross-platform mobile applications using Flutter and React Native with Firebase backend.",
        icon: "Smartphone",
        price: "₹5,000 – ₹35,000",
        features: ["Android App", "UI/UX Design", "Firebase Backend", "Play Store Support"],
        status: "active",
        order: 5,
      },
      {
        serviceName: "Project Reports & Documentation",
        description: "Professional IEEE-format project reports, synopsis, paper writing, and presentation slides for all departments.",
        icon: "FileText",
        price: "₹500 – ₹3,000",
        features: ["IEEE Format", "Anti-Plagiarism", "Synopsis", "Viva Preparation"],
        status: "active",
        order: 6,
      },
    ];

    await Service.insertMany(services);
    console.log(`✅ ${services.length} services seeded.`);
  } else {
    console.log(`ℹ️  Services already exist (${serviceCount} found), skipping.`);
  }

  console.log("✅ Seeding complete!");
  process.exit(0);
};

seedData().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
