import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import NewsCard from './NewsCard';
import PetCard from './PetCard';
import { textTheme } from '../theme';
import { API_URL } from '../index';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, List, ListItem, Divider, ListItemText, ListItemAvatar, 
  Avatar, Typography, Box, Modal, ThemeProvider } from "@mui/material";

const logoStyle = {
  color: 'gray',
  marginTop: '10px',
  fontSize: '30px'
}

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
    if (item.id === props.itemId) {
      info = item;
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

  const handleCardOpen = (event) => {
    setCardOpen(true);
    setSelectedItemId(event.currentTarget.getAttribute('data-index'));
  }

  const handleCardClose = () => setCardOpen(false);


  const renderItemTitle = (item) => {
    if (item.title) {
      return <Typography variant='body1'>{item.title}</Typography>
    } else if (item.breed) {
      return <Typography variant='body1'>{`${item.name} | ${item.species} | ${item.breed}`}</Typography>
    } else {
      return <Typography variant='body1'> {`${item.name} | ${item.species}`}</Typography>
    }
  }



const renderDeleteIcon = (item) => {
  if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'admin') {
    return (
      <>
        <DeleteIcon sx={logoStyle} onClick={ async (e) => {
          e.stopPropagation();
          if (props.card === 'PetCard'){
            const response = await axios.delete(`${API_URL}/pets?id=${item.id}`);
            if (response.status === 204) {
              window.location.reload(false);
            } else {
              alert('Something went wrong. Please try again.');
            }
          }

          if (props.card === 'NewsCard'){
            const response = await axios.delete(`${API_URL}/news?id=${item.id}`);
            if (response.status === 204) {
              window.location.reload(false);
            } else {
              alert('Something went wrong. Please try again.');
            }
          }
        }}/>
      </>
      )
    }
  };

  return (
    <>
    {!props.data && <CircularProgress /> }
    {props.data && (
      <>
      <ThemeProvider theme={textTheme}>
      <List sx={{ width: 'fit-content', bgcolor: 'background.paper'}}>
        {props.data.map(item =>
          <div key={item.id}>
            <ListItem alignItems="flex-start" button data-index={item.id} onClick={handleCardOpen}>
              <ListItemAvatar>
                <Avatar src={item.image || item.imageURL} />
              </ListItemAvatar>
              <ListItemText
                primary={renderItemTitle(item)}
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
              {renderDeleteIcon(item)}
          </ListItem>
          <Divider/>
          </div>
        )}
      </List>

      </ThemeProvider>
      <ItemCard open={cardOpen} onClose={handleCardClose} itemId={selectedItemId} data={props.data} card={props.card} userInfo={props.userInfo}/>
      </>
    )}
    </>
  );
}
