import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
describe("authenticate controller e2e tests", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to authenticate as an org", async () => {
    await request(app.server).post("/orgs").send({
      name: "E2E Test Organization",
      phone: "00000000000",
      email: "e2e@test.com",
      password: "12345678",
      cep: "00000000",
      state: "Test Test",
      city: "Testland",
      street: "test st, 9900",
      neighborhood: "test garden",
      latitude: -99.99999,
      longitude: -99.99999,
    });

    const response = await request(app.server).post("/sessions").send({
      email: "e2e@test.com",
      password: "12345678",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
