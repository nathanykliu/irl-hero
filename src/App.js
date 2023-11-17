import './App.css';
import React from 'react';
import MicroModal from 'micromodal';
import GameCanvas from './components/GameCanvas';

document.addEventListener('DOMContentLoaded', (event) => {
  // Get the modal
  var modal = document.getElementById("modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Close modal when pressing Escape key
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.style.display = "none";
    }
  });

  // Display the modal by default
  modal.style.display = "block";
});

const App = () => {
  return (
      <div className="App">
          <GameCanvas />
      </div>
  );
};

export default App;

