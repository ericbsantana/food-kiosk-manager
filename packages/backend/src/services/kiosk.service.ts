import mongoose, { FilterQuery } from "mongoose";
import KioskModel from "../models/Kiosk.model";
import IKiosk from "../interfaces/kiosk";
import Exception from "../errors/Exception";

const find = async (params: FilterQuery<IKiosk>) => {
  return KioskModel.find(params);
};

const createOne = async (data: IKiosk) => {
  return KioskModel.create(data);
};

const findById = async (id: string) => KioskModel.findById(id);

const deleteById = async (id: string) => KioskModel.findByIdAndDelete(id);

const updateById = async (id: string, body: any) =>
  KioskModel.findByIdAndUpdate(id, body, { new: true });

const KioskService = { findById, find, createOne, deleteById, updateById };

export default KioskService;
