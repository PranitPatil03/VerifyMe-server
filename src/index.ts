import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import express, { Request, Response } from "express";

const PORT = 4000 || process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
