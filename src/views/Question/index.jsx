import { useState } from 'react';

import { submit, next, calculateScore } from './index.js';
import $TXT from '../../i18n/index.js';

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
  else {
    choices = [details[currentQuestion - 1]?.correct_answer, ...details[currentQuestion - 1]?.incorrect_answers];
  }

  return !currentQuestion ?
    <>
      <div className="content" style={{ zIndex: 1 }}>
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

        <button type="submit" className="next-btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>{$TXT.EN.FORM.BUTTONS.NEXT}</button>
      </div>
    </> :
    <>
      {currentQuestion < details.length ?
        <>
          <div className="content">
            <p>Correct answers : {currentScore}/{currentQuestion}</p>

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

            <button type="submit" className="next-btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>{$TXT.EN.FORM.BUTTONS.NEXT}</button>
          </div>
        </> :
        <>
          <div className="content">
            <p style={{ textTransform: 'capitalize', letterSpacing: '.1rem' }}>Correct answers : {currentScore}/{currentQuestion}</p>

            <article>
              <h2 dangerouslySetInnerHTML={{ __html: details[currentQuestion - 1].question }}></h2>
              <div className="btn-container">
                {
                  choices.map((choice, index) => <button className="ans-btn" dangerouslySetInnerHTML={{ __html: choice }} key={index} onClick={(event) => {
                    submit(event, setCurrentQuestion, setCurrentScore, (currentQuestion - 1), currentScore, details);
                  }}>
                  </button>)
                }
              </div>
            </article>

            <button type="submit" className="next-btn" onClick={() => next(currentQuestion, setCurrentQuestion)}>{$TXT.EN.FORM.BUTTONS.NEXT}</button>
          </div>

          <div className="modal-container d-flex align-items-center justify-content-center">
            <div className="modal-content">
              <h2>{$TXT.EN.HEADING.CONGRATS}</h2>
              <p>{$TXT.EN.HEADING.RESLUTS.replace('%age', `${calculateScore(currentScore, details.length)}%`)}</p>
              <button type='button' className='next-btn play-btn' onClick={() => viewHandler('Welcome')}>{$TXT.EN.FORM.BUTTONS.PLAY}</button>
            </div>
          </div>
        </>
      }
    </>
}

export default Question;