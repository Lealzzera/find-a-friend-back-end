import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";
describe("refresh controller e2e tests", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to refresh a token", async () => {
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

    const authResponse = await request(app.server).post("/sessions").send({
      email: "e2e@test.com",
      password: "12345678",
    });

    const cookies = authResponse.get("Set-Cookie") ?? [];

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
