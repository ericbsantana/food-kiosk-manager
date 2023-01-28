import { validationResult } from "express-validator";
import KioskService from "../services/kiosk.service";
import { Request, Response } from "express";

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
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
      const kiosk = await KioskService.findById(id);

      if (kiosk === null) {
        return res.status(404).send();
      }

      return res.status(200).send(kiosk);
    } catch (err: any) {
      return res.status(502).send();
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
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
      const kioskToBeDeleted = await KioskService.deleteById(id);

      if (kioskToBeDeleted === null) {
        return res.status(404).send({ message: "Not found" });
      }

      return res.status(200).send({ message: "Kiosk deleted successfully" });
    } catch (error) {
      return res
        .status(502)
        .send({ message: "Server error, please try again later" });
    }
  },
  UPDATE: async (req: Request, res: Response) => {
    const id = req.params.id;
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.status(400).send({ message: "Invalid ObjectId" });
    }

    try {
      const kioskToBePatched = await KioskService.updateById(id, req.body);
      if (kioskToBePatched === null) {
        return res.status(404).send({ message: "Not found" });
      }
      const response = {
        message: "Kiosk patched successfully",
        data: kioskToBePatched,
      };

      return res.status(200).send(response);
    } catch (error) {
      return res
        .status(502)
        .send({ message: "Server error, please try again later" });
    }
  },
};

export default KioskController;
