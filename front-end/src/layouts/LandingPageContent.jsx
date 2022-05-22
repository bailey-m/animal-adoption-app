import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import {Link} from 'react-router-dom';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import * as React from 'react';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { headingTheme, buttonTheme } from '../theme';

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


export default function LandingPageContent(props) {

    return (
        <div>
            <ThemeProvider theme={headingTheme}>
                <Typography align='center' variant='h1'>Animal House</Typography>
                <Typography align='center' variant='h2'>Find Your Forever Companion</Typography>
            </ThemeProvider>
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
                <ThemeProvider theme={buttonTheme}>
                    <Link to='/findamatch' style={linkStyle} sx={{gridColumn:'1'}}>
                        <Button  variant='contained' startIcon={<FavoriteBorderOutlinedIcon sx={iconStyle} />} >
                            <Typography variant='h6'>
                                Find a Match
                            </Typography>
                            
                        </Button>
                    </Link>
                    <Link to='/pets' style={linkStyle} sx={{gridColumn:'2'}}>
                        <Button variant='contained' startIcon={<ListAltOutlined sx={iconStyle} />} >
                            <Typography variant='h6'>
                                Search Pets
                            </Typography>
                        </Button>
                    </Link>
                    <Link to='/news' style={linkStyle} sx={{gridColumn:'3'}}>
                        <Button variant='contained' startIcon={<NewspaperOutlinedIcon sx={iconStyle} />} >
                            <Typography variant='h6'>
                                Recent News
                            </Typography>
                        </Button>
                    </Link>
                    <Link to='/profile' style={linkStyle} sx={{gridColumn:'4'}}>
                        <Button variant='contained' startIcon={<PersonOutlineOutlinedIcon sx={iconStyle} />} >
                            <Typography variant='h6'>
                                User Profile
                            </Typography>
                        </Button>
                    </Link>
                </ThemeProvider>
            </Box>
        </div>
    );
}