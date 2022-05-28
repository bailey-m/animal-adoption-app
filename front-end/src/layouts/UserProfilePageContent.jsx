import * as React from "react";
import axios from "axios";
import { useOktaAuth } from '@okta/okta-react';
import { API_URL } from "../index";
import { useState } from "react";
import { UserLikedList } from "../components/UserLikedList";
import { Typography, ThemeProvider, Box } from "@mui/material";
import { headingTheme, textTheme } from '../theme';


export default function UserProfilePage() {
  const [data, setData] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  React.useEffect(() => {
    (async() => {
      if (!authState || !authState.isAuthenticated) {
        console.log('not authenticated');
      } else {
        await oktaAuth.getUser().then(async(info) => {
          setUserInfo(info);
          await getUserMatches(info);
        });
      }
    })();
  }, [authState, oktaAuth]);

  const getUserMatches = async(info) => {
    await axios
      .get(
        `${API_URL}/match/${info.sub}/pets`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const renderLikedPets = () => {
    if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'user') {
      return (
        <>
          <Typography sx={{gridRowStart: '2', gridColumn:'3/5' }} align="center" variant="h3">Liked Pets</Typography>
          <UserLikedList sx={{gridRowStart: '3', gridColumn:'3/5', margin: "auto" }} data={data} card="PetCard" />
        </>
      )
    }
  }

  return (
    <div className="UserProfilePage">
      <Box 
        sx={{
          display: "grid",
          gap: 0.5,
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto',
        }}
      >

        <ThemeProvider theme={headingTheme}>
          <Typography sx={{gridRow: '1', gridColumn:'span 4'}} align="center" variant='h2'>User Name</Typography>
          <Typography sx={{gridRowStart: '2', gridColumn:'3/5' }} align="center" variant="h3">Liked Pets</Typography>
        </ThemeProvider>
        <ThemeProvider theme={textTheme}>
          <Typography sx={{gridRowStart: '3', gridColumn:'span 2'}} variant='body1'>User info goes here</Typography>
        </ThemeProvider>
        {renderLikedPets()}

      </Box>
    </div>
  );
}
