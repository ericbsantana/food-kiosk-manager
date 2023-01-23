import { check } from "express-validator";

export default [
  check("description")
    .notEmpty()
    .withMessage("Description can't be null")
    .bail(),
  check("serialKey").notEmpty().withMessage("Serial key can't be null").bail(),
  check("isKioskClosed")
    .notEmpty()
    .withMessage("Kiosk status can't be null")
    .isBoolean()
    .withMessage("Kiosk status should be open or closed")
    .bail(),
  check("storeOpensAt")
    .notEmpty()
    .withMessage("Kiosk opening time can't be null")
    .bail()
    .isISO8601()
    .withMessage("Kiosk opening time should be a date"),
  check("storeClosesAt")
    .notEmpty()
    .withMessage("Kiosk closing time can't be null")
    .bail()
    .isISO8601()
    .withMessage("Kiosk closing time should be a date"),
];
