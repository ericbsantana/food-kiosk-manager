import mongoose, { FilterQuery } from "mongoose";
import KioskModel from "../models/Kiosk.model";
import IKiosk from "../interfaces/kiosk";
import Exception from "../errors/Exception";

const find = async (params: FilterQuery<IKiosk>) => {
  return KioskModel.find(params);
};

const findById = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Exception(400, "Invalid ObjectId");
  }

  const result = await KioskModel.findById(id);

  if (result === null) {
    throw new Exception(404, "Not found");
  }

  return result;
};

const KioskService = { findById, find };

export default KioskService;
