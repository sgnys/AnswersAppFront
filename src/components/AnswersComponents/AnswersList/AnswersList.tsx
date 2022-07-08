import React, {useEffect, useState} from "react";
import {AnswerGroupEnum, ListAnswersRes} from 'types';
import {Spinner} from "../../../common/Spinner";
import {AnswerContent} from "../AnswerContent/AnswerContent";

import {refreshLists} from "../../../utils/refreshLists";
import {useLocation} from "react-router-dom";

import {SortAnswers} from "../SortAnswers/SortAnswers";

import './AnswersList.css';

export const AnswersList = () => {
    const [data, setData] = useState<ListAnswersRes | null>(null);
    const [category, setCategory] = useState('all')
    let location = useLocation();



    useEffect(() => {
        if (category === AnswerGroupEnum.ALL) {
            refreshLists(location.pathname, setData);
        }else{
            refreshLists(`/answers/sort/${category}`, setData);
        }
    }, [category])


    if (data === null) return <Spinner/>

    return (
        <>
            <section className='answers-sort'>
             <SortAnswers category={category} onSetCategoryChange={setCategory}/>

            </section>

            <section className="answers-list">
                <AnswerContent
                    answersList={data.answersList}
                    templatesList={data.templatesList}
                    onAnswersListChange={() => refreshLists(location.pathname, setData)}/>
            </section>
        </>
    )
}

