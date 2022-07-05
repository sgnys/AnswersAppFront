import React, {useEffect, useState} from 'react';
import { GetSingleTemplateRes } from 'types';
import {useLocation} from "react-router-dom";
import {Spinner} from "../../../common/Spinner";
import {TemplateEditForm} from "../TemplateEditForm/TemplateEditForm";
import {refreshLists} from "../../../utils/refreshLists";

export const GetSingleTemplate =()=>{
    const [template, setTemplate] = useState<GetSingleTemplateRes | null>(null);
    let location = useLocation()

    useEffect(() => {
        refreshLists(location.pathname, setTemplate);

    }, []);

    if (template === null) return <Spinner/>

    return(
        <>
            <TemplateEditForm template={template.template}/>
        </>
    )
}