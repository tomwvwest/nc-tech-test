const request = require("supertest");
const { app } = require("../server");
const fs = require("fs/promises");

//reset test data after all tests are ran
afterAll(() => {
  const originalData = [
    {
      id: "card001",
      title: "card 1 title",
      sizes: ["sm", "md", "gt"],
      basePrice: 200,
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    },
    {
      id: "card002",
      title: "card 2 title",
      sizes: ["md"],
      basePrice: 200,
      pages: [
        {
          title: "Front Cover",
          templateId: "template005",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    },
    {
      id: "card003",
      title: "card 3 title",
      sizes: ["md", "lg"],
      basePrice: 200,
      pages: [
        {
          title: "Front Cover",
          templateId: "template006",
        },
        {
          title: "Inside Top",
          templateId: "template007",
        },
        {
          title: "Inside Bottom",
          templateId: "template007",
        },
        {
          title: "Back Cover",
          templateId: "template008",
        },
      ],
    },
  ];
  Promise.all([
    fs.writeFile(
      `${__dirname}/../data/cards.json`,
      JSON.stringify(originalData, null, 2)
    ),
    fs.writeFile(
      `${__dirname}/../data/sizes.json`,
      JSON.stringify(originalData, null, 2)
    ),
  ]);
});

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

    const firstCard = cardsData[0];
    const secondCard = cardsData[1];
    const thirdCard = cardsData[2];

    expect(firstCard.title).toBe("card 1 title");
    expect(firstCard.imageUrl).toBe("/front-cover-portrait-1.jpg");
    expect(firstCard.card_id).toBe("card001");

    expect(secondCard.title).toBe("card 2 title");
    expect(secondCard.imageUrl).toBe("/front-cover-portrait-2.jpg");
    expect(secondCard.card_id).toBe("card002");

    expect(thirdCard.title).toBe("card 3 title");
    expect(thirdCard.imageUrl).toBe("/front-cover-landscape.jpg");
    expect(thirdCard.card_id).toBe("card003");
  });
});

describe("GET /cards/:cardId", () => {
  test("200 - returns correct card object with keys of title, imageURL, base_price, availableSizes, pages and card_id", async () => {
    const response = await request(app).get("/cards/1");
    const { cardData } = response.body;

    expect(response.status).toBe(200);
    expect(cardData).toMatchObject({
      title: "card 1 title",
      imageUrl: "/front-cover-portrait-1.jpg",
      card_id: "card001",
      base_price: 200,
      availableSizes: [
        {
          id: "sm",
          title: "Small",
        },
        {
          id: "md",
          title: "Medium",
        },
        {
          id: "gt",
          title: "Giant",
        },
      ],
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    });
  });
  test("404 - returns correct error message when given a cardId for a card that does not exist", async () => {
    const response = await request(app).get("/cards/100");
    const errMessage = response.body.msg;

    expect(response.status).toBe(404);
    expect(errMessage).toBe("Card ID does not exist");
  });
  test("400 - returns correct error message when given an invalid cardId", async () => {
    const response = await request(app).get("/cards/invalid");
    const errMessage = response.body.msg;

    expect(response.status).toBe(400);
    expect(errMessage).toBe("Invalid Card ID");
  });
});

describe("POST a card", () => {
  test("201 - returns correct card object after posting to database", async () => {
    const newCard = {
      title: "example title",
      sizes: ["sm", "md", "gt"],
      basePrice: 200,
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    };
    const response = await request(app).post("/cards").send(newCard);
    const { cardData } = response.body;

    expect(response.status).toBe(201);
    expect(cardData).toMatchObject({
      title: "example title",
      imageUrl: "/front-cover-portrait-1.jpg",
      card_id: "card004",
      base_price: 200,
      availableSizes: [
        {
          id: "sm",
          title: "Small",
        },
        {
          id: "md",
          title: "Medium",
        },
        {
          id: "gt",
          title: "Giant",
        },
      ],
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    });
  });
});
