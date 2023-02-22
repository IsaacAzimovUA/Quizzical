import React, { useEffect, useState } from "react"
import { nanoid } from 'nanoid'
import Question from "./components/Question"
import {decode} from 'html-entities';




function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false)

  useEffect(() => {
    const API_URL = `https://opentdb.com/api.php?amount=6`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, [])

  useEffect(() => {
    const updatedData = data.map((e) => generateQuizElement(e));
    setNewData(updatedData);
  }, [data]);

  function generateQuizElement(e) {
    const question = e.question;
    const correctAnswer = e.correct_answer;
    const incorrectAnswers = e.incorrect_answers;
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
      () => Math.random() - 0.5
    );

    return {
      id: nanoid(),
      question: decode(question),
      correctAnswer: correctAnswer,
      allAnswers: allAnswers,
      answered: false,
    };
  }

  function holdAnswer(answered, id) {
    setNewData((prev) =>
      prev.map((question) => {
        return question.id === id
          ? { ...question, answered: answered }
          : question;
      })
    );
  }

  function countHoldAnswer() {
    let count = 0;
    newData.forEach((e) => {
      if (e.answered) {
        count++;
      }
    });
    return count;
  }

  function showCorrectAnswer() {
    if (showCorrect) {
      setIsStarted(false)
      setShowCorrect(false)
    } else {
      setShowCorrect(true)
    }
  }

  const questionElements = newData.map((e) => (
    <Question
      key={e.id}
      question={e.question}
      correctAnswer={e.correctAnswer}
      allAnswers={e.allAnswers}
      holdAnswer={(answered) => holdAnswer(answered, e.id)}
      showAnswer={showCorrect}
    />
  ));

  return (
    <div className="main">
      <div className="wrapper">
        {!isStarted ?
          <div className="start_menu">
            <h1 className="title title--1">Quizzical</h1>
            <h2 className="title title--2">Let's get started!</h2>
            <button className="button button--control" onClick={() => setIsStarted(true)}>Start game</button>
          </div>
          :
          <div>
            {questionElements}
            {newData.length > 0 && <div className="control-set">
              {showCorrect && <h2 className="title title--2">You scored {countHoldAnswer()}/{newData.length} correct answers</h2>}
              <button className="button button--control" onClick={() => showCorrectAnswer()}>{showCorrect ? "Start again" : "Show Answers"}</button>
            </div>}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
