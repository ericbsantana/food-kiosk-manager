import { validationResult } from "express-validator";
import KioskService from "../services/kiosk.service";
import { Request, Response } from "express";
import IException from "../interfaces/exception";

const KioskController = {
  POST: async (req: Request, res: Response) => {
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
  },
  GET_BY_ID: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const kiosk = await KioskService.findById(id);
      return res.status(200).send(kiosk);
    } catch (err: any) {
      const error: IException = err;
      return res.status(error.status).send({ message: error.message });
    }
  },
  GET: async (req: Request, res: Response) => {
    try {
      const kiosks = await KioskService.find({});
      return res.status(200).send(kiosks);
    } catch (err) {
      return res.sendStatus(502);
    }
  },
  DELETE: async (req: Request, res: Response) => {
    const id = req.params.id;
    const kioskToBeDeleted = await KioskService.deleteById(id);

    if (kioskToBeDeleted === null) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send({ message: "Kiosk deleted successfully" });
  },
};

export default KioskController;
