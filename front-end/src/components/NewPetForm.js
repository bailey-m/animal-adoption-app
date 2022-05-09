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
import axios from 'axios';
import {API_URL} from '../index';
import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Input } from '@mui/material';


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


  // Sending info from textfield adapted from https://www.geeksforgeeks.org/how-to-use-textfield-component-in-reactjs/
export function NewPetForm(props) {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [animal, setAnimal] = useState("");
    const [good_with_animals, setGoodWithAnimals] = useState("");
    const [good_with_children, setGoodWithChildren] = useState("");
    const [must_be_leashed, setMustBeLeashed] = useState("");

    return (
        <Box sx={style}>
            <Typography>Add New Pet</Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} sx={{width: 200 }} 
                onChange={(e) => {setName(e.target.value);}}/>
            <TextField id="outlined-basic" label="Age" variant="outlined" value={age} sx={{width: 200 }} 
                onChange={(e) => {setAge(e.target.value);}}/>

            <FormControl sx={{width: 200}}>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Species"
                value={animal} 
                onChange={(e) => {setAnimal(e.target.value);}}
                >
                {species.map(animal =>
                    <MenuItem value={animal}>{animal}</MenuItem>
                )}
                </Select>
            </FormControl>
            <FormControl sx={{width: 200 }}>
                <InputLabel htmlFor="grouped-select">Breed</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Grouping" value={breed} 
                    onChange={(e) => {setBreed(e.target.value);}}>
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
            <FormGroup>
            <FormControlLabel control={<Checkbox checked={good_with_animals} onChange={(e) => {setGoodWithAnimals(e.target.checked);}}/>} label="Good With Animals"/>
            <FormControlLabel control={<Checkbox checked={good_with_children} onChange={(e) => {setGoodWithChildren(e.target.checked);}}/>} label="Good With Children" />
            <FormControlLabel control={<Checkbox checked={must_be_leashed} onChange={(e) => {setMustBeLeashed(e.target.checked);}}/>} label="Must Be Leashed At All Times" />
            </FormGroup>
            <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={2} value={description} 
                onChange={(e) => {setDescription(e.target.value);}}/>
            <Typography></Typography>
            <Typography></Typography>
            <Typography>Upload Photo</Typography>
            <Input type="file"/>
            <Button variant='contained' onClick = {() => {axios.post(`${API_URL}/pets`, null, {params: {
                Name: name,
                Age: age, 
                Breed: breed, 
                Species: animal, 
                Description: description,
                Good_With_Animals: good_with_animals,
                Good_With_Children: good_with_children,
                Must_Be_Leashed: must_be_leashed,
                }}); window.location.reload(false)}}>Add Pet</Button>
        </Box>
    )
}