import './App.css';
import React from 'react';
import GameCanvas from './components/GameCanvas';
import { Analytics } from '@vercel/analytics/react'

document.addEventListener('DOMContentLoaded', (event) => {
  var intromodal = document.getElementById("intromodal");
  var closeButton = document.getElementsByClassName("intromodal-close")[0];

  closeButton.onclick = function() {
    intromodal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === intromodal) {
      intromodal.style.display = "none";
    }
  }

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      intromodal.style.display = "none";
    }
  });

  intromodal.style.display = "block";
});

//load irl-hero 
const App = () => {
  return (
      <div className="App">
          <GameCanvas />
          <Analytics />
      </div>
  );
};

export default App;

