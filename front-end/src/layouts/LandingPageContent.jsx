import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Typography, ThemeProvider, Button, Box } from '@mui/material';
import { headingTheme, textTheme } from '../theme';
import CssBaseline from '@mui/material/CssBaseline';

export default function LandingPageContent(props) {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      if (!authState || !authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        setUserInfo(null);
      } else {
        oktaAuth.getUser().then((info) => {
          setUserInfo(info);
        });
      }
    }, [authState, oktaAuth]); // Update if authState changes
  
    const login = async () => {
      await oktaAuth.signInWithRedirect();
    };

    const logout = async () => {
        await oktaAuth.signOut();
    }

    if (!authState) {
        return (
          <div>Loading...</div>
        );
    }
    
    const backgroundImageUrl = 'https://res.cloudinary.com/dic71ppnq/image/upload/v1653854549/c320862aa739ece6589435eafc0af1cdb8e124b299d8fd9d3f5cdf20ded22797_xw31fc.jpg';
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        backdropFilter: 'contrast(0.4)'
    };

    return (
        <>
        <CssBaseline/>
        <div style={backgroundStyle}>
        <Box sx={{marginRight: '20px'}}>
            <ThemeProvider theme={headingTheme}>
                <Typography align='right' variant='h1' color='white'>Animal House</Typography>
                <Typography align='right' variant='h2' color='white'>Find Your Forever Companion</Typography>
            </ThemeProvider>
            <ThemeProvider theme={textTheme}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '10px', marginTop: '20px'}}>
                    { authState.isAuthenticated && !userInfo && 
                        <Typography variant='body1' color='white'>Loading user information...</Typography>
                    }

                    {authState.isAuthenticated && userInfo && 
                        <Typography variant='body1' color='white'>Welcome back, {userInfo.name}! </Typography>
                    }
                    { !authState.isAuthenticated 
                        ? (<Button id="login-button" variant={'contained'} onClick={login}>Login</Button>) 
                        : (<Button variant={'contained'} onClick={logout}>Logout</Button>) 
                    }
                </Box>
            </ThemeProvider>
        </Box>
        </div>
        </>
    );
}