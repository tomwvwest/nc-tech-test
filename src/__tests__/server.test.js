const request = require("supertest");
const { app } = require("../server");

describe("GET /cards", () => {
  test("200 - returns an array of card objects with keys of title, imageURL and card_id", async () => {
    const response = await request(app).get("/cards");
    const { cardsData } = response.body;

    expect(response.status).toBe(200);
    expect(cardsData.length).toBe(3);

    cardsData.forEach((card) => {
      expect(card).toMatchObject({
        title: expect.any(String),
        imageUrl: expect.any(String),
        card_id: expect.any(String),
      });
    });
  });
  test("returns specific card objects", async () => {
    const response = await request(app).get("/cards");
    const { cardsData } = response.body;

    const firstCard = cardsData[0]
    const secondCard = cardsData[1]
    const thirdCard = cardsData[2]

    expect(firstCard.title).toBe('card 1 title')
    expect(firstCard.imageUrl).toBe('/front-cover-portrait-1.jpg')
    expect(firstCard.card_id).toBe('card001')

    expect(secondCard.title).toBe('card 2 title')
    expect(secondCard.imageUrl).toBe('/front-cover-portrait-2.jpg')
    expect(secondCard.card_id).toBe('card002')

    expect(thirdCard.title).toBe('card 3 title')
    expect(thirdCard.imageUrl).toBe('/front-cover-landscape.jpg')
    expect(thirdCard.card_id).toBe('card003')
  });
});
