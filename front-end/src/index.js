import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelloWorldContainer} from './components/HelloWorldContainer';
import {PageContainer} from './layouts/PageContainer';
import {SearchPetProfilesPageContent} from './layouts/SearchPetProfilesPageContent';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PageContainer content={<HelloWorldContainer/>} />} />
            <Route path='/findamatch' element={<PageContainer content={<div>Hello World</div>} />} />
            <Route path='/pets' element={<PageContainer content={<SearchPetProfilesPageContent/>} />} />
            <Route path='/news' element={<PageContainer content={<div>Hello World</div>} />} />
            <Route path='/profile' element={<PageContainer content={<div>Hello World</div>} />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);