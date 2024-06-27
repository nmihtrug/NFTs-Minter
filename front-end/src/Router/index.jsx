import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from '../Login/index';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
