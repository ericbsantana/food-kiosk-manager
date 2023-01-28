import { Request, Response, Express } from "express";
import express from "express";
import kiosksRoutes from "./routes/kiosks.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use(kiosksRoutes);

export default app;
