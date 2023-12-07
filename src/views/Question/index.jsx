import { useState } from 'react';

import { submit, next, calculateScore } from './index.js';

const Question = function ({ question, answer, options, details, viewHandler }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    let choices;

    if (!currentQuestion) {
        choices = [...options, answer];
    }
    else if (currentQuestion < details.length) {
        choices = [details[currentQuestion]?.correct_answer, ...details[currentQuestion]?.incorrect_answers];
    }

    return !currentQuestion ? <>
        <div className="content container d-flex justify-content-center">
            <div className="answer d-flex align-items-center justify-content-end mt-4">
                <p>Correct answer : {currentScore}/{currentQuestion}</p>
            </div>

            <div className="question d-flex align-items-center justify-content-center text-center">
                <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
            </div>

            <div className="options d-flex align-items-center justify-content-center">
                {
                    choices.map((choice, index) => <div className="choices d-flex align-items-center justify-content-center mb-3 mt-2" dangerouslySetInnerHTML={{ __html: choice }} key={index} onClick={(event) => {
                        submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                    }}>
                    </div>)
                }
            </div>

            <div className="footer d-flex align-items-center justify-content-end px-4 mb-4">
                <button type="submit" className="fw-bold mb-4 p-1">Next Question</button>
            </div>
        </div>
    </> : <>
        {currentQuestion < details.length ?
            <>
                <div className="content container d-flex justify-content-center">
                    <div className="answer d-flex align-items-center justify-content-end mt-4">
                        <p>Correct answer : {currentScore}/{currentQuestion}</p>
                    </div>

                    <div className="question d-flex align-items-center justify-content-center text-center">
                        <h2 dangerouslySetInnerHTML={{ __html: details[currentQuestion].question }}></h2>
                    </div>

                    <div className="options d-flex align-items-center justify-content-center">
                        {
                            choices.map(choice => <div className="choices d-flex align-items-center justify-content-center mb-3 mt-2" onClick={(event) => {
                                submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                            }} dangerouslySetInnerHTML={{ __html: choice }}>
                            </div>)
                        }
                    </div>

                    <div className="footer d-flex align-items-center justify-content-end px-4 mb-4">
                        <button type="submit" className="fw-bold mb-4 p-1">Next Question</button>
                    </div>
                </div>
            </> :
            <>
                <div className="content container d-flex justify-content-center align-items-center" style={{ height: '40%' }}>
                    <h1 className='fw-bold'>Congrats!</h1>
                    <h2>You've answered {calculateScore(currentScore, details.length)}% of the questions correctly</h2>
                    <button type='button' className='btn mt-3 fw-bold' onClick={() => viewHandler('Welcome')}>Play Again</button>
                </div>
            </>
        }
    </>
}

export default Question;