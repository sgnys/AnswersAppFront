import React from 'react';

import {MainView} from "./views/MainView";

import {Route, Routes, Navigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {TemplatesView} from "./views/TemplatesView";
import { GetSingleTemplate } from './components/TemplatesComponents/GetSingleTemplate/GetSingleTemplate';

import {AddAnswer} from "./components/AnswersComponents/AddAnswer/AddAnswer";
import {GetSingleAnswer} from "./components/AnswersComponents/GetSingleAnswer/GetSingleAnswer";
import { NotFoundView } from './views/NotFoundView';

import './App.css';

export const App = () => {

    return (

        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/answers" replace />}/>
                <Route path="/answers" element={<MainView/>}/>
                <Route path="/answers/:id" element={<GetSingleAnswer/>}/>
                <Route path="/answers/form-add" element={<AddAnswer/>}/>
                <Route path="/templates" element={<TemplatesView/>}/>
                <Route path="/templates/:id" element={<GetSingleTemplate/>}/>
                <Route path="*" element={<NotFoundView/>}/>

            </Routes>
        </>

    );
}


