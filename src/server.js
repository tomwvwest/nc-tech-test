const express = require("express");
const { getCards, getCardById } = require("./controllers/cards.controller");
const app = express();

app.set("json spaces", 2);

app.get("/cards", getCards);

app.get("/cards/:cardId/:sizeId?", getCardById);

//error-handling
app.use((err, req, res,next) => {
  res.status(err.status).send({msg : err.msg})
})

module.exports = { app };
