import * as React from 'react';
import axios from 'axios';
import {API_URL} from '../index';
import {useState} from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, ListSubheader, 
    MenuItem, Typography, Checkbox, FormGroup, FormControlLabel, Input} from '@mui/material';


const species = [
    'Dog',
    'Cat',
    'Bird',
    'Reptile',
    'Rabbit',
    'Rodent'
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

const birdBreeds = [
    'Cockatiel',
    'Parrot',
    'Macaw',
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
  // Image upload adapted from https://medium.com/@ibamibrhm/custom-upload-button-image-preview-and-image-upload-with-react-hooks-a7977618ee8c
export function NewPetForm(props) {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [animal, setAnimal] = useState("");
    const [good_with_animals, setGoodWithAnimals] = useState("");
    const [good_with_children, setGoodWithChildren] = useState("");
    const [must_be_leashed, setMustBeLeashed] = useState("");
    const [picture, setPicture] = useState({preview: "", raw: ""});

    const handleSubmit = (e) => {
        
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dic71ppnq/upload'
        const file = picture.raw;
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "tyogpv4o");

        (async() => { 
            fetch(cloudinaryUrl, {
                method: "POST",
                body: formData
            })
            .then((response) => {
                return response.json();
            })
            .then((imageData) => {
                axios.post(`${API_URL}/pets`, null, {params: {
                    Name: name,
                    Age: age, 
                    Breed: breed, 
                    Species: animal, 
                    Description: description,
                    Good_With_Animals: good_with_animals,
                    Good_With_Children: good_with_children,
                    Must_Be_Leashed: must_be_leashed,
                    imageURL: imageData.url
                }}); 
                axios.post(`${API_URL}/news`, null, {params: {
                    Title: `New Arrival! ${name} is now available!`,
                    Description: description,
                    imageURL: imageData.url
                }});
                window.location.reload(false)
            });
        })();
    };

    return (
        <Box sx={style}>
            <FormControl sx={{width: 400}}>
            <Typography>Add New Pet</Typography>
            <TextField required id="outlined-basic" label="Name" variant="outlined" value={name} sx={{width: 200 }} 
                onChange={(e) => {setName(e.target.value);}}/>
            <TextField required id="outlined-basic" label="Age" variant="outlined" type='number' value={age} sx={{width: 200 }} 
                onChange={(e) => {setAge(e.target.value);}}/>

            <FormControl sx={{width: 200}}>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                required
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
                <MenuItem value="">Not Applicable</MenuItem>
                <ListSubheader>Dogs</ListSubheader>
                {dogBreeds.map(breed => 
                    <MenuItem value={breed}>{breed}</MenuItem>
                )}
                <ListSubheader>Cats</ListSubheader>
                {catBreeds.map(breed => 
                    <MenuItem value={breed}>{breed}</MenuItem>
                )}
                <ListSubheader>Birds</ListSubheader>
                {birdBreeds.map(breed => 
                    <MenuItem value={breed}>{breed}</MenuItem>
                )}
                </Select>
            </FormControl>
            <FormGroup>
            <FormControlLabel control={<Checkbox checked={good_with_animals} onChange={(e) => {setGoodWithAnimals(e.target.checked);}}/>} label="Good With Animals"/>
            <FormControlLabel control={<Checkbox checked={good_with_children} onChange={(e) => {setGoodWithChildren(e.target.checked);}}/>} label="Good With Children" />
            <FormControlLabel control={<Checkbox checked={must_be_leashed} onChange={(e) => {setMustBeLeashed(e.target.checked);}}/>} label="Must Be Leashed At All Times" />
            </FormGroup>
            <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={2} value={description} sx={{width: 400 }}
                onChange={(e) => {setDescription(e.target.value);}}/>
            <Typography></Typography>
            <Typography></Typography>
            <Typography>Upload Photo</Typography>
            <Input type="file" id="upload_button" onChange={(e) => {setPicture({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]});}}/>
            <Button variant='contained' onClick={handleSubmit}>Add Pet</Button>
            
            </FormControl>
            <InputLabel htmlFor="upload_button">{picture.preview ? (<img src={picture.preview} alt="dummy" width="100" height="100" />) : ''}</InputLabel>
        </Box>
    )
}