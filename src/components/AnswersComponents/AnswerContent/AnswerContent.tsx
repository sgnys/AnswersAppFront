import React from 'react';
import {AnswerEntity, TemplateEntity} from 'types';
import {SingleAnswer} from '../SingleAnswer/SingleAnswer';

interface Props {
    answersList: AnswerEntity[];
    templatesList: TemplateEntity[];
    onAnswersListChange: () => Promise<void>;
}

export const AnswerContent = (props: Props) => {
    if (!props.answersList.length) {
        return (
            <div>
                <h3>Na liście nie ma takiej odpowidzi</h3>
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
