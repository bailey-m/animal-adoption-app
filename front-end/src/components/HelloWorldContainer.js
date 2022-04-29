import React, {useState} from 'react';
import axios from 'axios';
import {Typography} from '@mui/material';

export function HelloWorldContainer() {
  return (
    <HelloWorldText exampleProp={'This is an example prop'}/>
  );
}

function HelloWorldText(props) {
  const [data, setData] = useState('Hello from the front-end');
  React.useEffect(() => {
    axios.get('http://localhost:8080/helloworld')
    .then((response) => {
      console.log(response);
      setData("Hello World");
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <Typography>{data}</Typography>
      <Typography variant="body2">{props.exampleProp}</Typography>
    </>
  );
}