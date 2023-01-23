import KioskModel from "../src/models/Kiosk.model";
import { connectToDatabase, dropCollections, dropDatabase } from "./db";
import dayjs from "dayjs";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await dropDatabase();
});

afterEach(async () => {
  await dropCollections();
});

describe("Kiosk model testing", () => {
  it("should save kiosk correctly on mongodb", async () => {
    const storeClosesAt = dayjs().add(3, "hours").toDate();
    const storeOpensAt = dayjs().toDate();

    const validKiosk = await KioskModel.create({
      description: "This is the philosophers kiosk.",
      isKioskClosed: false,
      serialKey: "this-is-my-serial-key",
      storeClosesAt,
      storeOpensAt,
    });

    expect(validKiosk.serialKey).toBe("this-is-my-serial-key");
    expect(validKiosk.isKioskClosed).toBe(false);
    expect(validKiosk.description).toBe("This is the philosophers kiosk.");
    expect(validKiosk.storeClosesAt).toBe(storeClosesAt);
    expect(validKiosk.storeOpensAt).toBe(storeOpensAt);
  });
});
