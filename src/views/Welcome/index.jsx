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
          }}>
            <div className="mt-4 mb-4 px-5">
              <h1 className="fw-bold h-primary">Setup Quiz</h1>
            </div>

            <div className="mb-4 px-5">
              <Form.Group controlId="amount">
                <Form.Label className="fw-bold">No. of questions</Form.Label>
                <Form.Control type="number" className="custom-form-control" value={formDetails.amount} onKeyDown={(event) => {
                  if (event.key === 'ArrowUp')
                    setFormDetails({ ...formDetails, [event.target.id]: formDetails.amount + 1 });
                  else if (event.key === 'ArrowDown')
                    setFormDetails({ ...formDetails, [event.target.id]: formDetails.amount - 1 });
                }} />
              </Form.Group>
            </div>

            <div className="mb-4 px-5">
              <Form.Group controlId="category">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Control as="select" className="custom-form-control" onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }}>
                  <option value="sports">sports</option>
                  <option value="history">history</option>
                  <option value="politics">politics</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="mb-4 px-5">
              <Form.Group controlId="difficulty">
                <Form.Label className="fw-bold">Select difficulty</Form.Label>
                <Form.Control as="select" className="custom-form-control" onChange={(event) => { setFormDetails({ ...formDetails, [event.target.id]: event.target.value }) }}>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="mb-4 px-5 mx-auto my-auto">
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
