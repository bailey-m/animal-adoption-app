import { createTheme } from '@mui/material/styles';

export const headingTheme = createTheme({
    typography: {
        fontFamily: [
            'Tahoma', 
            'normal',
        ].join(','),
    },
});

export const textTheme = createTheme({
    typography: {
        fontFamily: [
            'Tahoma',
            'normal',
        ].join(','),
    },
})