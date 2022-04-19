import * as React from 'react';
import { NavBar } from '../components/NavBar';
import Box from '@mui/material/Box';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

export function PageContainer(props) {
  return (
      <Box sx={{display: 'flex', gap: '20px'}}>
        <NavBar/>
        <ScopedCssBaseline>
            {props.content}
        </ScopedCssBaseline>
      </Box>
  );
}