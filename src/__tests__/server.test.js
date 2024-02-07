const request = require("supertest");
const { app } = require("../server");

test("returns matching card title", async () => {
  const response = await request(app).get("/cards/card001");

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      title: "card 1 title",
    })
  );
});
