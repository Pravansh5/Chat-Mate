import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectToDb } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
dotenv.config()
const app=express();
const port=ENV.PORT||3000
app.use(express.json({ limit: "50mb" }));
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
connectToDb()
app.listen(port,()=>console.log(`Server is running on port http://localhost:${port}`));