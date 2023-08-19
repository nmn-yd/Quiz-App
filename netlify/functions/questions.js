const express = require("express");
const server = express();
const path = require("path"); // Import the path module

server.get("/questions", (req, res) => {
  const questions = require(path.join(__dirname, "../../questions.json")); // Adjust the path
  res.json(questions);
});

module.exports = server;
