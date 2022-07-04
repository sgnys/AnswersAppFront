import React from 'react';

import {MainView} from "./views/MainView";

import {Route, Routes, Navigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import { AddAnswerFormView } from './views/AddAnswerFormView';
import {TemplatesView} from "./views/TemplatesView";
import { GetSingleTemplate } from './components/TemplatesComponents/GetSingleTemplate/GetSingleTemplate';

import './App.css';

export const App = () => {

    return (

        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/answers" replace />}/>
                <Route path="/answers" element={<MainView/>}/>
                <Route path="/answers/form-add" element={<AddAnswerFormView/>}/>
                <Route path="/templates" element={<TemplatesView/>}/>
                <Route path="/templates/:id" element={<GetSingleTemplate/>}/>
                {/*<Route path="*" element={<NotFoundView/>}/>*/}

            </Routes>
        </>

    );
}


