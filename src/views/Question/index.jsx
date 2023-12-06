import { useState } from 'react';

import { submit, next, calculateScore } from './index.js';

import './index.css';

const Question = function ({ question, answer, options, details }) {
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
        <div className="container d-flex justify-content-center flex-dir-col">
            <div className="header d-flex align-items-center justify-content-center">
                <h2>{question}</h2>
            </div>

            <div className="content">
                {
                    choices.map((choice, index) => <div className="options d-flex align-items-center justify-content-center" onClick={(event) => {
                        submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                    }}> <p key={index}>{choice}</p></div>)
                }
            </div>

            <div className="footer d-flex align-items-center">
                <button type="button" className="btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>Next question</button>
            </div>
        </div>
    </> : <>
        {currentQuestion < details.length ?
            <>
                <div className="container d-flex justify-content-center flex-dir-col">
                    <div className="header d-flex align-items-center justify-content-center">
                        <h2>{details[currentQuestion].question}</h2>
                    </div>

                    <div className="content">
                        {
                            choices.map(choice => <div className="options d-flex align-items-center justify-content-center" onClick={(event) => {
                                submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                            }}> <p>{choice}</p></div>)
                        }
                    </div>

                    <div className="footer d-flex align-items-center">
                        <button type="button" className="btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>Next question</button>
                    </div>
                </div>
            </> :
            <>
                <div className="container d-flex justify-content-center flex-dir-col align-items-center" style={{ height: '40%' }}>
                    <h2>You're score is {calculateScore(currentScore, details.length)}%</h2>
                </div>
            </>
        }
    </>
}

export default Question;