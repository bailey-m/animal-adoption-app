import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import {API_URL} from '../index';
import { NewPetForm } from '../components/NewPetForm';

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

export function NewPetFormCard(props) {  

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewPetForm />
      </Modal>
    </div>
  );
}


export function SearchPetProfilesPageContent() {
  const [data, setData] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [animal, setAnimal] = useState("");

  const handleCardOpen = () => setCardOpen(true);
  const handleCardClose = () => setCardOpen(false);

  React.useEffect(() => {
    axios.get(`${API_URL}/pets?` + 
    `name=${name}&` +
    `species=${animal}&` +
    `breed=${breed}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // TODO insert search/filters with Search button that queries based on filters
  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
      <Button onClick={handleCardOpen} variant='contained'>+ Add Pet</Button>
      <NewPetFormCard open={cardOpen} onClose={handleCardClose}/>
    </Box>
    <form>
    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} sx={{width: 200 }} 
                onChange={(e) => {setName(e.target.value);}}/>
    <FormControl sx={{width: 200}}>
        <InputLabel id="demo-simple-select-label">Species</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Species"
          value={animal} 
          onChange={(e) => {setAnimal(e.target.value);}}
          >
          <MenuItem value={''}>___</MenuItem>
          {species.map(animal =>
            <MenuItem value={animal}>{animal}</MenuItem>
            )}
        </Select>
    </FormControl>

    <FormControl sx={{width: 200 }}>
      <InputLabel htmlFor="grouped-select">Breed</InputLabel>
      <Select 
        defaultValue="" 
        id="grouped-select" 
        label="Grouping" value={breed} 
        onChange={(e) => {setBreed(e.target.value);}}>
          <MenuItem value={''}>___</MenuItem>
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

    <Button variant='contained' onClick={() => {
      axios.get(`${API_URL}/pets?` + 
        `name=${name}&` +
        `species=${animal}&` +
        `breed=${breed}`
        ).then((response) => {
        setData(response.data);
      })}}>Search</Button>
    </form>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='PetCard'/>
    </Box>
    </>
  );
}
