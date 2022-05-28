import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import { API_URL } from '../index';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { textTheme } from '../theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, Accordion, Typography, ListItemText, ListItemIcon, ListItem, List, 
    Divider, Chip, CardMedia, CardContent, Card, Button, Box, AccordionDetails, ThemeProvider } from '@mui/material';

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
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]);

  useEffect(() => {
    axios.get(`${API_URL}/match/${props.petInfo.id}/users`).then( (response) => {
        setMatches(response.data);
      });
  })

    const renderAccordion = () => {
        if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'admin') {
            return (
                <>
                    <Accordion sx={{width:'100%'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>Users Who Like This Pet: {matches.length}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {matches.map(user => 
                                <Typography>{user.name}: {user.email}</Typography>
                                )}
                        </AccordionDetails>
                    </Accordion>
                </>
            );
        }
    }

    const renderButtons = () => {
      
        if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'user' && !props.user) {
            return (
                <>
                <Button 
                    onClick={handleLike}
                    startIcon={<FavoriteIcon />}
                    color='success'
                    variant='contained'
                    sx={{}}
                    >Like this {props.petInfo.species}
                </Button>
        
                <Button
                    onClick={handleDislike}
                    startIcon={<CloseIcon />}
                    color='error'
                    variant='contained'
                    sx={{}}
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
        let chip;
        switch (props.petInfo.availability) {
            case 'Available':
                chip = <Chip label='Available' color='success'/>
                break;

            case 'Not Available':
                chip = <Chip label='Not Available' color='error'/>
                break;

            case 'Pending':
                chip = <Chip label='Pending' color='warning' />
                break;

            case 'Adopted':
                chip = <Chip label='Adopted' color='primary' />
                break;
                
            default:
                chip = <Chip label='Status Unknown' color='secondary' />
        }

        return (
            <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>{chip}</Box>
        )

    }

    return (
        <Card sx={{ height: 500, maxWidth: 500, overflowY: 'scroll' }} >
            <CardMedia
                component='img'
                height='auto'
                image={props.petInfo.image}
                alt={props.petInfo.name}
            />
            <CardContent >
            <ThemeProvider theme={textTheme}>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    rowGap:2
                }}>
                
                    <Typography align='center' variant='h5' sx={{width:'100%' }} >{props.petInfo.name}</Typography>
                    
                    <Typography align='center' variant='subtitle1' sx={{width:'49%'}} >{props.petInfo.age}</Typography>
                         
                    <Divider flexItem orientation='vertical' sx={{width:'1%'}} />
                        
                    <Typography align='center' variant='subtitle1' sx={{gridRow:'2', gridColumnStart:'4', gridColumn:'span 3'}} >{props.petInfo.breed || 'N/A'}</Typography>                   

                    
                    <Typography 
                        variant='body2'
                        align='center'
                        color='text.secondary' 
                        sx={{width:'100%'}}
                    >
                        {props.petInfo.description}
                    </Typography>

                    {availability()}
                                        
                    <List
                        sx={{width:'75%'}}
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
                    {renderAccordion()}

                </Box>
                </ThemeProvider>
            </CardContent>
        </Card>
    );
}
 
export default PetCard;