import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

/* 
PASS IN DATABASE INFORMATION AS PROP JSON

ATTRIBUTES NEEDED IN PROP:
    name            STRING
    age             STRING????
    breed           STRING
    description     STRING
    availability    STRING
    disposition     JSON {goodWithAnimals(bool), goodWithChildren(bool), leashed(bool)}
    species         STRING
    image           STRING URL
*/


function PetCard(props) {

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

    const renderButtons = () => {
        if (authState && authState.isAuthenticated && userInfo && userInfo.userType == 'user' && !props.user) {
            return (
                <>
                <Button 
                    onClick={handleLike}
                    startIcon={<FavoriteIcon />}
                    color='success'
                    variant='contained'
                    sx={{gridRow:'9', gridColumn:'span 3'}}
                    >Like this {props.petInfo.species}
                </Button>
        
                <Button
                    onClick={handleDislike}
                    startIcon={<CloseIcon />}
                    color='error'
                    variant='contained'
                    sx={{gridRow:'9', gridColumn:'span 3'}}
                    >Not for me
                </Button>
                </>
            )
        }
    }

    const handleDislike = () => {
        props.handleClose()
    }

    const handleLike = () => {
        props.handleLike()
    }
    
    const availability = () => {
        const gridInfo = {gridRow:'5', gridColumnStart:'3', gridColumnEnd:'5'};

        switch (props.petInfo.availability) {
            case 'Available':
                return <Chip label='Available' color='success' sx={gridInfo}/>

            case 'Not Available':
                return <Chip label='Not Available' color='error' sx={gridInfo}/>

            case 'Pending':
                return <Chip label='Pending' color='warning' sx={gridInfo} />

            case 'Adopted':
                return <Chip label='Adopted' color='primary' sx={gridInfo} />
            
            default:
                return <Chip label='Status Unknown' color='secondary' sx={gridInfo} />
        }

    }

    return (
        <Card sx={{ maxWidth: 500 }} raised>
            <CardMedia
                component='img'
                height='auto'
                image={props.petInfo.image}
                alt={props.petInfo.name}
            />
            <CardContent >
                <Box sx={{
                    display: 'grid',
                    gap: .5,
                    gridTemplateRows: 'repeat(9, 1fr)',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    alignItems: 'center'
                }}>
                
                    <Typography align='center' variant='h5' sx={{gridRow:'1', gridColumnStart:'2', gridColumnEnd:'6' }} >{props.petInfo.name}</Typography>
                    
                    <Typography align='center' variant='subtitle1' sx={{gridRow:'2', gridColumnStart:'1', gridColumnEnd:'4' }} >{props.petInfo.age}</Typography>
                         
                    <Divider orientation='vertical' sx={{gridRow:'2', gridColumn:'3'}} />    
                        
                    <Typography align='center' variant='subtitle1' sx={{gridRow:'2', gridColumnStart:'4', gridColumn:'span 3'}} >{props.petInfo.breed}</Typography>                   
                    
                    <Typography 
                        variant='body2'
                        align='center'
                        color='text.secondary' 
                        sx={{gridRowStart:'3', gridRowEnd:'5', gridColumnStart:'2', gridColumnEnd:'6'}}
                    >
                        {props.petInfo.description}
                    </Typography>

                    {availability()}
                                        
                    <List
                        sx={{gridRowStart:'6', gridRowEnd:'9', gridColumnStart:'2', gridColumnEnd:'6', mx:'auto'}}
                    >
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {props.petInfo.disposition.goodWithAnimals && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Good with animals' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {props.petInfo.disposition.goodWithChildren && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Good with children' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {props.petInfo.disposition.leashed && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Must be leashed at all times' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                    </List>
                    
                    {renderButtons()}
                    
                </Box>
            </CardContent>
        </Card>
    );
}
 
export default PetCard;