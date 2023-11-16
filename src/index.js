import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);


document.addEventListener('DOMContentLoaded', function() {
    
    const url = "http://localhost:8001/bookstore/";

    //GET ALL AUTHORS
    const getAllAuthors = document.getElementById('getAllAuthors');
    getAllAuthors.addEventListener('click', function() {
        clearContent();
        fetchAllAuthors();
    });

async function fetchAllAuthors() {
    try {
        const response = await fetch(`${url}authors`);
        const authors = await response.json();
        console.log(authors);

        const authorsList = document.getElementById('authorsList');
        authorsList.innerHTML = '';

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
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
