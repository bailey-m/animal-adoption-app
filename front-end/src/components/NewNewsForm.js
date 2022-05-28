import * as React from 'react';
import axios from 'axios';
import {API_URL} from '../index';
import {useState} from 'react';
import { FormControl, Box, Button, TextField, Typography } from '@mui/material';

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
export function NewNewsForm(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return (
        <Box sx={style}>
            <FormControl sx={{width: 400}} >
            <form onSubmit={() => {axios.post(`${API_URL}/news`, null, {params: {
                Title: title,
                Description: description,
                }}); window.location.reload(false)}}>

            <Typography>Add New News Item</Typography>
            <TextField required id="outlined-basic" label="Title" variant="outlined" value={title} sx={{width: 400 }} 
                onChange={(e) => {setTitle(e.target.value);}}/>
            <TextField required id="outlined-basic" label="Description" variant="outlined" multiline rows={2} value={description} sx={{width: 400 }} 
                onChange={(e) => {setDescription(e.target.value);}}/>
            <Button variant='contained' type='submit'>Add News Post</Button>
            </form>
            </FormControl>
        </Box>
    )
}