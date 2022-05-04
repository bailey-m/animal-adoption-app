import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {useState} from 'react';

const species = [
    'Dog',
    'Cat',
    'Reptile',
    'Rabbit',
    'Hamster',
    'Guinea Pig'
];

const dogBreeds = [
    'Australian Shepherd',
    'Beagle',
    'Border Collie',
    'Boxer',
    'Bulldog',
    'Cane Corso',
    'Chihuahua',
    'Corgi',
    'Dachshund',
    'Doberman',
    'French Bulldog',
    'German Shepherd',
    'Golden Retriever',
    'Husky',
    'Labrador Retriever',
    'Pitbull',
    'Pomeranian',
    'Poodle',
    'Pug',
    'Rottweiler',
    'Shih Tzu',  
    'Other'
];

const catBreeds = [
    'Abyssinian',
    'Domestic Longhair',
    'Domestic Shorthair',
    'Himalayan',
    'Maine Coon',
    'Persian',
    'Siamese',
    'Other'
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

export function NewPetForm(props) {

    return (
        <Box sx={style}>
            <Typography>Add New Pet</Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" sx={{width: 200 }}/>
            <FormControl sx={{width: 200}}>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Species"
                >
                {species.map(animal =>
                    <MenuItem value={animal}>{animal}</MenuItem>
                )}
                </Select>
            </FormControl>
            <FormControl sx={{width: 200 }}>
                <InputLabel htmlFor="grouped-select">Breed</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Grouping">
                <MenuItem value={null}>Not Applicable</MenuItem>
                <ListSubheader>Dogs</ListSubheader>
                {dogBreeds.map(breed => 
                    <MenuItem value={breed}>{breed}</MenuItem>
                )}
                <ListSubheader>Cats</ListSubheader>
                {catBreeds.map(breed => 
                    <MenuItem value={breed}>{breed}</MenuItem>
                )}
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={2}/>
            <Button variant='contained'>Add Pet</Button>
        </Box>
    )
}