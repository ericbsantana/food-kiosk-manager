import mongoose from "mongoose";

const kioskSchema = new mongoose.Schema({
  serialKey: String,
  description: String,
  isKioskClosed: Boolean,
  storeOpensAt: Date,
  storeClosesAt: Date,
});

export default mongoose.model("kiosk", kioskSchema, "kiosk-management");
