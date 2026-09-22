import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import passport from "./auth/passport";
import { configurePassport } from "./auth/passport";

import authRoutes from "./auth/routes";
import guildsRouter from "./api/guilds";
import usersRouter from "./api/users";
import aiRouter from "./api/ai";
import developerRouter from "./api/developer";

const app = express();
const PORT = parseInt(process.env.DASHBOARD_PORT || "3000", 10);
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/notix-nexus";
const SESSION_SECRET = process.env.SESSION_SECRET || "notix-nexus-dashboard-secret";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/guilds", guildsRouter);
app.use("/api/users", usersRouter);
app.use("/api/ai", aiRouter);
app.use("/api/developer", developerRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

async function start(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`NOTIX NEXUS Dashboard server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();

export default app;
