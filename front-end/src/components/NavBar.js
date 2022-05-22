import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Link} from 'react-router-dom';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import { buttonTheme } from '../theme';


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
  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          PaperProps={{
              sx: {
                backgroundColor: '#2196f3'
              }
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <Link to='/' style={linkStyle}>
              <ListItem style={listItemStyle} button>
                  <PetsIcon sx={logoStyle}/>
                  <Typography variant='caption'>Animal House</Typography>
              </ListItem>
          </Link>
          <Toolbar/>
          <List>
              <Link to='/findamatch' style={linkStyle}>
                  <ListItem sx={listItemStyle} button>
                      <FavoriteBorderOutlinedIcon sx={iconStyle}/>
                      <Typography variant='subtitle2'>Find a Match</Typography>
                  </ListItem>
              </Link>
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
              <Link to='/profile' style={linkStyle}>
                  <ListItem sx={listItemStyle} button>
                      <PersonOutlineOutlinedIcon sx={iconStyle}/>
                      <Typography variant='subtitle2'>User Profile</Typography>
                  </ListItem>
              </Link>
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
