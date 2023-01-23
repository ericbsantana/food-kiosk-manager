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
  check("description")
    .notEmpty()
    .withMessage("Description can't be null")
    .bail(),
  check("serialKey").notEmpty().withMessage("Serial key can't be null").bail(),
  check("isKioskClosed")
    .notEmpty()
    .withMessage("Kiosk status can't be null")
    .isBoolean()
    .withMessage("Kiosk status should be open or closed")
    .bail(),
  check("storeOpensAt")
    .notEmpty()
    .withMessage("Kiosk opening time can't be null")
    .bail()
    .isISO8601()
    .withMessage("Kiosk opening time should be a date"),
  check("storeClosesAt")
    .notEmpty()
    .withMessage("Kiosk closing time can't be null")
    .bail()
    .isISO8601()
    .withMessage("Kiosk closing time should be a date"),
  async (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ errors: validation.mapped() });
    }

    const createdKiosk = await KioskService.createOne(req.body);

    return res
      .status(200)
      .send({ message: "Kiosk created successfully", data: createdKiosk });
  }
);

export default router;
