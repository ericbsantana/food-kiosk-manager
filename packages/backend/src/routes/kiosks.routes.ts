import express, { Request, Response } from "express";
import KioskValidationMiddleware from "../middlewares/KioskValidationMiddleware";
import KioskController from "../controllers/KioskController";

const router = express.Router();

router.get("/kiosks", KioskController.GET);
router.get("/kiosks/:id", KioskController.GET_BY_ID);
router.post("/kiosks", KioskValidationMiddleware, KioskController.POST);
router.delete("/kiosks/:id", KioskController.DELETE);

export default router;
