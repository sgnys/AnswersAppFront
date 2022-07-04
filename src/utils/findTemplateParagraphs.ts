import {TemplateEntity} from 'types';

export const findTemplateFirstParagraph = (id: string | null, templatesList: TemplateEntity[]): string | null => {

    const template = templatesList.find(item => item.id === id);
    if (!template) return null;
    return template.firstParagraph;
}


export const findTemplateLastParagraph = (id: string | null, templatesList: TemplateEntity[]): string | null => {

    const template = templatesList.find(item => item.id === id);
    if (!template) return null;
    return template.lastParagraph;
}