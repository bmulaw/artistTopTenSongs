import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const [status, getStatus] = useState("not working");
  // source https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project/page/4
  useEffect(() => {
    fetch('/test')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      getStatus(data.status);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p> The connection between React and Flask is {status}</p>
        <Form/>
      </header>
    </div>
  );
}

export default App;
