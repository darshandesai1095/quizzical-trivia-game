import React, { useState, useEffect } from 'react'
import Question from './question'
import Answer from './answer'

function Card(props) {

    const toggle = props.trivia.toggle
    const index = props.trivia.index
    const checked = props.checked

    return (
        <div>
            <div className="card">

                <Question 
                    question = {props.trivia.question}
                />

                {props.trivia.answers.map((answer, i) => (
                    <Answer 
                        key     = {i}
                        answer  = {answer.answer}
                        clicked = {answer.clicked} // true of false
                        id      = {answer.id}
                        correct = {answer.correct}
                        toggle  = {toggle}
                        index   = {index}
                        checked = {checked}
                    />
                ))}

            </div>
        </div>
    )
}

export default Card