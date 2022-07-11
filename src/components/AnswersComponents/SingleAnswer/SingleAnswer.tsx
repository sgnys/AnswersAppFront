import React, {useRef} from "react";
import {AnswerEntity, TemplateEntity} from "types";

import './SingleAnswer.css';


import {AnswerText} from "../AnswerText/AnswerText";
import {findTemplateFirstParagraph, findTemplateLastParagraph} from "../../../utils/findTemplateParagraphs";
import {Btn} from "../../../common/Btn";
import {changeDate} from "../../../utils/changeDate";

interface Props {
    answer: AnswerEntity;
    templatesList: TemplateEntity[];
    onAnswersListChange: () => Promise<void>;
}

export const SingleAnswer = (props: Props) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleCopyAnswer = async (id: string) => {
        if (btnRef.current) {
            btnRef.current.textContent = "skopiowane"
            setTimeout(() => {
                if (btnRef.current) btnRef.current.textContent = "kopiuj"
            }, 200)
        }

        const res = await fetch(`http://localhost:3001/answers/count/${id}`, {
            method: 'PUT',
        })
        console.log(res)// obiekt odpowiedzi, który zawiera też odpowiedzi błędu

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occured: ${error.message}`)
            return // jeżeli jest błąd to kończymy
        }


        if (divRef.current) {
            /**
             execCommand is deprecated but works with older browsers
             */
            // const textarea = document.createElement('textarea');
            // textarea.innerHTML = divRef.current.innerText
            // document.body.appendChild(textarea);
            // textarea.select();
            // const result = document.execCommand('copy');
            // document.body.removeChild(textarea);
            // return result

            await navigator.clipboard.writeText(divRef.current.innerText);
        }
    }

    const handleDeleteAnswer = async (id: string) => {

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

    return (
        <div className="answer-wrap">
            <div className="answer-dates">
                <span className="answer-dates-added">dodano: {changeDate(props.answer.createdAt)}</span>
                <span
                    className="answer-dates-modified"> {props.answer.modifiedAt && `zmodyfikowano: ${changeDate(props.answer.modifiedAt)}`}</span>
            </div>
            <div ref={divRef} className="answer-element">
                <AnswerText text={findTemplateFirstParagraph(props.answer.templateId, props.templatesList)}/>
                <AnswerText text={props.answer.text}/>
                <AnswerText text={findTemplateLastParagraph(props.answer.templateId, props.templatesList)}/>
            </div>
            <span className="answer-category">{props.answer.category}</span>
            <div className='answer-btns'>
                <button ref={btnRef} onClick={() => handleCopyAnswer(props.answer.id as string)}>Kopiuj</button>
                <Btn to={`/answers/${props.answer.id}`} text='Edytuj'/>
                <button onClick={() => handleDeleteAnswer(props.answer.id as string)}>Usuń</button>
            </div>
        </div>
    )
}
