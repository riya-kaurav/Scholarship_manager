require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.set("autoIndex", true);

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.use("/api/scholarships", require("./routes/scholarship.routes"));

app.use("/api/applications", require("./routes/application.routes"));


