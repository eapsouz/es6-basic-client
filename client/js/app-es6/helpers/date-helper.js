export class DateHelper {

    constructor() {

        throw new Error('This Class cannot be instantiated.');
    }
    
    static dateToText(data) {

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textToDate(text) {

        if (!/\d{2}\/\d{2}\/\d{4}/.test(text))
            throw new Error('It should assume the dd/mm/aaaa format');

        return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
    }
}