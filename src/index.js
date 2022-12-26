import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ConverterContext from './contexts/ConverterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConverterContext>
        <App />
    </ConverterContext>
);
