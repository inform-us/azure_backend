const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin);
    console.log("Allowed Origins:", allowedOrigins);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
console.log("mongoURI", mongoURI);

// MongoDB connection
mongoose.connect(mongoURI);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const Data = require("./models/Data");

// Routes
app.post("/api/data", async (req, res) => {
  console.log("posting data");
  console.log(req.body);
  try {
    const data = new Data({ content: req.body.content });
    await data.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/data", async (req, res) => {
  console.log("getting data");
  try {
    const data = await Data.find();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use("/url", (req, res, next) =>
  res.status(200).json({ status: process.env.FRONTEND_URL })
);
app.use("/api/test", (req, res, next) =>
  res.status(200).json({ status: "test" })
);
app.use("/api", (req, res, next) =>
  res.status(200).json({ status: "working" })
);

const port = process.env.PORT || 5001;

try {
  app.listen(port);
  console.log("listening on port " + port);
} catch (error) {
  console.log(error);
}
