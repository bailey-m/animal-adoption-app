import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import {API_URL} from '../index';
import { NewPetForm } from '../components/NewPetForm';


export function NewPetFormCard(props) {  

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewPetForm />
      </Modal>
    </div>
  );
}

export function SearchPetProfilesPageContent() {
  const [data, setData] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);

  const handleCardOpen = () => setCardOpen(true);
  const handleCardClose = () => setCardOpen(false);

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); 

  useEffect(() => {
    axios.get(`${API_URL}/pets`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  
  const renderAddNewPetButton = () => {
    if (authState && authState.isAuthenticated && userInfo && userInfo.userType == 'admin') {
      return (
        <>
          <Button onClick={handleCardOpen} variant='contained'>+ Add Pet</Button>
          <NewPetFormCard open={cardOpen} onClose={handleCardClose}/>
        </>
      )
    }
  }

  // TODO insert search/filters with Search button that queries based on filters
  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      {renderAddNewPetButton()}
    </Box>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='PetCard'/>
    </Box>
    </>
  );
}
