import express, { Request, Response } from "express";
import KioskService from "../services/kiosk.service";
import IException from "../interfaces/exception";
import { validationResult } from "express-validator";
import KioskValidationMiddleware from "../middlewares/KioskValidationMiddleware";

const router = express.Router();

router.get("/kiosks", async (req: Request, res: Response) => {
  try {
    const kiosks = await KioskService.find({});
    return res.status(200).send(kiosks);
  } catch (err) {
    return res.sendStatus(502);
  }
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
  KioskValidationMiddleware,
  async (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ errors: validation.mapped() });
    }

    try {
      const createdKiosk = await KioskService.createOne(req.body);

      return res
        .status(200)
        .send({ message: "Kiosk created successfully", data: createdKiosk });
    } catch (err) {
      return res.sendStatus(502);
    }
  }
);

export default router;
