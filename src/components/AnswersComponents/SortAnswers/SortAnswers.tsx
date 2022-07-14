import React from 'react';
import {AnswerGroupEnum} from 'types';

import './SortAnswers.css';

interface Props {
    category: string,
    onSetCategoryChange: (category: string) => void,
}

export const SortAnswers = (props: Props) => {

    return (
        <>
            <div className="category">
            <label style={props.category === AnswerGroupEnum.ALL? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}  >
                <input type="radio" value={AnswerGroupEnum.ALL} checked={props.category === AnswerGroupEnum.ALL}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                All
            </label>
            </div>

            <div className="category">
            <label style={props.category === AnswerGroupEnum.IT? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}>
                <input type="radio" value={AnswerGroupEnum.IT} checked={props.category === AnswerGroupEnum.IT}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                IT
            </label>
            </div>

            <div className="category">
            <label style={props.category === AnswerGroupEnum.TELCO? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}>
                <input type="radio" value={AnswerGroupEnum.TELCO} checked={props.category === AnswerGroupEnum.TELCO}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                TELCO
            </label>
            </div>

            <div className="category">
            <label style={props.category === AnswerGroupEnum.PREPAID? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}>
                <input type="radio" value={AnswerGroupEnum.PREPAID}
                       checked={props.category === AnswerGroupEnum.PREPAID}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                PREPAID
            </label>
            </div>

            <div className="category">
            <label style={props.category === AnswerGroupEnum.OTHER? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}>
                <input type="radio" value={AnswerGroupEnum.OTHER} checked={props.category === AnswerGroupEnum.OTHER}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                INNE
            </label>
            </div>

            <div className="category">
            <label style={props.category === AnswerGroupEnum.MOST_COPIED? {color: 'rgb(57, 229, 229)'}: {color: 'white'}}>
                <input type="radio" value={AnswerGroupEnum.MOST_COPIED} checked={props.category === AnswerGroupEnum.MOST_COPIED}
                       onChange={e => props.onSetCategoryChange(e.target.value)}
                />
                NAJCZĘŚCIEJ UŻYWANE
            </label>
            </div>
            <br/>
        </>
    )
}