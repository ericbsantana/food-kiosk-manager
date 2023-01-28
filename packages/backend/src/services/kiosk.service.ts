import { FilterQuery } from "mongoose";
import KioskModel from "../models/Kiosk.model";
import IKiosk from "../interfaces/kiosk";
import dayjs from "dayjs";
import BluebirdPromise from "bluebird";

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

const updateAllKiosksStatus = async () => {
  const now = dayjs().toISOString();

  const toBeOpened = await KioskModel.find({
    storeOpensAt: { $lte: now },
    storeClosesAt: { $gte: now },
    isKioskClosed: true,
  });

  const opened = await BluebirdPromise.map(toBeOpened, (closedKiosks) =>
    KioskModel.findByIdAndUpdate(
      closedKiosks._id,
      { isKioskClosed: false },
      { new: true }
    )
  );

  const toBeClosed = await KioskModel.find({
    $or: [
      { storeOpensAt: { $gte: now }, storeClosesAt: { $gte: now } },
      { storeOpensAt: { $lte: now }, storeClosesAt: { $lte: now } },
    ],
    isKioskClosed: false,
  });

  const closed = await BluebirdPromise.map(toBeClosed, (closedKiosks) =>
    KioskModel.findByIdAndUpdate(
      closedKiosks._id,
      { isKioskClosed: true },
      { new: true }
    )
  );

  return {
    numberOfKiosksOpened: opened.length,
    numberOfKiosksClosed: closed.length,
  };
};

const KioskService = {
  findById,
  find,
  createOne,
  deleteById,
  updateById,
  updateAllKiosksStatus,
};

export default KioskService;
