import React from 'react';
import {TemplateEntity} from 'types';
import {AnswerText} from "../../AnswersComponents/AnswerText/AnswerText";
import {Btn} from "../../../common/Btn";

import './Template.css';

interface Props {
    template: TemplateEntity;
}

enum CustomerOrConsultant {
    CUSTOMER = 'customer',
    CONSULTANT = 'consultant',
}

export const Template = (props: Props) => {

    return (
        <div className='template'>
            <p>{props.template.name === CustomerOrConsultant.CUSTOMER ? 'Do Klienta' : 'Do Konsultanta'}</p>
            <p>Akapit Powitania</p>
            <div className='template-first-paragraph'>
                <AnswerText text={props.template.firstParagraph}/>
            </div>
            <p>Akapit Pożegnania</p>
            <div className='template-last-paragraph'>
                <AnswerText text={props.template.lastParagraph}/>
            </div>
            <Btn to={`/templates/${props.template.id}`} text="Edytuj"/>
        </div>
    )
}