import React, {useRef, useState} from "react";
import {AnswerEntity, TemplateEntity} from "types";

import './SingleAnswer.css';


import {AnswerText} from "../AnswerText/AnswerText";
import {findTemplateFirstParagraph, findTemplateLastParagraph} from "../../../utils/findTemplateParagraphs";
import {Btn} from "../../../common/Btn";
import {changeDate} from "../../../utils/changeDate";
import {Spinner} from "../../../common/Spinner";
import {ErrorView} from "../../../views/ErrorView";

interface Props {
    answer: AnswerEntity;
    templatesList: TemplateEntity[];
    onAnswersListChange: () => Promise<void>;
}

export const SingleAnswer = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const divRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleCopyAnswer = async (id: string) => {
        if (btnRef.current) {
            btnRef.current.textContent = "skopiowane"
            setTimeout(() => {
                if (btnRef.current) btnRef.current.textContent = "kopiuj"
            }, 200)
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

        const res = await fetch(`http://localhost:3001/answers/count/${id}`, {
            method: 'PUT',
        })
    }

    const handleDeleteAnswer = async (id: string) => {

        if (!window.confirm(`Czy na pewno chcesz usunąć tę odpowiedź?`)) {
            return;
        }
        //TODO zrobic ładniejszy popup

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/answers/${id}`, {
                method: 'DELETE',
            })

            if (res.status === 404) {
                throw new Error("Nie można połączyć się z serwerem")
            }

            if ([400, 500].includes(res.status)) {

                const error = await res.json();
                setError(error.message);
                throw new Error(error.message);

            }

            await props.onAnswersListChange();

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (error) return <ErrorView message={error}/>
    if (loading) return <Spinner/>


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

