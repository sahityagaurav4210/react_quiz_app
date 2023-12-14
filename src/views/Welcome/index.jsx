import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { load, payloadChecker } from './index.js';

import $TXT from '../../i18n/index.js';
import { Constants } from '../../config';

import Question from '../Question/index.jsx';
import Loader from '../Loader/index.jsx';

const $CONST = new Constants();

const Welcome = ({ setState }) => {
  const [formDetails, setFormDetails] = useState({ amount: 10, category: 'sports', difficulty: 'easy' });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [view, setView] = useState('Welcome');
  const [isInvPayload, setPayloadState] = useState(false);

  return (
    view === 'Welcome' ?
      <>
        {
          !isInvPayload ?
            <section className='quiz quiz-sm'>
              <Form onSubmit={(event) => {
                event.preventDefault();
              }}>
                <h1 className="h-primary">{$TXT.EN.HEADING.APP}</h1>

                <Form.Group controlId="amount" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.QUESTIONS}</Form.Label>
                  <Form.Control type="number" className="custom-form-control" value={formDetails.amount} onChange={(event) => {
                    setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
                  }} />
                </Form.Group>

                <Form.Group controlId="category" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.CATEGORY}</Form.Label>
                  <select as="select" className="custom-form-control" id='category' onChange={(event) => {
                    setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
                  }} defaultValue={formDetails.category}>
                    <option value="sports"> {$TXT.EN.FORM.SELECTS.CATEGORY.SPORTS}</option>
                    <option value="history">{$TXT.EN.FORM.SELECTS.CATEGORY.HISTORY}</option>
                    <option value="politics">{$TXT.EN.FORM.SELECTS.CATEGORY.POLITICS}</option>
                  </select>
                </Form.Group>

                <Form.Group controlId="difficulty" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.DIFFICULTY}</Form.Label>
                  <select className="custom-form-control" id='difficulty' onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }} defaultValue={formDetails.difficulty}>
                    <option value="easy">{$TXT.EN.FORM.SELECTS.DIFFICULTY.EASY}</option>
                    <option value="medium">{$TXT.EN.FORM.SELECTS.DIFFICULTY.MEDIUM}</option>
                    <option value="hard">{$TXT.EN.FORM.SELECTS.DIFFICULTY.HARD}</option>
                  </select>
                </Form.Group>

                {isInvPayload && <p style={{ color: '#BB2525', marginBottom: '1.4rem', fontSize: '1rem' }}>{$TXT.EN.ERRORS.FORM.API}</p>}

                <button type="submit" className="d-flex align-items-center justify-content-center custom-btn" disabled={loading} onClick={async () => {
                  if (payloadChecker(formDetails)) {
                    isInvPayload && setPayloadState(false);
                    setView($CONST.views.LOADING);
                    const results = await load(formDetails);
                    if (results) {
                      setQuestions(results);
                      setState(true);
                      setView($CONST.views.QUESTIONS);
                    }
                    else {
                      setView($CONST.views.HOME);
                      setPayloadState(true);
                    }
                  }
                  else {
                    setPayloadState(true);
                  }
                }}>
                  {$TXT.EN.FORM.BUTTONS.START}
                </button>
              </Form>
            </section> :
            <section className='quiz quiz-sm quiz-sp'>
              <Form onSubmit={(event) => {
                event.preventDefault();
              }}>
                <h1 className="h-primary">{$TXT.EN.HEADING.APP}</h1>

                <Form.Group controlId="amount" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.QUESTIONS}</Form.Label>
                  <Form.Control type="number" className="custom-form-control" value={formDetails.amount} onChange={(event) => {
                    setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
                  }} />
                </Form.Group>

                <Form.Group controlId="category" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.CATEGORY}</Form.Label>
                  <select as="select" className="custom-form-control" id='category' onChange={(event) => {
                    setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
                  }} defaultValue={formDetails.category}>
                    <option value="sports"> {$TXT.EN.FORM.SELECTS.CATEGORY.SPORTS}</option>
                    <option value="history">{$TXT.EN.FORM.SELECTS.CATEGORY.HISTORY}</option>
                    <option value="politics">{$TXT.EN.FORM.SELECTS.CATEGORY.POLITICS}</option>
                  </select>
                </Form.Group>

                <Form.Group controlId="difficulty" className='form-items'>
                  <Form.Label className="form-label">{$TXT.EN.FORM.LABLES.DIFFICULTY}</Form.Label>
                  <select className="custom-form-control" id='difficulty' onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }} defaultValue={formDetails.difficulty}>
                    <option value="easy">{$TXT.EN.FORM.SELECTS.DIFFICULTY.EASY}</option>
                    <option value="medium">{$TXT.EN.FORM.SELECTS.DIFFICULTY.MEDIUM}</option>
                    <option value="hard">{$TXT.EN.FORM.SELECTS.DIFFICULTY.HARD}</option>
                  </select>
                </Form.Group>

                {isInvPayload && <p style={{ color: '#BB2525', marginBottom: '1.4rem', fontSize: '1rem' }}>{$TXT.EN.ERRORS.FORM.API}</p>}

                <button type="submit" className="d-flex align-items-center justify-content-center custom-btn" disabled={loading} onClick={async () => {
                  if (payloadChecker(formDetails)) {
                    isInvPayload && setPayloadState(false);
                    setView($CONST.views.LOADING);
                    const results = await load(formDetails);
                    if (results) {
                      setQuestions(results);
                      setState(true);
                      setView($CONST.views.QUESTIONS);
                    }
                    else {
                      setView($CONST.views.HOME);
                    }
                  }
                  else {
                    setPayloadState(true);
                  }
                }}>
                  {$TXT.EN.FORM.BUTTONS.START}
                </button>
              </Form>
            </section>
        }
      </> :
      view === 'Loading' ? <Loader /> : <Question question={questions[0].question} answer={questions[0].correct_answer} details={questions} options={questions[0].incorrect_answers} viewHandler={setView} />
  );
};

export default Welcome;
