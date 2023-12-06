import React, { useState } from 'react';
import { load } from './index.js';
import { Constants } from '../../config';

import Question from '../Question/index.jsx';

import './index.css';

let $CONST = new Constants();

function Welcome() {
  const [formdetails, setFormDetails] = useState({ amount: 10, category: 'sports', difficulty: 'easy' });
  const [questionState, setQuestionState] = useState(false);
  const [view, setView] = useState($CONST.views.HOME);
  const [questions, setQuestions] = useState([]);

  const selectHandler = function (event) {
    setFormDetails({ ...formdetails, [event.target.id]: event.target.value });
  }

  return view === $CONST.views.HOME ? <>
    <div className="container d-flex align-items-center justify-content-center flex-dir-col">
      <form className="d-flex flex-dir-col justify-content-center" onSubmit={async (event) => {
        event.preventDefault();
        setQuestionState(true);
        const questions = await load(formdetails);
        setQuestionState(false);

        if (questions?.length) {
          setQuestions(questions);
          setView($CONST.views.QUESTIONS);
        }
      }}>
        <h1>Setup Quiz</h1>
        <label htmlFor="amount">No. of questions</label>
        <input type="number" id="amount" placeholder="Ex: 10" value={formdetails.amount} onKeyDown={(event) => {
          const { key } = event;

          if (key === 'ArrowUp') {
            setFormDetails({ ...formdetails, [event.target.id]: ++formdetails.amount });
          }
          else if (key === 'ArrowDown') {
            setFormDetails({ ...formdetails, [event.target.id]: --formdetails.amount });
          }
        }} />

        <label htmlFor="category">Category</label>
        <select id='category' onChange={selectHandler}>
          <option value='sports'>Sports</option>
          <option value='history'>History</option>
          <option value='politics'>Politics</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select id='difficulty' onChange={selectHandler}>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>

        <input type="submit" value={!questionState ? "Start" : 'Loading...'} disabled={questionState} />
      </form>
    </div>
  </> : <Question question={questions[0].question} answer={questions[0].correct_answer} options={questions[0].incorrect_answers} details={questions} />
}

export default Welcome;
