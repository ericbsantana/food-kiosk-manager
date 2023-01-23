import request from "supertest";
import app from "../src/app";

describe("GET /kiosks", () => {
  it("should return 200 on GET /kiosks", async () => {
    const response = await request(app).get("/kiosks");
    expect(response.status).toBe(200);
  });
});
