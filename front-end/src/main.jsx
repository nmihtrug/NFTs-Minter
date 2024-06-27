import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Toast from './components/Toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
        <Toast />
    </React.StrictMode>
);
