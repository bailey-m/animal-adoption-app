import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import {Link} from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import React, { useState, useEffect } from 'react';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';

const linkStyle = {
    textDecoration: "none",
    color: "white",
};

const iconStyle = {
    color: 'white'
};

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
  
    return (
        <div>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '10px'}}>
                { authState.isAuthenticated && !userInfo && 
                    <p>Loading user information...</p>
                }

                {authState.isAuthenticated && userInfo && 
                    <p> Welcome back, {userInfo.name} </p>
                }
                { !authState.isAuthenticated 
                    ? (<Button id="login-button" variant={'contained'} onClick={login}>Login</Button>) 
                    : (<Button variant={'contained'} onClick={logout}>Logout</Button>) 
                }
            </Box>
            <Typography align='center' variant='h1'>Animal House</Typography>
            <Typography align='center' variant='h2'>Find Your Forever Companion</Typography>
        
        <Box
            sx={{
                display:'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 15,
                width: .75,
                margin: 'auto',
                mt: 10
            }}
            >
                <Link to='/findamatch' style={linkStyle} sx={{gridColumn:'1'}}>
                    <Button  variant='contained' startIcon={<FavoriteBorderOutlinedIcon sx={iconStyle} />} >
                        Find a Match
                    </Button>
                </Link>
                <Link to='/pets' style={linkStyle} sx={{gridColumn:'2'}}>
                    <Button variant='contained' startIcon={<ListAltOutlined sx={iconStyle} />} >
                        Search Pets
                    </Button>
                </Link>
                <Link to='/news' style={linkStyle} sx={{gridColumn:'3'}}>
                    <Button variant='contained' startIcon={<NewspaperOutlinedIcon sx={iconStyle} />} >
                        Recent News
                    </Button>
                </Link>
                <Link to='/profile' style={linkStyle} sx={{gridColumn:'4'}}>
                    <Button variant='contained' startIcon={<PersonOutlineOutlinedIcon sx={iconStyle} />} >
                        User Profile
                    </Button>
                </Link>

                
            
            </Box>
        </div>
    );
}