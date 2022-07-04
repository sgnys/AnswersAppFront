import React from "react";
import {AnswerEntity, TemplateEntity} from "types";

import './SingleAnswer.css';


import {AnswerText} from "../AnswerText/AnswerText";
import {findTemplateFirstParagraph, findTemplateLastParagraph} from "../../../utils/findTemplateParagraphs";
import {Btn} from "../../../common/Btn";

interface Props {
    answer: AnswerEntity;
    templatesList: TemplateEntity[]
}

export const SingleAnswer = (props: Props) => (

    <div className="answer-wrap">
        <div className="answer-dates">
            <span className="answer-dates-added">dodana: <>{props.answer.createdAt}</></span>
            <span
                className="answer-dates-modified"> <>{props.answer.modifiedAt && `zmieniono: ${props.answer.modifiedAt}`}</></span>
        </div>
        <div className="answer-element">
            <AnswerText text={findTemplateFirstParagraph(props.answer.templateId, props.templatesList)}/>
            <AnswerText text={props.answer.text}/>
            <AnswerText text={findTemplateLastParagraph(props.answer.templateId, props.templatesList)}/>
        </div>
        <span className="answer-category">{props.answer.category}</span>
        <div className='answer-btns'>
            <Btn text={'Kopiuj'}/>
            <Btn text={'Edytuj'}/>
            <Btn text={'Usuń'}/>
        </div>
    </div>
)
