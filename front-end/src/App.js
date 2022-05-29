import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {PageContainer} from './layouts/PageContainer';
import {SearchPetProfilesPageContent} from './layouts/SearchPetProfilesPageContent';
import {NewsPageContent} from './layouts/NewsPageContent';
import UserProfilePage from './layouts/UserProfilePageContent';
import LandingPageContent from './layouts/LandingPageContent';
import {FindAMatchPageContent} from './layouts/FindAMatchPageContent';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import oktaConfig from './config';

const oktaAuth = new OktaAuth(oktaConfig.oidc);

const App = () => {
  const history = useNavigate();
  const restoreOriginalUri = async (oktaAuth, originalUri) => {
    history(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
            <Route path='/' element={<PageContainer landingPage content={<LandingPageContent />} />} />
            <Route path='/login/callback' element={<LoginCallback />}/>
            <Route path='/findamatch' element={<PageContainer content={<FindAMatchPageContent />} />} />
            <Route path='/pets' element={<PageContainer content={<SearchPetProfilesPageContent/>} />} />
            <Route path='/news' element={<PageContainer content={<NewsPageContent />} />} />
            <Route path='/profile' element={<PageContainer content={<UserProfilePage />} />} />
        </Routes>
    </Security>
  );
};

export default App;