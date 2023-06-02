import logo from './logo.svg';
import './App.css';
import Login_sign from './pages/js/login_signup';
import { useState } from 'react';
import Main from './pages/js/main';
import Admin from './pages/js/adminPages/admin';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {


  return (
    <Router>
      <div className="main_cont">
        <Routes>
          <Route path="/login" Component={Login_sign}/>
          <Route path="/" Component={Main}/>
          <Route path="/admin" Component={Admin}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
