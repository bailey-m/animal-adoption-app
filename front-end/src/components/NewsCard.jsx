import React, {Component} from 'react';
import { Typography, ThemeProvider, Box, Card, CardContent, CardMedia } from '@mui/material';
import { textTheme } from '../theme';

class NewsCard extends Component {
    state = {  } 
    render() { 
        return (
            <Card sx={{maxWidth: 500}}>
                <CardMedia
                    component='img'
                    image={this.props.news.imageURL}
                    alt={this.props.news.title}
                />
                <CardContent>
                <ThemeProvider theme={textTheme}>
                    <Box>
                        <Typography align='left' variant='h4'>{this.props.news.title}</Typography>
                        <Typography align='left' variant='subtitle1'>{this.props.news.date}</Typography>
                        <Typography align='left' variant='body1'>{this.props.news.description}</Typography>
                    </Box>
                    </ThemeProvider>
                </CardContent>
            </Card>
        );
    }
}
 
export default NewsCard;