function NextButton({ dispatch, answer, index, numberOfQuestions }) {
  if (answer === null) return;

  if (index < numberOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quizFinished" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
