import React, {useState, useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import {API_URL} from '../index';
import { NewPetForm } from '../components/NewPetForm';
import { ThemeProvider, Typography, Input, Modal, MenuItem, ListSubheader, FormControlLabel, FormGroup, 
  Checkbox, Select, InputLabel, FormControl, TextField, Button, Box } from '@mui/material';
import { headingTheme, textTheme } from '../theme';

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
  const [good_with_animals, setGoodWithAnimals] = useState('');
  const [good_with_children, setGoodWithChildren] = useState('');
  const [safe_off_leash, setSafeOffLeash] = useState('');
  const [date, setDate] = useState('');

  const handleCardOpen = () => setCardOpen(true);
  const handleCardClose = () => setCardOpen(false);

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

  useEffect(() => {
    axios.get(`${API_URL}/pets?` + 
    `name=${name}&` +
    `species=${animal}&` +
    `breed=${breed}&` +
    `good_with_animals=${good_with_animals}&` +
    `good_with_children=${good_with_children}&` +
    `safe_off_leash=${safe_off_leash}&` +
    `date=${date}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  });

  
  const renderAddNewPetButton = () => {
    if (authState && authState.isAuthenticated && userInfo && userInfo.userType === 'admin') {
      return (
        <>
          <Button onClick={handleCardOpen} variant='contained'>+ Add Pet</Button>
          <NewPetFormCard open={cardOpen} onClose={handleCardClose}/>
        </>
      )
    }
  }

  return (
    <>
      <ThemeProvider theme={headingTheme}>
        <Typography variant='h2'>Search Pets</Typography>
      </ThemeProvider>
      <ThemeProvider theme={textTheme}>
    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>

      {renderAddNewPetButton()}

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
    <br/><br/>
    <FormGroup>
    <FormControl sx={{width: 200 }}>
    <Typography>Pet Added After</Typography>          
      <Input type="date" id="date" value={date} onChange={(e) => {setDate(e.target.value);}}/>
    </FormControl>
    </FormGroup>
    <br/>
      <FormControlLabel control={<Checkbox checked={good_with_animals} onChange={(e) => {setGoodWithAnimals(e.target.checked);}}/>} label="Good With Animals"/>
      <FormControlLabel control={<Checkbox checked={good_with_children} onChange={(e) => {setGoodWithChildren(e.target.checked);}}/>} label="Good With Children" />
      <FormControlLabel control={<Checkbox checked={safe_off_leash} onChange={(e) => {setSafeOffLeash(e.target.checked);}}/>} label="Safe Off Leash" />
    <br/><br/>
    <FormGroup>
    <FormControl sx={{width: 200 }}>
    <Button variant='contained' onClick={() => {
      axios.get(`${API_URL}/pets?` + 
      `name=${name}&` +
      `species=${animal}&` +
      `breed=${breed}&` +
      `good_with_animals=${good_with_animals}&` +
      `good_with_children=${good_with_children}&` +
      `safe_off_leash=${safe_off_leash}&` +
      `date=${date}`
        ).then((response) => {
        setData(response.data);
      })}}>Search</Button>
    </FormControl>
    </FormGroup>
    <Typography>______________________</Typography>
    </form>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='PetCard' userInfo={userInfo}/>
    </Box>
    </ThemeProvider>
    </>
  );
}
