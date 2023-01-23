import mongoose from "mongoose";
import IKiosk from "../interfaces/kiosk";

const kioskSchema = new mongoose.Schema<IKiosk>({
  serialKey: { type: String, require: true },
  description: { type: String, require: true },
  isKioskClosed: { type: Boolean, require: true },
  storeOpensAt: { type: Date, require: true },
  storeClosesAt: { type: Date, require: true },
});

export default mongoose.model<IKiosk>("kiosk", kioskSchema, "kiosk-management");
