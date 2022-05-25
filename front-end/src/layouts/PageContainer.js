import * as React from 'react';
import { NavBar } from '../components/NavBar';
import Box from '@mui/material/Box';

export function PageContainer(props) {
  return (
      <Box sx={{display: 'flex', gap: '20px'}}>
        <NavBar/>
          <Box sx={{margin: 'auto', mt:'25px', width: .8}}>
            {props.content}
          </Box>
      </Box>
  );
}