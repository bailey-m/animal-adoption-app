import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
import { spacing } from '@mui/system';

/* 
PASS IN DATABASE INFORMATION AS PROPS
*/


class PetCard extends Component {
    state = {  } 

    availability() {
        if (this.props.availability) {
            return <Chip label='Available' color='success'/>
        } else {
            return <Chip label='Unavailable' color='error'/>
        }
    }

    render() { 
        return (
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
                component='img'
                height='auto'
                image='https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg'
                alt={this.props.name}
            />
            <CardContent sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: 400}}>
                <Typography gutterBottom variant='h5' component='div' >
                    {this.props.name}
                </Typography>

                {/* TODO make this not suck */}
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                >
                    <Typography gutterBottom variant='h5' component='div' sx={{m:1}}>
                        {this.props.age}
                    </Typography>
                    <Divider orientation='vertical' flexItem sx={{m:1}}/>
                    <Typography gutterBottom variant='h5' component='div' sx={{m:1}}>
                        {this.props.breed}
                    </Typography>
                </Grid>
                
                <Typography variant='body2' color='text.secondary'>
                    {this.props.description}
                </Typography>

                {this.availability()}

                <List
                    sx={{width: '100%', maxWidth:200}}
                >
                    <ListItem disablePadding>
                        <ListItemIcon>
                            {this.props.disposition.goodWithAnimals && <CheckBoxIcon/>}
                        </ListItemIcon>
                        <ListItemText primary='Good with animals'/>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            {this.props.disposition.goodWithChildren && <CheckBoxIcon/>}
                        </ListItemIcon>
                        <ListItemText primary='Good with children'/>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            {this.props.disposition.leashed && <CheckBoxIcon/>}
                        </ListItemIcon>
                        <ListItemText primary='Must be leashed at all times'/>
                    </ListItem>
                </List>
                
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                >
                    <Button color='success' variant='contained'>
                        <FavoriteIcon sx={{mr:1}}/>
                        Like this {this.props.species}
                    </Button>
                    <Button color='error' variant='contained'>
                        <CloseIcon sx={{mr:1}} />
                        Not for me
                    </Button>
                </Grid>

            </CardContent>
        </Card>);
    }
}
 
export default PetCard;