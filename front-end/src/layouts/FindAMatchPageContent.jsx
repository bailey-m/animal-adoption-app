import * as React from 'react';
import PetCard from '../components/PetCard';
import axios from 'axios';
import { API_URL } from '../index';
import { CircularProgress } from '@mui/material';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';


export default function FindAMatchPageContent(props) {
  const [data, setData] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [cardUp, setCardUp] = React.useState(true);

  let componentToShow;

  // FOR TESTING ------------- CHANGE LATER
  React.useEffect(() => {
    axios.get(`${API_URL}/users`)
    .then((response) => {
      setUser(response.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
      axios.get(`${API_URL}/pets`)
      .then((response) => {
        setData(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


  const handleLike = async () => {
    const match = {
      userID: user.id,
      petID: data[index].id
    }
    
    const response = await axios.post(`${API_URL}/match`, match)
    
    if (response.status === 200) {
      handleClose();
    } else {
      alert('Something went wrong!');
    }
  }

  const handleClose = () => {
    setIndex( prev => prev + 1);
    if (index >= data.length) {
      componentToShow = <h1>No more pets to show</h1>;
    }
  }

   


  
  return (
    <>
    {!data && <CircularProgress />}
    {data && <PetCard petInfo={data[index]} handleClose={handleClose} handleLike={handleLike} />}
  </>
  );  
}