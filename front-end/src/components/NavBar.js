import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {Link} from 'react-router-dom';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import { ThemeProvider, Box, Drawer, Toolbar, List, ListItem, Typography } from '@mui/material';
import { textTheme } from '../theme';


const drawerWidth = 125;

const linkStyle = {
    textDecoration: "none",
    color: "white",
};

const listItemStyle = {
    display: 'flex', 
    flexDirection: 'column'
};

const iconStyle = {
    color: 'white'
};

const logoStyle = {
    ...iconStyle,
    marginTop: '20px',
    fontSize: '48px'
}

export function NavBar() {
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

  const renderFindAMatchButton = () => {
    
    if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'user') {
      return (
          <Link to='/findamatch' style={linkStyle}>
                <ListItem sx={listItemStyle} button>
                    <FavoriteBorderOutlinedIcon sx={iconStyle}/>
                    <Typography variant='subtitle2'>Find a Match</Typography>
                </ListItem>
            </Link>
      )
    }
  }

  const renderUserProfileButton = () => {
    if (authState && authState.isAuthenticated && userInfo ) {
      return (
        <Link to='/profile' style={linkStyle}>
        <ListItem sx={listItemStyle} button>
            <PersonOutlineOutlinedIcon sx={iconStyle}/>
            <Typography variant='subtitle2'>User Profile</Typography>
        </ListItem>
    </Link>
      )
    }
  }

  return (
    <ThemeProvider theme={textTheme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          PaperProps={{
              sx: {
                backgroundColor: '#2196f3'
              }
          }}
          sx={{
            width: drawerWidth,
            boxSizing: 'border-box',
          }}
        variant="permanent"
        anchor="left"
      >
        <Link to='/'>
            <ListItem style={listItemStyle} button>
                <PetsIcon sx={logoStyle}/>
            </ListItem>
        </Link>
        <Toolbar/>
        <List>
          {renderFindAMatchButton()}
            <Link to='/pets' style={linkStyle}>
                <ListItem sx={listItemStyle} button>
                    <ListAltOutlinedIcon sx={iconStyle}/>
                    <Typography variant='subtitle2'>Search Pets</Typography>
                </ListItem>
            </Link>
            <Link to='/news' style={linkStyle}>
                <ListItem sx={listItemStyle} button>
                    <NewspaperOutlinedIcon sx={iconStyle}/>
                    <Typography variant='subtitle2'>Recent News</Typography>
                </ListItem>
            </Link>
            {renderUserProfileButton()}
        </List>
      </Drawer>
    </Box>
</ThemeProvider>
  );
}
