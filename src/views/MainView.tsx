import React from "react";

import {Btn} from "../common/Btn";
import {AnswersList} from "../components/AnswersComponents/AnswersList/AnswersList";

import './MainView.css';

export const MainView = () => {
    return (
        <>
            <div className="wrap">
                <section className="manage">
                    <Btn to='/answers/form-add' text='Dodaj odpowiedź'/>
                    <Btn to='/templates' text='Zarządzaj szablonami odpowiedzi'/>
                </section>
                <AnswersList/>
            </div>
        </>
    )
}