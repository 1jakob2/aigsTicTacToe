import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import RegisterForm from "./components/forms/RegisterForm.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";
import GameGrid from "./components/game/GameGrid.tsx";

const App: React.FC = () => {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/game" element={<GameGrid />}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
