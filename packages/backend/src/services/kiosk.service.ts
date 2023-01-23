import mongoose, { FilterQuery } from "mongoose";
import KioskModel from "../models/Kiosk.model";
import IKiosk from "../interfaces/kiosk";

const find = async (params: FilterQuery<IKiosk>) => {
  return KioskModel.find(params);
};

const findById = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ObjectId");
  }

  return KioskModel.findById(id);
};

const KioskService = { findById, find };

export default KioskService;
