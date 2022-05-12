import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HelloWorldContainer} from './components/HelloWorldContainer';
import {PageContainer} from './layouts/PageContainer';
import {SearchPetProfilesPageContent} from './layouts/SearchPetProfilesPageContent';
import {NewsPageContent} from './layouts/NewsPageContent';
import PetCard from './components/PetCard';
import UserProfilePage from './layouts/UserProfilePageContent';
import LandingPageContent from './layouts/LandingPageContent';
import {FindAMatchPageContent} from './layouts/FindAMatchPageContent';

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

export let API_URL;
if(process.env.NODE_ENV == 'development') {
    API_URL = 'http://localhost:8080';
} else {
    API_URL = 'https://backend-dot-animal-adoption-app-347718.uc.r.appspot.com';
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PageContainer content={<LandingPageContent />} />} />
            <Route path='/findamatch' element={<PageContainer content={<FindAMatchPageContent />} />} />
            <Route path='/pets' element={<PageContainer content={<SearchPetProfilesPageContent/>} />} />
            <Route path='/news' element={<PageContainer content={<NewsPageContent />} />} />
            <Route path='/profile' element={<PageContainer content={<UserProfilePage />} />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);