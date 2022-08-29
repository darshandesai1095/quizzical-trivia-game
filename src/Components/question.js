import React from 'react'

function Question(props) {

    return (
        <div className='card__question'>
            <h4 dangerouslySetInnerHTML={{__html: props.question}}>
                {/* {props.question} */}
            </h4>
        </div>
    )
}

export default Question