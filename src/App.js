import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Main from './Main';
import Login from './Login';
import Signup from './SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"./home"} element={<Home />}></Route>
          <Route path={"./main"} element={<Main />}></Route>
        </Routes>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
