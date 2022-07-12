import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {refreshLists} from "../../../fetch/refreshLists";
import {Spinner} from "../../../common/Spinner";
import {GetSingleAnswerRes, ListTemplatesRes} from 'types';
import {EditAnswer} from '../EditAnswer/EditAnswer';
import {ErrorView} from "../../../views/ErrorView";

export const GetSingleAnswer = () => {
    const [answer, setAnswer] = useState<GetSingleAnswerRes | null>(null);
    const [templates, setTemplates] = useState<ListTemplatesRes | null>(null);
    const [error, setError] = useState('');
    let location = useLocation();

    useEffect(() => {

        refreshLists(location.pathname, setAnswer, setError);

    }, []);

    useEffect(() => {

        refreshLists(`/templates`, setTemplates, setError);

    }, []);

    if (error) return <ErrorView message={error}/>
    if (answer === null || templates === null) return <Spinner/>


    return (
        <>
            <EditAnswer templatesList={templates.templatesList} answer={answer.answer}/>
        </>

    )
}