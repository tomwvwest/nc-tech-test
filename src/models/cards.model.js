const fs = require("fs/promises");

exports.getCardsData = () => {
  return Promise.all([
    fs.readFile(`${__dirname}/../data/cards.json`),
    fs.readFile(`${__dirname}/../data/templates.json`)
  ]).then(([cardsData, templatesData]) => {
    const parsedCards = JSON.parse(cardsData);
    const parsedTemplates = JSON.parse(templatesData);

    const correctCardResponse = parsedCards.map((card) => {
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

    return correctCardResponse;
  });
};
