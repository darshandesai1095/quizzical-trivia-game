import React, { useState, useEffect } from 'react'

function Check(props) {
    
    // const [style, setStyle] = useState("none")
    // // const [buttonMessage, setButtonMessage] = useState("Check Answers")
    
    // useEffect(() => {
    //     props.checked && setStyle("inline-block")
    //     // props.checked && setButtonMessage("Play Again")
    // }, [props.checked])


    return (
        <div className="outcome-block">
        {
            props.checked ?

            <div className="result">
                <p  className="final-score"
                    style = {{display: "inline-block"}}>
                    You scored {props.score}/5 correct answers
                </p>
                <button className = "play-again-button"
                    onClick={props.togglePlayAgain}>
                    Play Again
                </button>
            </div>
        :
            <div className = "check">
                <button className = "check-button"
                    onClick={props.check}>
                    Check Answers
                </button>
            </div>
        }
        </div>
    )
}

export default Check