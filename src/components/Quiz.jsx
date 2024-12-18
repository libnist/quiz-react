import { useCallback, useRef, useState } from "react";

import QUESTIONS from "../questions.js";


import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex == QUESTIONS.length ? true : false;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers}/>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectedAnswer={handleSelectAnswer}
        onSkip={handleSkipAnswer} />
    </div>
  );
}
