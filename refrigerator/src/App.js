// ./App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* 홈페이지 */}
          </Route>
          <Route path="/menu" element={<Menu />}>
            {/* 메뉴 페이지 */}
          </Route>
          <Route path="/login" element={<Login />}>
            {/* 로그인 페이지 */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;