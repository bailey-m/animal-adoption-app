import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import {API_URL} from '../index';
import { NewNewsForm } from '../components/NewNewsForm';
import { ThemeProvider, Typography, Box, Button, Modal } from '@mui/material';
import { headingTheme } from '../theme';

export function NewNewsFormCard(props) {  

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewNewsForm />
      </Modal>
    </div>
  );
}

export function NewsPageContent() {

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
    axios.get(`${API_URL}/news`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const renderAddNewsPostButton = () => {
    
    if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'admin') {
      return (
        <>
          <Button onClick={handleCardOpen} variant='contained'>+ Add News Post</Button>
          <NewNewsFormCard open={cardOpen} onClose={handleCardClose}/>  
        </>
      )
    }
  }

  return (
    <>
    <ThemeProvider theme={headingTheme}>
        <Typography variant='h2'>Recent News</Typography>
      </ThemeProvider>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      {renderAddNewsPostButton()}
    </Box>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='NewsCard'/>
    </Box>
    </>
  );
}