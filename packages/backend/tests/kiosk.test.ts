import request from "supertest";
import app from "../src/app";
import dayjs from "dayjs";
import KioskModel from "../src/models/Kiosk.model";
import { connectToDatabase, dropCollections, dropDatabase } from "./db";
import IKiosk from "../src/interfaces/kiosk";

const validKiosk = {
  description: "This is the philosophers kiosk.",
  isKioskClosed: false,
  serialKey: "this-is-my-serial-key",
  storeClosesAt: dayjs().add(3, "hours").toDate(),
  storeOpensAt: dayjs().toDate(),
};

const createAKiosk = async (kiosk: IKiosk = validKiosk) =>
  KioskModel.create(kiosk);

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await dropDatabase();
});

afterEach(async () => {
  await dropCollections();
});

describe("GET /kiosks", () => {
  it("should return 200 on GET /kiosks", async () => {
    const response = await request(app).get("/kiosks");
    expect(response.status).toBe(200);
  });

  it("should return registered kiosks from database", async () => {
    await createAKiosk();
    const response = await request(app).get("/kiosks");
    expect(response.body.length).toBe(1);
  });
});
