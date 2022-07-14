import React, {FormEvent, useState} from 'react';
import {AnswerEntity, AnswerGroupEnum, CreateAnswerReq, CustomerOrConsultant, TemplateEntity} from 'types';
import {Btn} from "../../../common/Btn";
import {Spinner} from "../../../common/Spinner";
import {ErrorView} from "../../../views/ErrorView";

interface Props {
    answer: AnswerEntity;
    templatesList: TemplateEntity[];
}

export const EditAnswer = (props: Props) => {
    const [form, setForm] = useState<CreateAnswerReq>({
        text: props.answer.text,
        templateId: props.answer.templateId,
        category: props.answer.category,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [error, setError] = useState('');

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        if (!(form.text.trim().length < 3)) {

            setLoading(true);

            try {
                const res = await fetch(`http://localhost:3001/answers/${props.answer.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...form,
                    }),
                });

                if (res.status === 404) {
                    throw new Error("Nie można połączyć się z serwerem")
                }

                if ([400, 500].includes(res.status)) {

                    const error = await res.json();
                    setError(error.message);
                    throw new Error(error.message);

                }

                const data: AnswerEntity = await res.json();

                setResultInfo(`Odpowiedź o ID: ${props.answer.id} została zmodyfikowana.`);

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
                <Btn to="/" text='Powród do głównego widoku aplikacji'/>
            </>
        )
    }
    return (
        <>
            <div className="wrap">
                <h2 className="answer-title">Edytuj Odpowiedź</h2>

                <form onSubmit={sendForm} className="answer-form">
                    <div className="answer-form-wrap">
                        <div className="answer-template">
                            <label>
                                <span>Rodzaj szablonu</span>
                                <select
                                    name="templateId"
                                    value={form.templateId ?? ""}
                                    onChange={e => updateForm("templateId", e.target.value)}
                                >
                                    <>
                                        <option value="">Pusty</option>
                                        {
                                            props.templatesList.map(template => (
                                                <option key={template.id} value={template.id}>
                                                    {template.name === CustomerOrConsultant.CUSTOMER ? 'Klient' : 'Konsultant'}
                                                </option>
                                            ))
                                        }

                                    </>
                                </select>
                            </label>
                        </div>

                        <div className="answer-text">
                            <label>
                                <span>Edytuj treść:</span>
                                <textarea
                                    name="text"
                                    value={form.text}
                                    onChange={e => updateForm("text", e.target.value)}
                                    placeholder="Wpisz..."></textarea>
                                {form.text.trim().length < 3 &&
                                    <span
                                        className='span-validation'>Treść odpowiedzi musi posiadać minimum 3 znaki</span>}
                            </label>
                        </div>


                        <div className="categories">
                            <div className="category-element">
                                <label>
                                    <input type="radio" value={AnswerGroupEnum.IT} checked={form.category === 'it'}
                                           onChange={e => updateForm('category', e.target.value)}
                                    />
                                    IT
                                </label>
                            </div>

                            <div className="category-element">
                                <label>
                                    <input type="radio" value={AnswerGroupEnum.TELCO}
                                           checked={form.category === 'telco'}
                                           onChange={e => updateForm('category', e.target.value)}
                                    />

                                    TELCO
                                </label>
                            </div>

                            <div className="category-element">
                                <label>
                                    <input type="radio" value={AnswerGroupEnum.PREPAID}
                                           checked={form.category === 'prepaid'}
                                           onChange={e => updateForm('category', e.target.value)}
                                    />

                                    PREPAID
                                </label>
                            </div>

                            <div className="category-element">
                                <label>
                                    <input type="radio" value={AnswerGroupEnum.OTHER}
                                           checked={form.category === 'other'}
                                           onChange={e => updateForm('category', e.target.value)}
                                    />

                                    INNE
                                </label>
                            </div>
                        </div>


                    </div>
                    <Btn text="Zapisz"/>
                </form>
            </div>
            <Btn to="/" text='Powród do głównego widoku aplikacji'/>
        </>
    )
}
