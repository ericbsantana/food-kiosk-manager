import { Request, Response, Express } from "express";
import express from "express";
import kiosksRoutes from "./routes/kiosks.routes";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use(kiosksRoutes);

export default app;
