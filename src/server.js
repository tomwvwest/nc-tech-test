const express = require("express");
const { getCards, getCardById, postCard } = require("./controllers/cards.controller");
const app = express();

app.set("json spaces", 2);
app.use(express.json())

app.get("/cards", getCards);

app.get("/cards/:cardId", getCardById);

app.post("/cards", postCard);

//error-handling
app.use((err, req, res,next) => {
  res.status(err.status).send({msg : err.msg})
})

module.exports = { app };
