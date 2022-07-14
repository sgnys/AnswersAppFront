import React, {useEffect, useState} from "react";
import {AnswerEntity, AnswerGroupEnum, ListAnswersRes} from 'types';
import {Spinner} from "../../../common/Spinner";
import {AnswerContent} from "../AnswerContent/AnswerContent";
import {refreshLists} from "../../../fetch/refreshLists";
import {useLocation} from "react-router-dom";
import {SortAnswers} from "../SortAnswers/SortAnswers";

import './AnswersList.css';
import {ErrorView} from "../../../views/ErrorView";

export const AnswersList = () => {
    const [data, setData] = useState<ListAnswersRes | null>(null);
    const [category, setCategory] = useState('all');
    const [searchText, setSearch] = useState('');
    const [error, setError] = useState('');
    let location = useLocation();

    useEffect(() => {
        if (category === AnswerGroupEnum.ALL) {
            refreshLists(location.pathname, setData, setError);
        } else {
            refreshLists(`/answers/sort/${category}`, setData, setError);
        }
    }, [category])

    if (error) return <ErrorView message={error}/>
    if (data === null) return <Spinner/>

    const filterTasks: AnswerEntity[] = [...data.answersList].filter(answer => {
        if (searchText === "") {
            return answer
        } else if (answer.text.toLowerCase().includes(searchText.toLowerCase())) {
            return answer
        }
        return null
    });


    return (
        <>
            <section className='answers-sort'>
                <SortAnswers category={category} onSetCategoryChange={setCategory}/>
            </section>

            <section className='answers-search'>
                <div className="search">
                    <label htmlFor="search">
                        Wyszukaj:
                        <input
                            type='search'
                            id='search'
                            placeholder='szukaj...'
                            value={searchText}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                    <p>Ilość znalezionych: <span>{filterTasks.length}</span></p>
                </div>
            </section>
            {/*<hr/>*/}
            <section className="answers-list">
                <AnswerContent
                    answersList={filterTasks}
                    templatesList={data.templatesList}
                    onAnswersListChange={() => refreshLists(location.pathname, setData, setError)}/>
            </section>
        </>
    )
}

