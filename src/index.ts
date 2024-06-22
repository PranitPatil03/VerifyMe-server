import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { connectToMongoDB } from "./services/db";
import { authRouter } from "./routes/Auth";

const PORT = 4000 || process.env.PORT;
connectToMongoDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
