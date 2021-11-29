import React from "react";
import "./App.css";
import Home from './home';
import Ticket from './ticket';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/tickets" element={<Home />}></Route>
        <Route path="/tickets/:id" element={<Ticket/>}></Route>
        <Route path="*" element={<Navigate to ="/tickets" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
