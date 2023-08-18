import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],

  // Loading , Ready , Finished , Error ,Active
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataLoading":
      return {
        ...state,
        questions: action.payload,
        status: "Ready",
      };

    case "loadingFailed":
      return {
        ...state,
        status: "Error",
      };
    case "Start":
      return {
        ...state,
        status: "Active",
      };

    case "NewAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "NextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    default:
      throw new Error("Action Invalid");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numberOfQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataLoading", payload: data }))
      .catch((err) => dispatch({ type: "loadingFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen
            dispatch={dispatch}
            numberOfQuestions={numberOfQuestions}
          />
        )}
        {status === "Active" && (
          <>
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
