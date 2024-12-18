
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";

import QUESTIONS from "../questions.js";


export default function Question({ index, onSelectedAnswer, onSkip }) {

    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectedAnswer(answer)
            }, 2000)
        }, 1000)
    }

    let answerState = "";

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        answerState = "answered"
    }

    return (
        <div id="question">
            <QuestionTimer
                //index={activeQuestionIndex}
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === "" ? onSkip : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                //index={activeQuestionIndex} 
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer} />
        </div>
    )
}