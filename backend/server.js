const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting dwon due to uncaught exception: ${err.stack}`);
  process.exit(1);
});

// Load environment variables from.env file
dotenv.config({ path: "./config/config.env" });

//Setting up config file
dotenv.config({ path: "backend/config/config.env" });

//Connection to database
connectDatabase();

// Setting Up Cloudinary Configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Starting the server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on : http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejection errors
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server dute to unhandled promise rejection");
  server.close(() => process.exit(1));
});
