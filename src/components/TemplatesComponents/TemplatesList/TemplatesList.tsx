import React, {useEffect, useState} from 'react';

import {Spinner} from "../../../common/Spinner";
import {ListTemplatesRes} from 'types';
import {useLocation} from "react-router-dom";
import {refreshLists} from "../../../fetch/refreshLists";
import {Template} from '../Template/Template';

import './TemplatesList.css';
import {ErrorView} from "../../../views/ErrorView";


export const TemplatesList = () => {

    const [templates, setTemplates] = useState<ListTemplatesRes | null>(null);
    const [error, setError] = useState('')
    let location = useLocation()

    useEffect(() => {
        refreshLists(location.pathname, setTemplates, setError);

    }, []);

    if (error) return <ErrorView message={error}/>
    if (templates === null) return <Spinner/>

    return (
        <>
            <div className="templates">
                {

                    templates.templatesList.map(template => <Template
                        key={template.id}
                        template={template}
                    />)

                }
            </div>

        </>
    )
}