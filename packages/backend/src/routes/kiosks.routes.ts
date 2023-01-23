import express, { Request, Response } from "express";
import KioskService from "../services/kiosk.service";
import IException from "../interfaces/exception";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.get("/kiosks", async (req: Request, res: Response) => {
  const kiosks = await KioskService.find({});
  return res.status(200).send(kiosks);
});

router.get("/kiosks/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const kiosk = await KioskService.findById(id);
    return res.status(200).send(kiosk);
  } catch (err: any) {
    const error: IException = err;
    return res.status(error.status).send({ message: error.message });
  }
});

router.post(
  "/kiosks",
  check("description").notEmpty().withMessage("Description can't be null"),
  async (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ message: "Description can't be null" });
    }

    return res.sendStatus(200);
  }
);

export default router;
