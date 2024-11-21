import { useCallback, useRef, useState } from "react";

import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";


import Question from "./Question.jsx";

export default function Quiz() {

  const [answerState, setAnswerState] = useState("");

  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex == QUESTIONS.length ? true : false;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer == QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 1000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Quiz Completed" />
        <h2>Quiz completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
      key={activeQuestionIndex}
        question={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectedAnswer={handleSelectAnswer}
        answerState={answerState}
        onSkip={handleSkipAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}/>
    </div>
  );
}
