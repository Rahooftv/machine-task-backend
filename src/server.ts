import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { startOverdueCron } from "./cron/overdueCron";

const PORT = process.env.PORT || 5000


const start = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log("Server running on port", PORT)
    startOverdueCron()
         console.log(" Cron  started");
  });
};

start()
startOverdueCron()