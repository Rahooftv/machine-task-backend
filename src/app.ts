import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from "./modules/auth/auth.route"
import taskRoute from "./modules/task/task.route"

import errorMiddleware from "./middleware/error.middleware";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express()


app.use(express.json())
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));


app.use("/auth",authRoute)
app.use("/task/", authMiddleware.protect , taskRoute)



app.use(errorMiddleware)
export default app
