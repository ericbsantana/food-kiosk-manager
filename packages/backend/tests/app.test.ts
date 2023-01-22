import request from "supertest";
import app from "../app";

describe("Main application", () => {
  it("should return 200 ok on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
