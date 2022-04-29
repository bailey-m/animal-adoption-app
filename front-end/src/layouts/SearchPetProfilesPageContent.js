import { TrapFocus } from '@mui/base';
import * as React from 'react';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';

const mockPetData = [
  {
    id: 1,
    image: 'https://www.rover.com/blog/wp-content/uploads/2020/06/German-Shepherd-1-1024x683.jpg',
    name: 'Oscar',
    description: 'A sleepy German Sheperd',
    age: '1 year old',
    breed: 'German Shepherd',
    availability: 'Available',
    disposition: {
      goodWithAnimals: true,
      goodWithChildren: true,
      leashed: false},
    species: 'dog',
    },
  {
    id: 2,
    image: 'https://nationaltoday.com/wp-content/uploads/2020/02/national-golden-retriever-day-640x514.jpg',
    name: 'Lucy',
    description: 'Peppy and fun-loving',
    age: '3 years old',
    breed: 'Golden Retriever',
    availability: 'Pending',
    disposition: {
      goodWithAnimals: false,
      goodWithChildren: true,
      leashed: true},
    species: 'dog'
  },
]

// TODO add loading wheel instead of mock data when pulling from Firestore
export function SearchPetProfilesPageContent() {
  const [data, setData] = useState(mockPetData);
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
  // TODO insert query for list of data on page load
  // TODO insert search/filters with Search button that queries based on filters
  // TODO pass in card to render (either pet or news card) as prop to item list, which will pass to Modal to open
  return (
    <ItemList sx={{margin: 'auto'}} data={data} card='PetCard'/>
  );
}
