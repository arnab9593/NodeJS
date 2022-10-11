import React from "react";
import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
      </header>
    </div>
  );
}

export default App;
