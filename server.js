import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// configuring env
dotenv.config();

// connect database
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// rest apis
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ecommerce webapp",
  });
});

//PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `server is up and running in ${process.env.DEV_MODE} mode on port ${PORT}`
      .bgCyan.white
  );
});
