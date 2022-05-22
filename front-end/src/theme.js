import { createTheme } from '@mui/material/styles';

export const headingTheme = createTheme({
    typography: {
        fontFamily: [
            'Trade Winds', 
            'normal',
        ].join(','),
    },
});

export const buttonTheme = createTheme({
    typography: {
        fontFamily: [
            'Special Elite',
            'normal',
        ].join(','),
    },
})