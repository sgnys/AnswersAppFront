import React from 'react';
import { AnswerEntity, TemplateEntity } from 'types';
import { SingleAnswer } from '../SingleAnswer/SingleAnswer';

interface Props{
    answersList: AnswerEntity[];
    templatesList: TemplateEntity[];
}

export const AnswerContent =(props: Props) =>{
    return(
        <>
        {

            props.answersList.map(answer =>(
                <SingleAnswer
                 key={answer.id}
                 answer={answer}
                 templatesList={props.templatesList}
                />
            ))

        }
        </>
    )
}
