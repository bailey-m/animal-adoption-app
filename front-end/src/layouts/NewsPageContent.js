import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import {API_URL} from '../index';
import { NewNewsForm } from '../components/NewNewsForm';

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

  React.useEffect(() => {
    axios.get(`${API_URL}/news`)
    .then((response) => {
      console.log(response);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      <Button onClick={handleCardOpen} variant='contained'>+ Add News Post</Button>
      <NewNewsFormCard open={cardOpen} onClose={handleCardClose}/>
    </Box>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='NewsCard'/>
    </Box>
    </>
  );
}