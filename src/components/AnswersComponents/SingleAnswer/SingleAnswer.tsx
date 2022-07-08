import React from "react";
import {AnswerEntity, TemplateEntity} from "types";

import './SingleAnswer.css';


import {AnswerText} from "../AnswerText/AnswerText";
import {findTemplateFirstParagraph, findTemplateLastParagraph} from "../../../utils/findTemplateParagraphs";
import {Btn} from "../../../common/Btn";
import {changeDate} from "../../../utils/changeDate";

interface Props {
    answer: AnswerEntity;
    templatesList: TemplateEntity[];
    onAnswersListChange: ()=> Promise<void>;
}

export const SingleAnswer = (props: Props) => {

    const handleDeleteAnswer = async(id: string)=>{

        if (!window.confirm(`Czy na pewno chcesz usunąć tę odpowiedź?`)) {
            return;
        }
        //TODO zrobic ładniejszy popup

        const res = await fetch(`http://localhost:3001/answers/${id}`, {
            method: 'DELETE',
        })
        console.log(res)// obiekt odpowiedzi, który zawiera też odpowiedzi błędu

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occured: ${error.message}`)
            return // jeżeli jest błąd to kończymy
        }
        //TODO oprogramowane błędy pokazać na FE

       await props.onAnswersListChange();
    }

    return(
    <div className="answer-wrap">
        <div className="answer-dates">
            <span className="answer-dates-added">dodano: {changeDate(props.answer.createdAt)}</span>
            <span
                className="answer-dates-modified"> {props.answer.modifiedAt && `zmodyfikowano: ${changeDate(props.answer.modifiedAt)}`}</span>
        </div>
        <div className="answer-element">
            <AnswerText text={findTemplateFirstParagraph(props.answer.templateId, props.templatesList)}/>
            <AnswerText text={props.answer.text}/>
            <AnswerText text={findTemplateLastParagraph(props.answer.templateId, props.templatesList)}/>
        </div>
        <span className="answer-category">{props.answer.category}</span>
        <div className='answer-btns'>
            <Btn text='Kopiuj'/>
            <Btn to={`/answers/${props.answer.id}`} text='Edytuj'/>
            <button onClick={()=>handleDeleteAnswer(props.answer.id as string)}>Usuń</button>
        </div>
    </div>
)}
