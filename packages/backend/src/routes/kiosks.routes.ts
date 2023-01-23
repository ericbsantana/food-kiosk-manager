import express, { Request, Response } from "express";
import KioskService from "../services/kiosk.service";
import IException from "../interfaces/exception";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.get("/kiosks", async (req: Request, res: Response) => {
  const kiosks = await KioskService.find({});
  res.status(200).send(kiosks);
});

router.get("/kiosks/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const kiosk = await KioskService.findById(id);
    res.status(200).send(kiosk);
  } catch (err: any) {
    const error: IException = err;
    res.status(error.status).send({ message: error.message });
  }
});

router.post(
  "/kiosks",
  check("description").notEmpty(),
  async (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.sendStatus(400);
    }

    return res.sendStatus(200);
  }
);

export default router;
