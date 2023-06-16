import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Items from './Items';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Headversity Sorting items
        </p>
      </header>
      <Container fluid>
      <Items/>
      </Container>
    </div>
  );
}

export default App;
