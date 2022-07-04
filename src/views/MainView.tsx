import React from "react";

import {Btn} from "../common/Btn";
import {AnswersList} from "../components/AnswersComponents/AnswersList/AnswersList";


export const MainView = () => {
    return (
        <>

            <Btn to='/answers/form-add' text='Dodaj odpowiedź'/>
            <Btn to='/templates' text='Zarządzaj szablonami odpowiedzi'/>
            <AnswersList/>
        </>
    )
}