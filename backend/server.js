import "dotenv/config";
import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", uploadRoutes);

app.get("/api/", (req, res) => {
  res.json({ message: `Server running on port ${PORT}` });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
