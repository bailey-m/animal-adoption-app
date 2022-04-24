import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelloWorldContainer} from './components/HelloWorldContainer';
import {PageContainer} from './layouts/PageContainer';
import {SearchPetProfilesPageContent} from './layouts/SearchPetProfilesPageContent';
import {NewsPageContent} from './layouts/NewsPageContent';
import PetCard from './components/PetCard';

const testPetInfo = {
    name: 'NAME',
    age: 'AGE',
    breed: 'BREED',
    description: 'DESCRIPTION GOES HERE',
    availability: 'Pending',
    disposition: {
        goodWithAnimals: true,
        goodWithChildren: false,
        leashed: true
    },
    species: 'SPECIES',
    image: 'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg'
}




ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PageContainer content={<HelloWorldContainer/>} />} />
            <Route path='/findamatch' element={<PageContainer content={PetCard petInfo={testPetInfo} />} />
            <Route path='/pets' element={<PageContainer content={<SearchPetProfilesPageContent />} />} />
            <Route path='/news' element={<PageContainer content={<NewsPageContent />} />} />
            <Route path='/profile' element={<PageContainer content={<div>Hello World</div>} />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);