import React from 'react';
import {AnswerEntity, TemplateEntity} from 'types';
import {SingleAnswer} from '../SingleAnswer/SingleAnswer';

import './AnswerContent.css';

interface Props {
    answersList: AnswerEntity[];
    templatesList: TemplateEntity[];
    onAnswersListChange: () => Promise<void>;
}

export const AnswerContent = (props: Props) => {

    if (!props.answersList.length) {
        return (
            <div className='empty-content'>
                <h3>Lista odpowiedzi jest pusta</h3>
            </div>
        )
    }

    return (
        <>
            {

                props.answersList.map(answer => (
                    <SingleAnswer
                        key={answer.id}
                        answer={answer}
                        onAnswersListChange={props.onAnswersListChange}
                        templatesList={props.templatesList}
                    />
                ))

            }
        </>
    )
}
