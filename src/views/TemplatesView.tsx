import React from "react";
import {TemplatesList} from "../components/TemplatesComponents/TemplatesList/TemplatesList";

export const TemplatesView = () => {
    return (
        <>
            <h2>Zarządzanie szablonami</h2>
            <p>Do użytku są dwa szablony, które możesz modyfikować</p>
            <TemplatesList/>
        </>
    )
}