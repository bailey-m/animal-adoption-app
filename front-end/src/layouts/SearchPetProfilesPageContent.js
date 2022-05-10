import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
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

  React.useEffect(() => {
    axios.get(`${API_URL}/pets`)
    .then((response) => {
      console.log(response);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // TODO insert search/filters with Search button that queries based on filters
  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      <Button onClick={handleCardOpen} variant='contained'>+ Add Pet</Button>
      <NewPetFormCard open={cardOpen} onClose={handleCardClose}/>
    </Box>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='PetCard'/>
    </Box>
    </>
  );
}
