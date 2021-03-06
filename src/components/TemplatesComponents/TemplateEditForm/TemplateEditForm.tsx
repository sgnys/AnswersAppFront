import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useParams} from "react-router-dom";
import {CustomerOrConsultant, GetSingleTemplateRes, TemplateEntity,} from 'types';
import {Spinner} from "../../../common/Spinner";
import {Btn} from "../../../common/Btn"
import {ErrorView} from "../../../views/ErrorView";

import './TemplateEditForm.css';

interface Props {
    template: TemplateEntity;
}

export const TemplateEditForm = (props: Props) => {

    const [firstParagraph, setFirstParagraph] = useState(props.template.firstParagraph);
    const [lastParagraph, setLastParagraph] = useState(props.template.lastParagraph);
    const [loading, setLoading] = useState(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [error, setError] = useState('');

    const params = useParams();

    const handleChangeFirstParagraph = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFirstParagraph(e.target.value);
    }

    const handleChangeLastParagraph = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setLastParagraph(e.target.value)
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        if (!(firstParagraph.trim().length < 3) && !(lastParagraph.trim().length < 3)) {

            setLoading(true);

            try {
                const res = await fetch(`http://localhost:3001/templates/${params.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstParagraph,
                        lastParagraph,
                    })
                });

                if (res.status === 404) {
                    throw new Error("Nie można połączyć się z serwerem")
                }

                if ([400, 500].includes(res.status)) {

                    const error = await res.json();
                    setError(error.message);
                    throw new Error(error.message);

                }

                const data: GetSingleTemplateRes = await res.json();
                setResultInfo(`Szablon odpowiedzi do ${data.template.name === 'customer' ? 'Klienta' : 'Konsultanta'} został zmodyfikowany.`);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    }

    if (error) return <ErrorView message={error}/>
    if (loading) return <Spinner/>


    if (resultInfo !== null) {
        return (
            <>
                <div className="result-info">
                    <p><strong>{resultInfo}</strong></p>
                </div>
                <button className="result-info-btn" onClick={() => setResultInfo(null)}>Wróć do edycji szablonu</button>
            </>
        )
    }


    return (
        <>
            <div className="wrap template-wrap">
                <h2 className="template-title">
                    Formularz Edycji
                    Szablonu <span>( {props.template.name === CustomerOrConsultant.CUSTOMER ? 'Klient' : 'Konsultant'} )</span>
                </h2>

                <form className='template-form' onSubmit={sendForm}>
                    <div className="template-form-wrap">
                        <div className="template-content">
                            <label>
                                <p>Akapit Powitania:</p>
                                <textarea
                                    name='firstParagraph'
                                    value={firstParagraph}
                                    maxLength={200}
                                    minLength={3}
                                    onChange={handleChangeFirstParagraph}
                                />
                                {(firstParagraph.trim().length < 3 || firstParagraph.length > 200)
                                    &&
                                    <span className='span-validation'>Ten akapit musi mieć od 3 do 200 znaków</span>}
                            </label>
                        </div>


                        <div className="template-content">
                            <label>
                                <p>Akapit Pożegnania:</p>
                                <textarea
                                    name='lastParagraph'
                                    value={lastParagraph}
                                    maxLength={300}
                                    minLength={3}
                                    onChange={handleChangeLastParagraph}
                                />
                                {(lastParagraph.trim().length < 3 || lastParagraph.length > 300)
                                    &&
                                    <span className='span-validation'>Ten akapit musi mieć od 3 do 300 znaków</span>}
                            </label>
                        </div>
                    </div>
                    <button type="submit">Zapisz</button>
                </form>
            </div>
            <div className="template-btns">
                <Btn to="/templates" text='Powród do szablonów'/>
                <Btn to="/" text='Powród do głównego widoku aplikacji'/>
            </div>
        </>
    )
}
