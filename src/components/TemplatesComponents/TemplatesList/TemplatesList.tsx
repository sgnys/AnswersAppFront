import React, {useEffect, useState} from 'react';

import {Spinner} from "../../../common/Spinner";
import {ListTemplatesRes} from 'types';
import {useLocation} from "react-router-dom";
import {refreshLists} from "../../../utils/refreshLists";
import {Template} from '../Template/Template';
import {Btn} from "../../../common/Btn";

import './TemplatesList.css';


export const TemplatesList = () => {

    const [templates, setTemplates] = useState<ListTemplatesRes | null>(null)
    let location = useLocation()

    useEffect(() => {
        refreshLists(location.pathname, setTemplates);

    }, []);


    if (templates === null) return <Spinner/>

    return (
        <>
            {

                templates.templatesList.map(template => <Template
                    key={template.id}
                    template={template}
                />)

            }
            <Btn to="/" text='Powród do głównego widoku aplikacji'/>
        </>
    )
}