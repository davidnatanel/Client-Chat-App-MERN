import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL = 'https://chatservicesocketio.herokuapp.com' || "http://localhost:5000";
axios.defaults.baseURL = "https://server-chat-app-mern-production.up.railway.app";
console.log( process.env.REACT_APP_API)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

