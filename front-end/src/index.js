import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelloWorldContainer} from './components/HelloWorldContainer';
import {PageContainer} from './layouts/PageContainer';
import {SearchPetProfilesPageContent} from './layouts/SearchPetProfilesPageContent';
import PetCard from './components/PetCard';

const disp = {
    goodWithAnimals: true,
    goodWithChildren: true,
    leashed: false
};

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PageContainer content={<PetCard name='cute doggo' age='3 years old' breed='cutie' description="He's a cute smol boi" availability disposition={disp} species='dog'/>} />} />
            <Route path='/findamatch' element={<PageContainer content={<div>Hello World</div>} />} />
            <Route path='/pets' element={<PageContainer content={<SearchPetProfilesPageContent/>} />} />
            <Route path='/news' element={<PageContainer content={<div>Hello World</div>} />} />
            <Route path='/profile' element={<PageContainer content={<div>Hello World</div>} />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);