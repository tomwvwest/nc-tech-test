const fs = require("fs/promises");
const {
  convertToCorrectSizeFormat,
  convertNumToCardId,
} = require("../../utils/functions");

exports.getCardsData = () => {
  return Promise.all([
    fs.readFile(`${__dirname}/../data/cards.json`),
    fs.readFile(`${__dirname}/../data/templates.json`),
  ]).then(([cardsData, templatesData]) => {
    const parsedCards = JSON.parse(cardsData);
    const parsedTemplates = JSON.parse(templatesData);

    const correctCardsResponse = parsedCards.map((card) => {
      const frontCoverTemplateId = card.pages[0].templateId;
      const imageUrl = parsedTemplates.find((card) => {
        return card.id === frontCoverTemplateId;
      }).imageUrl;

      return {
        title: card.title,
        card_id: card.id,
        imageUrl,
      };
    });

    return correctCardsResponse;
  });
};

exports.getCardDataById = (cardId) => {
  if (isNaN(cardId))
    return Promise.reject({ status: 400, msg: "Invalid Card ID" });

  return Promise.all([
    fs.readFile(`${__dirname}/../data/cards.json`),
    fs.readFile(`${__dirname}/../data/templates.json`),
  ]).then(([cardsData, templatesData]) => {
    const parsedCards = JSON.parse(cardsData);
    const parsedTemplates = JSON.parse(templatesData);
    const correctCard = parsedCards.find(
      (card) => card.id === convertNumToCardId(cardId)
    );

    if (!correctCard)
      return Promise.reject({ status: 404, msg: "Card ID does not exist" });

    const frontCoverTemplateId = correctCard.pages[0].templateId;
    const imageUrl = parsedTemplates.find((card) => {
      return card.id === frontCoverTemplateId;
    }).imageUrl;

    return {
      title: correctCard.title,
      imageUrl,
      card_id: correctCard.id,
      base_price: correctCard.basePrice,
      pages: correctCard.pages,
      availableSizes: convertToCorrectSizeFormat(correctCard.sizes),
    };
  });
};

exports.postCardData = (cardData) => {
  return Promise.all([fs.readFile(`${__dirname}/../data/cards.json`)]).then(
    ([cardsData]) => {
      const parsedCardsData = JSON.parse(cardsData)
      const numOfCards = parsedCardsData.length;
      const idInt = numOfCards + 1;
      const newId = convertNumToCardId(idInt);
      const newCard = { ...cardData, id: newId };
      const newCardsData = [...parsedCardsData, newCard];

      Promise.all([
        fs.writeFile(
          `${__dirname}/../data/cards.json`,
          JSON.stringify(newCardsData, null, 2)
        ),
        fs.writeFile(
          `${__dirname}/../data/sizes.json`,
          JSON.stringify(newCardsData, null, 2)
        ),
      ]);
      return this.getCardDataById(idInt)
    }
  )
};
