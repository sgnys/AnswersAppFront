import React from 'react';
import {Btn} from "../common/Btn";

import './NotFoundView.css';

export const NotFoundView =()=>{
    return(
        <div className='not-found'>
            <h2>
                404 - Strona na której jesteś nie istnieje!
            </h2>
            <Btn to="/" text='Wróć do strony głównej'/>
        </div>
    )
}