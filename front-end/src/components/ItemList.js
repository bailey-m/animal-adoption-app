import React, {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewsCard from './NewsCard';
import PetCard from './PetCard';
import { API_URL } from '../index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ItemCard(props) { 

  let info;
  for (var item of props.data) {
    if (item.id == props.itemId) {
      info = item;
      console.log(info);
      break;
    }
  }

  const handleLike = async() => {
    const match = {
      userID: props.userInfo ? props.userInfo.sub : '',
      petID: info ? info.id : ''
    }

    const response = await axios.post(`${API_URL}/match`, match)
    if (response.status === 200) {
      props.onClose();
    } else {
      alert('Something went wrong!');
    }
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { props.card === 'NewsCard' && <NewsCard news={info}/> }
            { props.card === 'PetCard' && <PetCard petInfo={info} handleClose={props.onClose} handleLike={handleLike}/> }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export function ItemList(props) {
  const [cardOpen, setCardOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleCardOpen = (event) => {
    setCardOpen(true);
    setSelectedItemId(event.currentTarget.getAttribute('data-index'));
  }

  const handleCardClose = () => setCardOpen(false);

  return (
    <>
    {!props.data && <CircularProgress /> }
    {props.data && (
      <>
      <List sx={{ width: 'fit-content', bgcolor: 'background.paper'}}>
        {props.data.map(item =>
          <div key={item.id}>
            <ListItem alignItems="flex-start" button data-index={item.id} onClick={handleCardOpen}>
              <ListItemAvatar>
                <Avatar src={item.photoUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title || item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                    >
                      {item.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider/>
          </div>
        )}
      </List>
      <ItemCard open={cardOpen} onClose={handleCardClose} itemId={selectedItemId} data={props.data} card={props.card} userInfo={props.userInfo}/>
      </>
    )}
    </>
  );
}
