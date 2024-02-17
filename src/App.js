import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Main from './Main';

function App() {
  useEffect(() => {<Home />},[]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/Home"} element={<Home />}></Route>
          <Route path={"/Main"} element={<Main />}></Route>
        </Routes>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
