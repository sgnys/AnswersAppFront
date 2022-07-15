import React, {useEffect, useState} from 'react';
import { GetSingleTemplateRes } from 'types';
import {useLocation} from "react-router-dom";
import {Spinner} from "../../../common/Spinner";
import {TemplateEditForm} from "../TemplateEditForm/TemplateEditForm";
import {refreshLists} from "../../../fetch/refreshLists";
import {ErrorView} from "../../../views/ErrorView";

export const GetSingleTemplate =()=>{
    const [template, setTemplate] = useState<GetSingleTemplateRes | null>(null);
    const [error, setError]= useState('')
    let location = useLocation()

    useEffect(() => {
        refreshLists(location.pathname, setTemplate,setError);

    }, []);

    if(error) return <ErrorView message={error}/>
    if (template === null) return <Spinner/>

    return(
        <>
            <TemplateEditForm template={template.template}/>
        </>
    )
}