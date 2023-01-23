import express, { Request, Response } from "express";
import KioskValidationMiddleware from "../middlewares/KioskValidationMiddleware";
import KioskController from "../controllers/KioskController";

const router = express.Router();

router.get("/kiosks", KioskController.GET);
router.get("/kiosks/:id", KioskController.GET_BY_ID);
router.post("/kiosks", KioskValidationMiddleware, KioskController.POST);

export default router;
