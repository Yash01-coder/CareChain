const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const doctorRoutes = require("./routes/doctorRoutes");
const helmet = require("helmet");

const rateLimit = require("express-rate-limit");
dotenv.config();

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
});


// ==========================
// MIDDLEWARE
// ==========================
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(helmet());

app.use("/api", apiLimiter);

app.use(express.json());

app.use(express.urlencoded({

  extended: true
}));

// ==========================
// DATABASE
// ==========================
mongoose.connect(

  process.env.MONGO_URI

).then(() => {

  console.log("MongoDB Connected");

}).catch((err) => {

  console.log(err);
});

// ==========================
// ROUTES
// ==========================
app.use(
  "/api/v1/auth",

  require("./routes/authRoutes")
);

app.use(
  "/api/v1/records",

  require("./routes/recordRoutes")
);

app.use(

  "/api/v1/doctors",

  doctorRoutes
);

app.use(
 (err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    message: err.message
  });
 }
);
// ==========================
// SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`
  );
});