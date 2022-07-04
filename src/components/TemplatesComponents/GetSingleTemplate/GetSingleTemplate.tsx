import React, {useEffect, useState} from 'react';
import { GetSingleTemplateRes } from 'types';
import {useParams} from "react-router-dom";
import {Spinner} from "../../../common/Spinner";
import {TemplateEditForm} from "../TemplateEditForm/TemplateEditForm";

export const GetSingleTemplate =()=>{
    const [template, setTemplate] = useState<GetSingleTemplateRes | null>(null);
    const params = useParams();

    const getSingleElement = async () => {
        setTemplate(null);
        const res = await fetch(`http://localhost:3001/templates/${params.id}`);
        const data = await res.json();
        setTemplate(data);
    }

    useEffect(() => {
        getSingleElement();


    }, []);

    if (template === null) return <Spinner/>

    return(
        <>
            <TemplateEditForm template={template.template}/>
        </>
    )
}