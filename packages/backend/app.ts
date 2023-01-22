import { Request, Response, Express } from "express";
import express from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;
