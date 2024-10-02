// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// const User = require("../models/User"); // Adjust path based on your structure

// // Load environment variables from .env file
// dotenv.config({ path: "../../.env" });

// console.log("MONGO_URI:", process.env.MONGO_URI); // To check if the variable is loaded correctly

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// async function createAdminUser() {
//   const adminEmail = "admin1@gmail.com"; // Change this
//   const adminPassword = "ik"; // Change this

//   try {
//     let user = await User.findOne({ email: adminEmail });
//     if (user) {
//       console.log("Admin user already exists");
//       return;
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(adminPassword, salt);

//     const adminUser = new User({
//       name: "Admin User",
//       email: adminEmail,
//       password: hashedPassword,
//       isAdmin: true,
//     });

//     await adminUser.save();
//     console.log("Admin user created successfully");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//     process.exit(1);
//   }
// }

// createAdminUser();
