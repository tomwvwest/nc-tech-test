const { getCardsData, getCardDataById } = require("../models/cards.model");

exports.getCards = (req, res) => {
  getCardsData().then((cardsData) => {
    res.status(200).send({ cardsData });
  });
};

exports.getCardById = (req, res) => {
  const cardId = req.params.cardId;
  getCardDataById(cardId).then((cardData) => {
    res.status(200).send({ cardData });
  });
};
