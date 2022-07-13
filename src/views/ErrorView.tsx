import React from 'react';
import {Btn} from "../common/Btn";

import './ErrorView.css';

interface Props {
    message: string,
}

export const ErrorView = (props: Props) => {

    return (
        <>
            <div className="modal">
                <h1>Wystąpił błąd!</h1>
                <p>{props.message}.</p>
                <Btn to='/' text='Powrót do strony głównej'/>
            </div>
            <div className='box'></div>

        </>
    )
}