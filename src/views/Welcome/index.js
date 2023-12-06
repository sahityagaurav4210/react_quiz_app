import { envs, Constants } from '../../config/index';

/**
 * 
 * @param {object} formdetails 
 * @returns {Array}
 * @description Takes the details entered by the user and returns the questions with possible options based on them.
 */
const load = async function (formdetails) {
    let url;
    const $ENV = envs();
    const $CONST = new Constants();

    switch (formdetails.category) {
        case $CONST.categories.SPORTS:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=21&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        case $CONST.categories.HISTORY:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=22&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        case $CONST.categories.POLITICS:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=23&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        default:
            url = `${$ENV.VITE_API_URL}?amount=21&category=sports&difficulty=easy&type=multiple`;
            break;
    }

    const raw = await fetch(url);
    const { results } = await raw.json();
    return results;
}

export { load };