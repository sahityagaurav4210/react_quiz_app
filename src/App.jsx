import { useState } from 'react';
import Welcome from './views/Welcome/index.jsx';

function App() {
  const [state, setState] = useState(false);
  // alert(window.innerWidth)
  return <>
    {
      !state ? <main className="d-flex align-items-center justify-content-center">
        <Welcome setState={setState} />
      </main> : <main className="d-flex justify-content-center">
        <Welcome setState={setState} />
      </main>
    }
  </>
}

export default App
