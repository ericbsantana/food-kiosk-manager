import cron from "node-cron";
import dayjs from "dayjs";
import IKiosk from "../src/interfaces/kiosk";
import KioskModel from "../src/models/Kiosk.model";
import { connectToDatabase, dropCollections, dropDatabase } from "./db";
import KioskService from "../src/services/kiosk.service";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await dropDatabase();
});

afterEach(async () => {
  await dropCollections();
});

const validKiosk = {
  description: "This is the philosophers kiosk.",
  serialKey: "this-is-my-serial-key",
  storeClosesAt: dayjs().add(3, "hours").toDate(),
  storeOpensAt: dayjs().toDate(),
  isKioskClosed: false,
};

const createAKiosk = async (kiosk: IKiosk = validKiosk) =>
  KioskModel.create(kiosk);

describe("Cron job testing", () => {
  it("cron job should be called every 60 seconds", async () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    cron.schedule("* * * * *", callback);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(60000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("should close kiosks accordingly", async () => {
    const openedKioskBeforeUpdate = await createAKiosk({
      ...validKiosk,
      description: "initially false",
      storeClosesAt: dayjs().add(3, "hours").toDate(),
      storeOpensAt: dayjs().add(2, "hours").toDate(),
      isKioskClosed: false,
    });

    await KioskService.updateAllKiosksStatus();

    const closedKioskAfterUpdate = await KioskModel.findById(
      openedKioskBeforeUpdate._id
    );

    expect(closedKioskAfterUpdate?.isKioskClosed).toBe(true);
  });

  it("should open kiosks accordingly", async () => {
    const closedKioskBeforeUpdate = await createAKiosk({
      ...validKiosk,
      description: "initially true",
      storeClosesAt: dayjs().add(3, "hours").toDate(),
      storeOpensAt: dayjs().subtract(2, "hours").toDate(),
      isKioskClosed: true,
    });

    await KioskService.updateAllKiosksStatus();

    const openedKioskAfterUpdate = await KioskModel.findById(
      closedKioskBeforeUpdate._id
    );

    expect(openedKioskAfterUpdate?.isKioskClosed).toBe(false);
  });
});
