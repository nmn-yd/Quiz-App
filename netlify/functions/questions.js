const express = require("express");
const server = express();

server.get("/questions", (req, res) => {
  const questions = require("../data/questions.json");
  res.json(questions);
});

module.exports = server;
