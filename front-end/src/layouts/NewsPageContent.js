import * as React from 'react';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

export function NewsPageContent() {
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get('http://localhost:8080/news')
    .then((response) => {
      console.log(response);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // TODO insert query for list of data on page load
  // TODO pass in card to render (either pet or news card) as prop to item list, which will pass to Modal to open
  return (
    <ItemList sx={{margin: 'auto'}} data={data} card='NewsCard'/>
  );
}