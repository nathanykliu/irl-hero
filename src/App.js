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

//info box at bottom right
function createInfoBox() {
  const infoBox = document.createElement('div');
  infoBox.id = 'infoBox';
  infoBox.innerHTML = `
      <h3>Created by Nathan Liu</h3>
      <p><a target = "_blank" href="https://github.com/nateykliu/irl-hero">View this project in Github</a></p>
      <p><a target = "_blank" href ="https://github.com/nateykliu/irl-hero/issues/new">Report a bug</a></p>
  `;
  document.body.appendChild(infoBox);
}

createInfoBox();

export default App;

