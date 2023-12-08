import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { submit, next, calculateScore } from './index.js';

const Question = function ({ question, answer, options, details, viewHandler }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [modalState, setModalState] = useState(false);

    let choices;

    if (!currentQuestion) {
        choices = [...options, answer];
    }
    else if (currentQuestion < details.length) {
        choices = [details[currentQuestion]?.correct_answer, ...details[currentQuestion]?.incorrect_answers];
    }

    return !currentQuestion ? <>
        <div className="content">
            <p style={{ textTransform: 'capitalize', letterSpacing: '.1rem' }}>Correct answers : {currentScore}/{currentQuestion}</p>

            <article>
                <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
                <div className="btn-container">
                    {
                        choices.map((choice, index) => <button className="ans-btn" dangerouslySetInnerHTML={{ __html: choice }} key={index} onClick={(event) => {
                            submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                        }}>
                        </button>)
                    }
                </div>
            </article>

            <button type="submit" className="next-btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>Next Question</button>
        </div>
    </> : <>
        {currentQuestion < details.length ?
            <>
                <div className="content">
                    <p style={{ textTransform: 'capitalize', letterSpacing: '.1rem' }}>Correct answers : {currentScore}/{currentQuestion}</p>

                    <article>
                        <h2 dangerouslySetInnerHTML={{ __html: details[currentQuestion].question }}></h2>
                        <div className="btn-container">
                            {
                                choices.map((choice, index) => <button className="ans-btn" dangerouslySetInnerHTML={{ __html: choice }} key={index} onClick={(event) => {
                                    submit(event, setCurrentQuestion, setCurrentScore, currentQuestion, currentScore, details);
                                }}>
                                </button>)
                            }
                        </div>
                    </article>

                    <button type="submit" className="next-btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>Next Question</button>
                </div>
            </> :
            <>
                <Modal show={!modalState} onHide={setModalState} centered={true} style={{ overflowY: 'hidden', margin: 'auto', width: '80%' }}>
                    <Modal.Header style={{ border: 'none' }}>
                        <Modal.Title>Congrats!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <p>You've answered {calculateScore(currentScore, details.length)}% of the questions correctly</p>
                    </Modal.Body>
                    <Modal.Footer style={{ border: 'none' }}>
                        <Button onClick={setModalState}>
                            Play Again
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        }
    </>
}

export default Question;