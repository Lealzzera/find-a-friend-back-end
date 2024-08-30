import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib";

describe("list all pets e2e test", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be able to list all pets", async () => {
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

    const { token } = authResponse.body;

    const org = await prisma.org.findFirst();

    await request(app.server)
      .post("/pets")
      .send({
        name: "PET NAME E2E TEST",
        breed: "Test breed",
        color: "black",
        size: "SMALL",
        type: "TEST",
        description: "Its just a test its not a real pet",
        age: "1 day",
        org_id: org?.id,
      })
      .auth(token, {
        type: "bearer",
      });
    const response = await request(app.server)
      .get("/list-pets")
      .query("city=Testland");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({ pets: [{ id: expect.any(String) }] });
  });
});
