const path = require("path");
const questions = require(path.join(__dirname, "../../questions.json"));

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(questions),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
