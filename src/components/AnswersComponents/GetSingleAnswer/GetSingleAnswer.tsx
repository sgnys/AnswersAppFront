import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {refreshLists} from "../../../utils/refreshLists";
import {Spinner} from "../../../common/Spinner";
import {GetSingleAnswerRes, ListTemplatesRes} from 'types';
import {EditAnswer} from '../EditAnswer/EditAnswer';

export const GetSingleAnswer = () => {
    const [answer, setAnswer] = useState<GetSingleAnswerRes | null>(null);
    const [templates, setTemplates] = useState<ListTemplatesRes | null>(null)
    let location = useLocation()

    useEffect(() => {
        refreshLists(location.pathname, setAnswer);

    }, []);

    useEffect(() => {
        refreshLists(`/templates`, setTemplates);

    }, []);


    if (answer === null || templates === null) return <Spinner/>

    return (
        <>
            <EditAnswer templatesList={templates.templatesList} answer={answer.answer}/>
        </>

    )
}