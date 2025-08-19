import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import deviceRoutes from "./routes/device.route.js";
// import analyticsRoutes from "./routes/analytics.route.js";
import { ConnectToDB } from "./db.js";
dotenv.config();

const app = express();
//Todo
//do something for id
const PORT = process.env.PORT || 3000;
await ConnectToDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRoutes);
app.use("/devices", deviceRoutes);
// app.use("/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listing on port ${PORT}`);
});
