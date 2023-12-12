import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { load, payloadChecker } from './index.js';

import Question from '../Question/index.jsx';
import Loader from '../Loader/index.jsx';

const Welcome = ({ setState }) => {
  const [formDetails, setFormDetails] = useState({ amount: 10, category: 'sports', difficulty: 'easy' });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [view, setView] = useState('Welcome');
  const [isInvPayload, setPayloadState] = useState(false);

  return (
    view === 'Welcome' ?
      <>
        <section className='quiz quiz-sm'>
          <Form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <h1 className="h-primary">Setup Quiz</h1>

            <Form.Group controlId="amount" className='form-items'>
              <Form.Label className="form-label">Number of questions</Form.Label>
              <Form.Control type="number" className="custom-form-control" value={formDetails.amount} onChange={(event) => {
                setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
              }} />
            </Form.Group>

            <Form.Group controlId="category" className='form-items'>
              <Form.Label className="form-label">Category</Form.Label>
              <select as="select" className="custom-form-control" id='category' onChange={(event) => {
                setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
              }}>
                <option value="sports">sports</option>
                <option value="history">history</option>
                <option value="politics">politics</option>
              </select>
            </Form.Group>

            <Form.Group controlId="difficulty" className='form-items'>
              <Form.Label className="form-label">Select difficulty</Form.Label>
              <select className="custom-form-control" id='difficulty' onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </Form.Group>

            {isInvPayload && <p style={{ color: '#C92525', marginBottom: '2.25rem' }}>Can't Generate Questions, Please Try Different Options</p>}

            <button type="submit" className="d-flex align-items-center justify-content-center custom-btn" disabled={loading} onClick={async () => {
              if (payloadChecker(formDetails)) {
                isInvPayload && setPayloadState(false);
                setView('Loading');
                const results = await load(formDetails);
                if (results) {
                  setQuestions(results);
                  setState(true);
                  setView('Question');
                }
                else {
                  setView('Welcome');
                }
              }
              else {
                setPayloadState(true);
              }
            }}>
              Start
            </button>
          </Form>
        </section>
      </> :
      view === 'Loading' ? <Loader /> : <Question question={questions[0].question} answer={questions[0].correct_answer} details={questions} options={questions[0].incorrect_answers} viewHandler={setView} />
  );
};

export default Welcome;
