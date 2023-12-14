/**
 * @returns {object}
 * @description Returns all the environment variables of the application.Please note variables returned by it are immutable.
 */
function envs() {
    return Object.freeze(import.meta.env);
}

/**
 * @returns {object}
 * @description - Returns all the global constants of the application. Please note constants returned by it are immutable.
 */
function Constants() {
    this.views = Object.freeze({
        HOME: 'Welcome',
        QUESTIONS: 'Questions',
        LOADING: 'Loading'
    });

    this.categories = Object.freeze({
        SPORTS: 'sports',
        HISTORY: 'history',
        POLITICS: 'politics'
    });

    this.difficulty = Object.freeze({
        EASY: 'easy',
        MEDIUM: 'medium',
        HARD: 'hard'
    })
}
export { envs, Constants };