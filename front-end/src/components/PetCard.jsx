import React, {Component} from 'react';
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
PASS IN DATABASE INFORMATION AS PROPS

PROPS NEEDED:
    name            STRING
    age             STRING????
    breed           STRING
    description     STRING
    availability    STRING
    disposition     JSON {goodWithAnimals(bool), goodWithChildren(bool), leashed(bool)}
    species         STRING
    image           STRING URL
*/


class PetCard extends Component {
    state = {  } 

    availability() {
        const gridInfo = {gridRow:'5', gridColumnStart:'3', gridColumnEnd:'5'};

        switch (this.props.petInfo.availability) {
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

    render() { 
        return (
        <Card sx={{ maxWidth: 500 }} raised>
            <CardMedia
                component='img'
                height='auto'
                image={this.props.petInfo.image}
                alt={this.props.petInfo.name}
            />
            <CardContent >
                <Box sx={{
                    display: 'grid',
                    gap: .5,
                    gridTemplateRows: 'repeat(9, 1fr)',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    alignItems: 'center'
                }}>
                
                    <Typography align='center' variant='h5' sx={{gridRow:'1', gridColumnStart:'2', gridColumnEnd:'6' }} >{this.props.petInfo.name}</Typography>
                    
                    <Typography align='center' variant='subtitle1' sx={{gridRow:'2', gridColumnStart:'2', gridColumnEnd:'4' }} >{this.props.petInfo.age}</Typography>
                         
                    {/* CHANGE COLOR??????????????????*/ }
                    <Divider orientation='vertical' sx={{gridRow:'2', gridColumn:'3'}} />    
                        
                    <Typography align='center' variant='subtitle1' sx={{gridRow:'2', gridColumnStart:'4', gridColumnEnd:'6'}} >{this.props.petInfo.breed}</Typography>                   
                    
                    <Typography 
                        variant='body2'
                        align='center'
                        color='text.secondary' 
                        sx={{gridRowStart:'3', gridRowEnd:'5', gridColumnStart:'2', gridColumnEnd:'6'}}
                    >
                        {this.props.petInfo.description}
                    </Typography>

                    {this.availability()}
                                        
                    <List
                        sx={{gridRowStart:'6', gridRowEnd:'9', gridColumnStart:'2', gridColumnEnd:'6', mx:'auto'}}
                    >
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {this.props.petInfo.disposition.goodWithAnimals && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Good with animals' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {this.props.petInfo.disposition.goodWithChildren && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Good with children' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                {this.props.petInfo.disposition.leashed && <CheckBoxIcon/>}
                            </ListItemIcon>
                            <ListItemText primary='Must be leashed at all times' primaryTypographyProps={{variant:'subtitle2'}}/>
                        </ListItem>
                    </List>
                    
                    <Button startIcon={<FavoriteIcon />} color='success' variant='contained' sx={{gridRow:'9', gridColumn:'span 3'}}>
                        Like this {this.props.petInfo.species}
                    </Button>
            
                    <Button startIcon={<CloseIcon />} color='error' variant='contained' sx={{gridRow:'9', gridColumn:'span 3'}}>
                        Not for me
                    </Button>
                </Box>
            </CardContent>
        </Card>);
    }
}
 
export default PetCard;