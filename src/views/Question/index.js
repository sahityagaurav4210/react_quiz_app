/**
 * 
 * @param {object} event 
 * @param {function} currentQuestionHandler 
 * @param {function} currentScoreHandler 
 * @param {string} currentQuestion 
 * @param {string} currentScore 
 * @param {array} array
 * @returns {void}
 * @description Submits the answer given by the user and calculates the score based on it and then move the user to next question. 
 */
function submit(event, currentQuestionHandler, currentScoreHandler, currentQuestion, currentScore, array) {
    if (currentQuestion < array.length) {
        if (array[currentQuestion].correct_answer === event.target.innerText) {
            currentScoreHandler(currentScore + 1);
        }
        currentQuestionHandler(currentQuestion + 1);
    }
}

/**
 * 
 * @param {string} currentQuestion 
 * @param {function} currentQuestionHandler
 * @returns {void}
 * @description Increments the counter of question and move the user to next question. It doesn't do anything to score. 
 */
function next(currentQuestion, currentQuestionHandler) {
    currentQuestionHandler(currentQuestion + 1);
}

/**
 * 
 * @param {number} score 
 * @param {number} total 
 * @returns {number} 
 * @description Calculates the percentage earned by the user in the quiz
 */
function calculateScore(score, total) {
    return Math.round((score / total) * 100);
}


export { submit, next, calculateScore };