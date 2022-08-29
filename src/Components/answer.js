import React, { useState, useEffect } from 'react'

function Answer(props) {

    const [style, setStyle] = useState("white")

    // Following error without useEffect:
    // Uncaught Error: Too many re-renders. React limits the number
    // of renders to prevent an infinite loop.
    useEffect(() => {
        props.clicked ? setStyle("#bfdbf7") : setStyle("white")
    }, [props.clicked])

    // change state when 'Check Answers' is clicked
    useEffect(() => {

        if (!props.clicked) {
            setStyle("white")
        } else if (props.correct && props.clicked) {
            setStyle("#95d5b2") //green
        } else if (!props.correct && props.clicked) {
            setStyle("#ff686b") //red
        }

        if (props.correct && !props.clicked && props.checked) {
            setStyle("#95d5b2")
        }  

    }, [props.checked])
    
    return (
        <div className='card__answer'
             style={
                 {backgroundColor: style}
                 }
        >
            <p onClick={()=>props.toggle(props.id, props.index)}
                dangerouslySetInnerHTML={{__html: props.answer}}>
                {/* {props.answer} */}
            </p>
        </div>
    )
}

export default Answer