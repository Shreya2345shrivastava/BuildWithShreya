/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Please define MONGODB_URI in your environment");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:");
    console.error(err);
    process.exit(1);
  });