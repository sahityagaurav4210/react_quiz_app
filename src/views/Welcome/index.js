import { envs, Constants } from '../../config/index';

const $CONST = new Constants();
/**
 * 
 * @param {object} formdetails 
 * @returns {Array}
 * @description Takes the details entered by the user and returns the questions with possible options based on them.
 */
const load = async function (formdetails) {
    let url;
    const $ENV = envs();

    switch (formdetails.category) {
        case $CONST.categories.SPORTS:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=21&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        case $CONST.categories.HISTORY:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=23&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        case $CONST.categories.POLITICS:
            url = `${$ENV.VITE_API_URL}?amount=${formdetails.amount}&category=24&difficulty=${formdetails.difficulty}&type=multiple`;
            break;

        default:
            url = `${$ENV.VITE_API_URL}?amount=21&category=sports&difficulty=easy&type=multiple`;
            break;
    }

    const raw = await fetch(url);
    const { results } = await raw.json();
    if (raw.status === 200 && Array.isArray(results) && results.length) {
        return results;
    }
    else
        return null;
}

function payloadChecker(payload = {}) {
    let flag = false;

    for (let item in payload) {
        if (item === 'amount' && (isNaN(parseInt(payload[item])) || (parseInt(payload[item]) < 0 || parseInt(payload[item]) > 50)) || !payload[item]) {
            flag = true;
        }
        if (item !== 'amount' && (!Object.values($CONST.categories).includes(payload[item]) && !Object.values($CONST.difficulty).includes(payload[item]))) {
            flag = true;
        }
    }

    return !flag;
}

export { load, payloadChecker };