const {
  getCardsData,
  getCardDataById,
  postCardData
} = require("../models/cards.model");

exports.getCards = (req, res) => {
  getCardsData().then((cardsData) => {
    res.status(200).send({ cardsData });
  });
};

exports.getCardById = (req, res, next) => {
  const cardId = req.params.cardId;
  getCardDataById(cardId)
    .then((cardData) => {
      res.status(200).send({ cardData });
    })
    .catch(next);
};

exports.postCard = (req, res, next) => {
  const postCard = req.body;
  postCardData(postCard)
    .then((returnCardData) => {
      res.status(201).send({ cardData : returnCardData });
    })
    .catch(next);
};
