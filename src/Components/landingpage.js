import React from 'react'


function LandingPage(props) {

    return (
        <div className="home">
            <h1 className="heading">Quizzical</h1>
            <button className = "start-button"
                onClick={props.start}>
                Start Quiz!
            </button>
        </div>

    )
}

export default LandingPage