const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const generateUniqueId = async () => {
  let isUnique = false;
  let generatedId = "";
  while (!isUnique) {
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    generatedId = `ARSHA-${randomStr}`;
    const existing = await User.findOne({ uniqueId: generatedId });
    if (!existing) {
      isUnique = true;
    }
  }
  return generatedId;
};

const migrate = async () => {
  await connectDB();
  
  try {
    const users = await User.find({ uniqueId: { $exists: false } });
    console.log(`Found ${users.length} users needing a unique ID...`);
    
    for (const user of users) {
      const newId = await generateUniqueId();
      user.uniqueId = newId;
      await user.save({ validateBeforeSave: false }); // Skip validation if other fields are missing
      console.log(`Assigned ${newId} to user ${user.email}`);
    }
    
    // Also find users where uniqueId is null or empty string
    const users2 = await User.find({ $or: [{ uniqueId: null }, { uniqueId: "" }] });
    console.log(`Found ${users2.length} users with null/empty unique ID...`);
    
    for (const user of users2) {
      const newId = await generateUniqueId();
      user.uniqueId = newId;
      await user.save({ validateBeforeSave: false });
      console.log(`Assigned ${newId} to user ${user.email}`);
    }
    
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Migration Failed: ${error.message}`);
    process.exit(1);
  }
};

migrate();
