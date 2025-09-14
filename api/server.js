require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const drillRoutes = require("./routes/drillRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ Database ------------------
connectDB();

// ------------------ Middleware ------------------
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
    },
  })
);

app.use(cookieParser());
app.use(express.json());

// Strict CORS (only allow frontend)
app.use(
  cors({
    origin: process.env.VITE_API_BASE_URL || "http://localhost:4000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Request logging
app.use(morgan("combined"));

// Rate limiting: 100 requests per 5 min per IP
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX,
  message: { error: "Too many requests, try again later." },
});

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/drills")) return next();
    limiter(req, res, next);
  });
}

// // Session middleware (for OAuth session)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // only https in prod
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ------------------ Routes ------------------
app.use("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/me", userRoutes);
app.use("/api/drills", drillRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/auth", authRoutes);

const frontendPath = path.join(__dirname, "web/dist");
app.use(express.static(frontendPath));

// Catch-all: send React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ------------------ Server ------------------
app.listen(PORT, () => {
  console.log(`Website is running on http://localhost:${PORT}`);
});
