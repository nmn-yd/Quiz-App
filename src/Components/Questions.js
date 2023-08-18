import Options from "./Options";

function Questions({ question }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
}

export default Questions;
