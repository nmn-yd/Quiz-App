function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3> {numberOfQuestions} Questions to test your react mastery</h3>
      <button
        onClick={() => dispatch({ type: "Start" })}
        className="btn btn-ui"
      >
        Let's Started
      </button>
    </div>
  );
}

export default StartScreen;
