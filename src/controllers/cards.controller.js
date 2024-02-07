const { getCardsData } = require("../models/cards.model");

exports.getCards = (req, res) => {
  getCardsData().then((cardsData) => {
    res.status(200).send({ cardsData });
  });
};
