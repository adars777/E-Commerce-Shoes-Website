import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

//configure env
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// database config
connectDB();

//routes
app.use("/api/v1/auth", authRoutes);

//category route
app.use("/api/v1/category", categoryRoutes);

//products route
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({ message: "welcome to home page..." });
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
