import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useParams} from "react-router-dom";
import {GetSingleTemplateRes, TemplateEntity,} from 'types';
import {Spinner} from "../../../common/Spinner";
import {Btn} from "../../../common/Btn";

interface Props {
    template: TemplateEntity;
}

export const TemplateEditForm = (props: Props) => {

    const [firstParagraph, setFirstParagraph] = useState(props.template.firstParagraph);
    const [lastParagraph, setLastParagraph] = useState(props.template.lastParagraph);
    const [loading, setLoading] = useState(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const params = useParams();

    const handleChangeFirstParagraph = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFirstParagraph(e.target.value)
    }

    const handleChangeLastParagraph = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setLastParagraph(e.target.value)
    }

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

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
                })

                const data: GetSingleTemplateRes = await res.json();
                console.log(data);
                setResultInfo(`Szablon dla ${data.template.name === 'customer' ? 'Klienta' : 'Konsultanta'}, został zmodyfikowany.`);
            } finally {
                setLoading(false);
            }
        }


        if (loading) {
            return <Spinner/>
        }

        if (resultInfo !== null) {
            return (
                <div>
                    <p><strong>{resultInfo}</strong></p>
                    <button onClick={() => setResultInfo(null)}>Wróć do edycji szablonu</button>
                </div>
            )
        }

        return (
            <>
                <h2>Formularz do Edycji szablonu</h2>
                <p>{params.id}</p>

                <form className='template-edit-form' onSubmit={sendForm}>
                    <label>
                        Akapit Powitania: <br/>
                        <textarea
                            name='firstParagraph'
                            value={firstParagraph}
                            onChange={handleChangeFirstParagraph}
                        />
                    </label>
                    <br/>
                    <label>
                        Akapit Pożegnania: <br/>
                        <textarea
                            name='lastParagraph'
                            value={lastParagraph}
                            onChange={handleChangeLastParagraph}
                        />
                    </label>
                    <button type="submit">Zapisz</button>
                </form>
                <Btn to="/templates" text='Powród do szablonów'/>
                <Btn to="/" text='Powród do głównego widoku aplikacji'/>
            </>
        )
}
