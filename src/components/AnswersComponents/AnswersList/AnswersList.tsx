import React, {useEffect, useState} from "react";
import {AnswerEntity, AnswerGroupEnum, ListAnswersRes} from 'types';
import {Spinner} from "../../../common/Spinner";
import {AnswerContent} from "../AnswerContent/AnswerContent";
import {refreshLists} from "../../../utils/refreshLists";
import {useLocation} from "react-router-dom";
import {SortAnswers} from "../SortAnswers/SortAnswers";

import './AnswersList.css';

export const AnswersList = () => {
    const [data, setData] = useState<ListAnswersRes | null>(null);
    const [category, setCategory] = useState('all');
    const [searchText, setSearch] = useState('');
    let location = useLocation();

    useEffect(() => {
        if (category === AnswerGroupEnum.ALL) {
            refreshLists(location.pathname, setData);
        } else {
            refreshLists(`/answers/sort/${category}`, setData);
        }
    }, [category])


    if (data === null) return <Spinner/>

    const filterTasks: AnswerEntity[] = [...data.answersList].filter(answer => {
        if (searchText === "") {
            return answer
        } else if (answer.text.toLowerCase().includes(searchText.toLowerCase())) {
            return answer
        }
    });


    return (
        <>
            <section className='answers-sort'>
                <SortAnswers category={category} onSetCategoryChange={setCategory}/>
            </section>

            <section className='answers-search'>
                <label htmlFor="search">
                    Wyszukaj:
                    <input
                        type='text'
                        id='search'
                        placeholder='Wyszukaj'
                        value={searchText}
                        onChange={(e)=> setSearch(e.target.value)}
                    />
                </label>
            </section>

            <section className="answers-list">
                <AnswerContent
                    answersList={filterTasks}
                    templatesList={data.templatesList}
                    onAnswersListChange={() => refreshLists(location.pathname, setData)}/>
            </section>
        </>
    )
}

