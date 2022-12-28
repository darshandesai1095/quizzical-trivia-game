import './App.css';
import Card from './Components/card'
import Check from './Components/check'
import LandingPage from './Components/landingpage'
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import ParticlesBg from 'particles-bg'

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const start = () => {
    setStartQuiz(true)
  }

  const [playAgain, setPlayAgain] = useState(false)
  const togglePlayAgain = () => {
    setChecked(false)
    setScore(0)
    setPlayAgain(prev => !prev)
  }


  const [triviaData, setTriviaData] = useState([])
  // fetch trivia data from api and set up in triviaData array
  useEffect(() => {
      const fetchData = async () => {
        const url = `https://opentdb.com/api.php?amount=5&type=multiple`
        const response = await fetch(url)
        const data = await response.json()

        //array of 5 objects [{0},{1},...{4}] i.e. 5 trivia blocks
        setTriviaData(data.results.map((ques, index) => ({
            question: ques.question,
            index: index,
            randomInt: Math.floor(Math.random() * 4),
            answers:  [ {answer: ques.correct_answer,       clicked: false, correct: true,  id: nanoid()},
                        {answer: ques.incorrect_answers[0], clicked: false, correct: false, id: nanoid()},
                        {answer: ques.incorrect_answers[1], clicked: false, correct: false, id: nanoid()},  
                        {answer: ques.incorrect_answers[2], clicked: false, correct: false, id: nanoid()}
                      ].sort(() => 0.5 - Math.random()), // ~shuffle
            toggle: toggleAnswer
        })))    
      }

      fetchData()
      // eslint-disable-next-line
    }, [playAgain])

  // toggle clicked state when an answer is clicked
  const toggleAnswer = (id, index) => {
    setTriviaData(oldTriviaData => {
      const updatedAnswersArray =  oldTriviaData[index].answers.map(answerObj => {
          return id === answerObj.id ? 
            {...answerObj, clicked: !answerObj.clicked} : {...answerObj, clicked: false}
      })
      const updatedTriviaBlock = {...oldTriviaData[index], answers: updatedAnswersArray}

      // construct the new triviaData array
      const arrStart = oldTriviaData.slice(0,index)
      const arrEnd = oldTriviaData.slice(index+1, oldTriviaData.length)
      return [...arrStart,
              updatedTriviaBlock,
              ...arrEnd
      ]
    })
  }

  // count up score when Check Answers button is clicked
  // send style update to Answer component
  const [score, setScore] = useState(0)
  const [checked, setChecked] = useState(false)
  const checkAnswers = () => {
      setChecked(true)
      setScore(0)
      for (let i=0; i<5; i++) {
        for (let answer of triviaData[i].answers) {
          if (answer.clicked && answer.correct ) {
            setScore(prev => prev + 1)
          } 
        }
      }
  }

  return (
    <div className="App">

      {
        !startQuiz ? 

        <div className="landing-page">
          
          <LandingPage 
            start={start}
          />

          <ParticlesBg 
            type="polygon" 
            num={5} 
            bg={true}
          />

        </div>

        :

        <main className="quiz">

          {triviaData.map((triviaDataElement, index) => (
            <Card
              key={index}
              trivia={triviaDataElement}
              checked={checked}
            />
          ))}

          <Check
            check={checkAnswers}
            checked={checked}
            score={score}
            togglePlayAgain={togglePlayAgain}
          />

          {
          score === 5
          &&
          <ParticlesBg type="polygon" num={10} bg={true} />
          }

        </main>
        
      }
      
    </div>
  )
}

export default App