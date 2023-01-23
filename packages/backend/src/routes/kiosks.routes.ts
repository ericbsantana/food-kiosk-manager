import express, { Request, Response } from "express";
import KioskModel from "../models/Kiosk.model";
import mongoose from "mongoose";

const router = express.Router();

router.get("/kiosks", async (req: Request, res: Response) => {
  const kiosks = await KioskModel.find({});
  res.status(200).send(kiosks);
});

router.get("/kiosks/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send();
  }

  const kiosk = await KioskModel.findById(id);
  res.status(200).send(kiosk);
});

export default router;
