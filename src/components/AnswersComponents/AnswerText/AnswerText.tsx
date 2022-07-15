import React from 'react';

import './AnswerText.css';

interface Props {
    text: string | null;
}

let randomIndex = 0
export const AnswerText = (props: Props) => {
    if (!props.text) return null
    return (

        <>
                {props.text.split('\n').map((item: string) => {
                        ++randomIndex;

                        return (

                            <span key={randomIndex} className="answer-element-text">
                     {item}
                                <br/>
                 </span>

                        )
                    }
                )}

        </>
    )
}

