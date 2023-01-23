import { Request, Response, Express } from "express";
import express from "express";
import KioskModel from "./models/Kiosk.model";
import mongoose from "mongoose";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get("/kiosks", async (req: Request, res: Response) => {
  const kiosks = await KioskModel.find({});
  res.status(200).send(kiosks);
});

app.get("/kiosks/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send();
  }

  const kiosk = await KioskModel.findById({ _id: id });
  res.status(200).send(kiosk);
});

export default app;
