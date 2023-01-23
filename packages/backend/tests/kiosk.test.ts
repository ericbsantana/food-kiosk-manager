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

describe("POST /kiosks", () => {
  it("should return 200 OK when creating kiosks", async () => {
    const response = await request(app).post("/kiosks").send(validKiosk);
    expect(response.status).toBe(200);
  });

  it("should return 400 when description is null", async () => {
    const invalidKiosk = {
      ...validKiosk,
      description: null,
    };

    const response = await request(app).post("/kiosks").send(invalidKiosk);
    expect(response.status).toBe(400);
  });

  it('should return 400 and "Description can\'t be null" message when description is null', async () => {
    const invalidKiosk = {
      ...validKiosk,
      description: null,
    };

    const response = await request(app).post("/kiosks").send(invalidKiosk);
    expect(response.body.errors.description.msg).toBe(
      "Description can't be null"
    );
  });

  it("should return 400 and return multiple invalid fields with field and its error message", async () => {
    const invalidKiosk = {
      ...validKiosk,
      description: null,
      serialKey: null,
    };

    const response = await request(app).post("/kiosks").send(invalidKiosk);
    expect(Object.keys(response.body.errors)).toEqual([
      "description",
      "serialKey",
    ]);
    expect(response.body.errors.description.msg).toBe(
      "Description can't be null"
    );
    expect(response.body.errors.serialKey.msg).toBe("Serial key can't be null");
  });

  it("should return 400 and return all invalid fields and its error message", async () => {
    const invalidKiosk = {
      description: null,
      isKioskClosed: null,
      serialKey: null,
      storeClosesAt: null,
      storeOpensAt: null,
    };

    const response = await request(app).post("/kiosks").send(invalidKiosk);
    expect(Object.keys(response.body.errors)).toEqual([
      "description",
      "serialKey",
      "isKioskClosed",
      "storeOpensAt",
      "storeClosesAt",
    ]);
    expect(response.body.errors.description.msg).toBe(
      "Description can't be null"
    );
    expect(response.body.errors.serialKey.msg).toBe("Serial key can't be null");
    expect(response.body.errors.isKioskClosed.msg).toBe(
      "Kiosk status can't be null"
    );
    expect(response.body.errors.storeClosesAt.msg).toBe(
      "Kiosk closing time can't be null"
    );
    expect(response.body.errors.storeOpensAt.msg).toBe(
      "Kiosk opening time can't be null"
    );
  });

  it('should return 400 and "Kiosk status should be open or closed" message when description is null', async () => {
    const invalidKiosk = {
      ...validKiosk,
      isKioskClosed: "banana",
    };

    const response = await request(app).post("/kiosks").send(invalidKiosk);
    expect(response.body.errors.isKioskClosed.msg).toBe(
      "Kiosk status should be open or closed"
    );
  });

  it.each([
    ["storeOpensAt", "Kiosk opening time should be a date"],
    ["storeClosesAt", "Kiosk closing time should be a date"],
  ])(
    "should return 400 if %s is not a date and show %s message",
    async (input, expected) => {
      const invalidKiosk: { [key: string]: any } = { ...validKiosk };
      invalidKiosk[input] = "banana";

      const response = await request(app)
        .post("/kiosks")
        .send({ ...invalidKiosk });

      expect(response.status).toBe(400);
      expect(response.body.errors[input].msg).toBe(expected);
    }
  );
});
