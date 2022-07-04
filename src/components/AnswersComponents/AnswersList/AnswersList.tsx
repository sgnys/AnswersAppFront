import React, {useEffect, useState} from "react";
import {ListAnswersRes} from 'types';
import {Spinner} from "../../../common/Spinner";
import {AnswerContent} from "../AnswerContent/AnswerContent";

import {refreshLists} from "../../../utils/refreshLists";
import {useLocation} from "react-router-dom";

import './AnswersList.css';


export const AnswersList = () => {
    const [data, setData] = useState<ListAnswersRes | null>(null);
    let location = useLocation();

    useEffect(() => {
        refreshLists(location.pathname, setData);

    }, []);


    if (data === null) return <Spinner/>


    return (
        <>
            <section className="answers-list">
                <AnswerContent answersList={data.answersList} templatesList={data.templatesList}/>
            </section>
        </>
    )
}

