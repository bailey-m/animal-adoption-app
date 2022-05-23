import * as React from 'react';
import PetCard from '../components/PetCard';
import axios from 'axios';
import { API_URL } from '../index';
import { CircularProgress, keyframes, Box, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';
import { useOktaAuth } from '@okta/okta-react';

// Exit animation
const slideOutBottom = keyframes`
0% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  opacity: 1;
}
100% {
  -webkit-transform: translateY(1000px);
          transform: translateY(1000px);
  opacity: 0;
}`;

// Entrance animation
const slideInTop = keyframes`
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }`;



function setAnimation(cardUp) {
  if (cardUp) {
    return `${slideInTop} 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
  } else {
    return `${slideOutBottom} 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`
  }
}

// Box to apply animations to
const Holder = styled(Box)(({cardUp}) => ({
  animation: setAnimation(cardUp),
  alignItems: "center",
  justifyContent: "center",
  display: "flex"
}));


export function FindAMatchPageContent(props) {
  const [data, setData] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [cardUp, setCardUp] = React.useState(true);
  const [matches, setMatches] = React.useState(null);
  const { authState, oktaAuth } = useOktaAuth();


  React.useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUser(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUser(info);
      });
    }
  }, [authState, oktaAuth]);

    React.useEffect(() => {
      if (user) {
        axios
        .get(
          `${API_URL}/match/${user.sub}`
        )
        .then((response) => {
          setMatches(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },[user]);

    React.useEffect(() => {
      axios.get(`${API_URL}/pets`)
      .then((response) => {
        let result = response.data;
        for (let match of matches) {
          result = result.filter(pet => pet.id != match.id);
        }
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [matches]);

  const handleLike = async () => {
    const match = {
      userID: user.sub,
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
    setCardUp(false);
    setTimeout(() => {
      setIndex( prev => prev + 1);
      setCardUp(true);
    }, 600)
  }

  

  return (
    <>
      {!data && <Box sx={{display: "flex", justifyContent:"center"}}><CircularProgress size="200px" /></Box>}
      {data && index < data.length && <Holder cardUp={cardUp}><PetCard petInfo={data[index]} handleClose={handleClose} handleLike={handleLike} /></Holder>}
      {data && index >= data.length && <Box sx={{display: "flex", alignItems:'center', justifyContent:'center'}}><Typography variant='h3'>Out of pets!</Typography></Box>}
    </>
  );  
}