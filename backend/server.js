const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const doctorRoutes = require("./routes/doctorRoutes");

dotenv.config();

const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());

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

  "/api/auth",

  require("./routes/authRoutes")
);

app.use(

  "/api/records",

  require("./routes/recordRoutes")
);
  
app.use(

  "/api/doctors",

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