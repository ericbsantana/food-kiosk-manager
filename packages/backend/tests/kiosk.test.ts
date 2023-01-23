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

describe("GET /kiosks/:id", () => {
  it("should return specific kiosk on GET /kiosks/:id", async () => {
    const kiosk = await createAKiosk();

    const kioskWithNormalizedFields = {
      _id: kiosk._id.toString(),
      description: kiosk.description,
      serialKey: kiosk.serialKey,
      __v: kiosk.__v,
      isKioskClosed: kiosk.isKioskClosed,
      storeClosesAt: dayjs(kiosk.storeClosesAt).toISOString(),
      storeOpensAt: dayjs(kiosk.storeOpensAt).toISOString(),
    };

    const response = await request(app).get(`/kiosks/${kiosk._id}`);
    expect(response.body).toEqual(kioskWithNormalizedFields);
  });

  it('should return "Invalid ObjectId" error message when parameter is invalid', async () => {
    const response = await request(app).get(`/kiosks/${undefined}`);
    expect(response.body.message).toBe("Invalid ObjectId");
  });

  it("should return 404 if nothing is found", async () => {
    const response = await request(app).get(`/kiosks/63cdf954b65cc96e2fcbe76f`);
    expect(response.status).toBe(404);
  });

  it.each([
    [undefined, 400],
    [null, 400],
    ["b", 400],
    [333, 400],
  ])("should return 400 if id parameter is %s", async (input, expected) => {
    const response = await request(app).get(`/kiosks/${input}`);
    expect(response.status).toEqual(expected);
  });
});
