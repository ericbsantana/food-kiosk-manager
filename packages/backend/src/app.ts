import { Request, Response, Express } from "express";
import express from "express";
import KioskModel from "./models/Kiosk.model";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get("/kiosks", async (req: Request, res: Response) => {
  const kiosks = await KioskModel.find({});
  res.status(200).send(kiosks);
});

export default app;
