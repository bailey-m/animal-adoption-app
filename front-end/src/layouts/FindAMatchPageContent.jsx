import * as React from 'react';
import PetCard from '../components/PetCard';
import axios from 'axios';
import { API_URL } from '../index';
import { CircularProgress, keyframes, Box, Typography, ThemeProvider } from '@mui/material';
import styled from '@mui/material/styles/styled';
import { headingTheme, textTheme } from '../theme';
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



export function FindAMatchPageContent(props) {
  const [data, setData] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [cardUp, setCardUp] = React.useState(true);
  const { authState, oktaAuth } = useOktaAuth();


  React.useEffect(() => {
    (async() => {
      if (!authState || !authState.isAuthenticated) {
        setUser(null);
      } else {
        let info = await oktaAuth.getUser();
        setUser(info);
        const userMatches = await getUserMatches(info);
        await getPets(userMatches);
      }
    })();
  }, [authState, oktaAuth]);

  const getUserMatches = async(user) => {

    try {
      const response = await axios.get(`${API_URL}/match/${user.sub}/pets`)
      console.log('user matches: ', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  
  const getPets = async(userMatches) => {
    console.log('userMatches in getPets: ', userMatches)
    try {
      const response = await axios.get(`${API_URL}/pets?name&species&breed&good_with_animals&good_with_children&safe_off_leash&date`);
      let result = response.data;
      console.log('all pets: ', result);
      for (let match of userMatches) {
        result = result.filter(pet => pet.id !== match.id);
      }
      setData(result);
    } catch (err) {
      console.log(err);
    }
  }

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

  // Box to apply animations to
const Holder = styled(Box)(({cardUp}) => ({
  animation: setAnimation(cardUp),
  alignItems: "center",
  justifyContent: "center",
  display: "flex"
}));


  return (
    <>
      <Box sx={{display: "flex", justifyContent:"center", flexWrap:"wrap"}}>
        <ThemeProvider theme={headingTheme}>
          <Typography variant='h2'>Find A Match</Typography>
        </ThemeProvider>
        <Box sx={{flexBasis:"100%", height:"0"}}></Box>
        {!data && 
          <Box sx={{display:"flex", justifyContent:"center"}}>
            <CircularProgress size="200px" />
          </Box>}
        {data && index < data.length && 
          <Holder cardUp={cardUp}>
            <PetCard petInfo={data[index]} handleClose={handleClose} handleLike={handleLike} />
          </Holder>}
        {data && index >= data.length && 
          <Box sx={{display:"flex", alignItems:"flex-end", height:"15rem"}}>
            <ThemeProvider theme={textTheme}>
              <Typography variant='h3'>Out of pets!</Typography>
            </ThemeProvider>
          </Box>}
      </Box>
      
    </>
  );  
}