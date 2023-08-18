import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],

  // Loading , Ready , Finished , Error ,Active
  status: "Loading",
  index: 0,
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

    default:
      throw new Error("Action Invalid");
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numberOfQuestions = questions.length;
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
        {status === "Active" && <Questions question={questions[index]} />}
      </Main>
    </div>
  );
}
