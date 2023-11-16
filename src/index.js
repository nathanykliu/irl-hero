import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authors from './Authors'; // Make sure this path is correct
// import Books from './Books'; // Make sure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} /> */}
    </Routes>
  </Router>
);
