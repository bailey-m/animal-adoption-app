import * as React from 'react';
import {useState} from 'react';
import { ItemList } from '../components/ItemList';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import {API_URL} from '../index';

export function NewsPageContent() {
  const [data, setData] = useState(null);
  React.useEffect(() => {
    axios.get(`${API_URL}/news`)
    .then((response) => {
      console.log(response);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <ItemList sx={{margin: 'auto'}} data={data} card='NewsCard'/>
  );
}