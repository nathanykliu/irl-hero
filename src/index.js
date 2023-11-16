import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

document.addEventListener('DOMContentLoaded', function() {
    
    const url = "http://localhost:8001/bookstore/";

    //GET ALL GOALS
    const getAllGoals = document.getElementById('getAllGoals');
    getAllGoals.addEventListener('click', function() {
        clearContent();
        fetchAllGoals();
    });

async function fetchAllGoals() {
    try {
        const response = await fetch(`${url}authors`);
        const authors = await response.json();
        console.log(authors);

        const authorsList = document.getElementById('authorsList');

        authors.forEach(author => {
            const listItem = document.createElement('li');
            listItem.textContent = `${author.firstname} ${author.lastname} - ${author.country}`;
            authorsList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

function clearContent() {
    const authorsList = document.getElementById('authorsList');
    const authorDetails = document.getElementById('authorDetails');
    authorsList.innerHTML = '';
    authorDetails.innerHTML = '';
  
}

});
