import React from 'react';
import {AnswerGroupEnum} from 'types';

interface Props {
    category: string,
    onSetCategoryChange: (category: string) => void,
}

export const SortAnswers = (props: Props) => {
    return (
        <>
            <label>
                <input type="radio" value={AnswerGroupEnum.ALL} checked={props.category === AnswerGroupEnum.ALL}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                All
            </label>


            <label>
                <input type="radio" value={AnswerGroupEnum.IT} checked={props.category === AnswerGroupEnum.IT}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                IT
            </label>
            <label>
                <input type="radio" value={AnswerGroupEnum.TELCO} checked={props.category === AnswerGroupEnum.TELCO}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />

                TELCO
            </label>
            <label>
                <input type="radio" value={AnswerGroupEnum.PREPAID}
                       checked={props.category === AnswerGroupEnum.PREPAID}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />

                PREPAID
            </label>
            <label>
                <input type="radio" value={AnswerGroupEnum.OTHER} checked={props.category === AnswerGroupEnum.OTHER}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />

                INNE
            </label>
            <label>
                <input type="radio" value={AnswerGroupEnum.MOST_COPIED} checked={props.category === AnswerGroupEnum.MOST_COPIED}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />

                NAJCZĘŚCIEJ UŻYWANE
            </label>
            <br/>
        </>
    )
}