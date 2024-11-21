
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({ question, answers, onSelectedAnswer, answerState, onSkip, selectedAnswer }) {

    return (
        <div id="question">
            <QuestionTimer
                //key={activeQuestionIndex}
                timeout={10000}
                onTimeout={onSkip}
            />
            <h2>{question}</h2>
            <Answers
                //key={activeQuestionIndex} 
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectedAnswer} />
        </div>
    )
}