import * as React from 'react';
import { ItemList } from '../components/ItemList';
import NewsCard from '../components/NewsCard';

const mockNewsData = [
  {
    id: 1,
    imageURL: 'https://pbs.twimg.com/profile_images/1478141668159148033/IOD8SZvx_400x400.jpg',
    title: 'Oscar Was Adopted!',
    description: 'Congratulations to Oscar on their adoption! We hope you enjoy your forever home!',
    date: 'April 20, 2022'
  },
  {
    id: 2,
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbe5N5cK3zRLbUcAv-oowk7u__vtVMbiZpw&usqp=CAU',
    title: 'New Dog Alert: Meet Lucy!',
    description: 'Lucy is a spunky Golden Retriever who wants to spend every minute by your side.',
    date: 'April 26, 2022'
  },
  {
    id: 3,
    date: 'April 20, 2022',
    description: 'Cuddles is now available for adoption at your local adoption center!',
    title: 'Cuddles is Available!',
    imageURL: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
  }
]


export function NewsPageContent() {
  // TODO insert query for list of data on page load
  // TODO pass in card to render (either pet or news card) as prop to item list, which will pass to Modal to open
  return (
    <ItemList sx={{margin: 'auto'}} data={mockNewsData} card='NewsCard'/>
  );
}