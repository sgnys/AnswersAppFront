import React, {useEffect, useState} from "react";
import {FormEvent} from "react";
import {Btn} from "../../../common/Btn";
import {Spinner} from "../../../common/Spinner";
import {AnswerEntity, AnswerGroupEnum, CreateAnswerReq, CustomerOrConsultant, ListTemplatesRes} from "types";
import {refreshLists} from "../../../utils/refreshLists";

import './AddAnswer.css';

export const AddAnswer = () => {
    const [templates, setTemplates] = useState<ListTemplatesRes | null>(null)
    const [form, setForm] = useState<CreateAnswerReq>({
        text: "",
        templateId: "",
        category: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    useEffect(() => {
        refreshLists('/templates', setTemplates)

    }, []);


    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:3001/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            })

            const data: AnswerEntity = await res.json();

            setResultInfo(`Nowa odpowiedź w kategorii ${form.category}, została dodana.`);

        } finally {
            setLoading(false);
        }
    }


    if (templates === null) return <Spinner/>


    if (resultInfo !== null) {
        return (
            <div>
                <p><strong>{resultInfo}</strong></p>
                <button onClick={() => setResultInfo(null)}>Dodaj kolejną odpowiedź</button>
                <Btn to="/" text='Powród do głównego widoku aplikacji'/>
            </div>

        )
    }

    return (
        <>
            <h2>Dodaj Odpowiedź</h2>

            <form onSubmit={sendForm}>
                <label>
                    Rodzaj szablonu
                    <select
                        name="templateId"
                        value={form.templateId ?? ""}
                        onChange={e => updateForm("templateId", e.target.value)}
                    >
                        <>
                            <option value="">Pusty</option>
                            {
                                templates.templatesList.map(template => (
                                    <option key={template.id} value={template.id}>
                                        {template.name === CustomerOrConsultant.CUSTOMER ? 'Klient' : 'Konsultant'}
                                    </option>
                                ))
                            }

                        </>
                    </select>
                </label>
                <br/>
                <br/>

                <label> Podaj treść:
                    <textarea
                        name="text"
                        value={form.text}
                        onChange={e => updateForm("text", e.target.value)}
                        placeholder="Wpisz..."></textarea>
                    <br/>
                </label>

                <label>
                    <input type="radio" value={AnswerGroupEnum.IT} checked={form.category === AnswerGroupEnum.IT}
                           onChange={e => updateForm('category', e.target.value)}
                    />
                    IT
                </label>
                <label>
                    <input type="radio" value={AnswerGroupEnum.TELCO} checked={form.category === AnswerGroupEnum.TELCO}
                           onChange={e => updateForm('category', e.target.value)}
                    />

                    TELCO
                </label>
                <label>
                    <input type="radio" value={AnswerGroupEnum.PREPAID}
                           checked={form.category === AnswerGroupEnum.PREPAID}
                           onChange={e => updateForm('category', e.target.value)}
                    />

                    PREPAID
                </label>
                <label>
                    <input type="radio" value={AnswerGroupEnum.OTHER} checked={form.category === AnswerGroupEnum.OTHER}
                           onChange={e => updateForm('category', e.target.value)}
                    />

                    INNE
                </label>
                <br/>
                <br/>
                <Btn text="Zapisz"/>
            </form>
            <Btn to="/" text='Powród do głównego widoku aplikacji'/>
        </>
    )
}