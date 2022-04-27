import React, {Component} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';

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
                    <Box>
                        <Typography align='left' variant='h4'>{this.props.news.title}</Typography>
                        <Typography align='left' variant='subtitle1'>{this.props.news.date}</Typography>
                        <Typography align='left' variant='body1'>{this.props.news.description}</Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }
}
 
export default NewsCard;