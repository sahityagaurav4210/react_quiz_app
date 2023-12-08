import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { load } from './index.js';

import Question from '../Question/index.jsx';

const Welcome = () => {
  const [formDetails, setFormDetails] = useState({ amount: 10, category: 'sports', difficulty: 'easy' });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [view, setView] = useState('Welcome');

  return (
    view === 'Welcome' ?
      <>
        <div id="quiz">
          <Form onSubmit={(event) => {
            event.preventDefault();
          }} className='mt-5'>
            <div className="px-5">
              <h1 className="fw-bold h-primary">Setup Quiz</h1>
            </div>

            <Form.Group controlId="amount" className='px-5 form-items'>
              <Form.Label className="form-label">Number of questions</Form.Label>
              <Form.Control type="number" className="custom-form-control" value={formDetails.amount} onChange={(event) => {
                setFormDetails({ ...formDetails, [event.target.id]: event.target.value })
              }} />
            </Form.Group>

            <Form.Group controlId="category" className='form-items px-5'>
              <Form.Label className="form-label">Category</Form.Label>
              <select as="select" className="custom-form-control custom-style" onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }}>
                <option value="sports">sports</option>
                <option value="history">history</option>
                <option value="politics">politics</option>
              </select>
            </Form.Group>

            <Form.Group controlId="difficulty" className='form-items px-5'>
              <Form.Label className="form-label">Select difficulty</Form.Label>
              <select className="custom-form-control custom-style" onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </Form.Group>

            <div className="form-items px-5 mx-auto">
              <Button type="submit" className="btn custom-btn fw-bold" disabled={loading} onClick={async () => {
                setLoading(true);
                setQuestions(await load(formDetails));
                setLoading(false);
                setView('Question');
              }}>
                {!loading ? 'Start' : 'Loading...'}
              </Button>
            </div>
          </Form>
        </div>
      </> :
      <Question question={questions[0].question} answer={questions[0].correct_answer} details={questions} options={questions[0].incorrect_answers} viewHandler={setView} />
  );
};

export default Welcome;
