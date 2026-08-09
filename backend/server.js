import express from "express";
import { configDotenv } from "dotenv";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file found" });
  }
  return res.json({
    message: "file uploaded successfully",
    file: req.file,
  });
});

app.get("/api/", (req, res) => {
  res.json({ message: `Server running on ${PORT}` });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

