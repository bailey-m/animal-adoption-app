import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelloWorldContainer} from './HelloWorldContainer';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HelloWorldContainer />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);