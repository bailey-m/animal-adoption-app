import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';

export function SearchPetProfilesPageContent() {
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get('http://localhost:8080/pets')
    .then((response) => {
      console.log(response);
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
      <Button variant='contained'>+ Add Pet</Button>
    </Box>
    <Box>
      <ItemList sx={{margin: 'auto'}} data={data} card='PetCard'/>
    </Box>
    </>
  );
}
