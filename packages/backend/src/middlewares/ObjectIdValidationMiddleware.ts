import { check } from "express-validator";
import mongoose from "mongoose";

export default [
  check("id").custom(async (id) => {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ObjectId");
    }
  }),
];
