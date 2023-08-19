function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {percentage.toFixed(2)}%)
      </p>
      <p className="highscore">(HighScore : {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
