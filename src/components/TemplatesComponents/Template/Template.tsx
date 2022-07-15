import React from 'react';
import {CustomerOrConsultant, TemplateEntity} from 'types';
import {AnswerText} from "../../AnswersComponents/AnswerText/AnswerText";
import {Btn} from "../../../common/Btn";

import './Template.css';

interface Props {
    template: TemplateEntity;
}


export const Template = (props: Props) => {

    return (
        <div className='template'>
            <p className="template-name">{props.template.name === CustomerOrConsultant.CUSTOMER ? 'Do Klienta' : 'Do Konsultanta'}</p>
            <p className= "template-info">Akapit Powitania:</p>
            <div className='template-first-paragraph'>
                <AnswerText text={props.template.firstParagraph}/>
            </div>
            <p className= "template-info">Akapit Pożegnania:</p>
            <div className='template-last-paragraph'>
                <AnswerText text={props.template.lastParagraph}/>
            </div>
            <Btn to={`/templates/${props.template.id}`} text="Edytuj"/>
        </div>
    )
}