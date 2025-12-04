import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./modules/auth/auth.route"

import errorMiddleware from "./middleware/error.middleware";

const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/auth",authRoute)



app.use(errorMiddleware)
export default app
