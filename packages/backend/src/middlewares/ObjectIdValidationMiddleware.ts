import { check, param } from "express-validator";
import mongoose from "mongoose";

export default [
  param("id").custom(async (id) => {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ObjectId");
    }
  }),
];
