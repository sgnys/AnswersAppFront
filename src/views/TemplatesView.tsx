import React from "react";
import {TemplatesList} from "../components/TemplatesComponents/TemplatesList/TemplatesList";

import './TemplatesView.css';
import {Btn} from "../common/Btn";

export const TemplatesView = () => {
    return (
        <>
            <div className="wrap">
                <h2 className='templates-title'>Zarządzanie szablonami</h2>
                <p className='templates-info'>Do użytku są dwa szablony, które możesz modyfikować:</p>
                <TemplatesList/>
            </div>
            <Btn to="/" text='Powród do głównego widoku aplikacji'/>
        </>
    )
}