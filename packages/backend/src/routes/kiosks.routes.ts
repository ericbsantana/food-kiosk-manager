import express, { Request, Response } from "express";
import KioskValidationMiddleware from "../middlewares/KioskValidationMiddleware";
import KioskController from "../controllers/KioskController";
import ObjectIdValidationMiddleware from "../middlewares/ObjectIdValidationMiddleware";

const router = express.Router();

router.get("/kiosks", KioskController.GET);
router.get(
  "/kiosks/:id",
  ObjectIdValidationMiddleware,
  KioskController.GET_BY_ID
);
router.post("/kiosks", KioskValidationMiddleware, KioskController.POST);
router.delete(
  "/kiosks/:id",
  ObjectIdValidationMiddleware,
  KioskController.DELETE
);

export default router;
