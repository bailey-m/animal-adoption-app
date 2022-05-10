import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import {Link} from 'react-router-dom';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import * as React from 'react';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';

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
                        User Profile / Login
                    </Button>
                </Link>

            </Box>
        </div>
    );
}