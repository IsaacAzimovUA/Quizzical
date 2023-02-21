import React, { useState } from "react";
import "../style.scss"

export default function Question(props) {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState()
  const [answerIndex, setAnswerIndex] = useState()

  
  function handleCLick(e, index) {
    if(!props.showAnswer){
      props.holdAnswer(e === props.correctAnswer ? true : false)
      setIsCorrectAnswer(e === props.correctAnswer ? true : false)
      setAnswerIndex(index)    
    }
  }

  if (props.showAnswer) {
    console.log("true")
  } else {
    console.log("fasle")
  }

  function style(index) {
    let color
    let opacity
    if (props.showAnswer) {
      color = answerIndex === index
        ? isCorrectAnswer
          ? "#94D7A2"
          : "#F8BCBC"
        : ""
        opacity = answerIndex === index
        ? isCorrectAnswer
          ? "1"
          : ".5"
        : ".5"
    } else {
      color = answerIndex === index
        ? "#D6DBF5"
        : ""
    }
    return {
      backgroundColor: color,
      opacity: opacity,
    }
  }

  const questionItem = props.allAnswers.map((e, index) => (

    <button className="button"
      key={e}
      onClick={() => handleCLick(e, index)}
      style={style(index)}
    >{e.replace(/&quot;|&#039;|&eacute;|&ouml;|&ocirc;/g, "'")}</button>
  ))

  return (
    <div className="question">
      <h2 className="title title--2">{props.question}</h2>
      <div className="button_set">
        {questionItem}
      </div>
    </div>
  );
}