import * as React from 'react';
import { ItemList } from '../components/ItemList';

const mockNewsData = [
  {
    id: 1,
    photoUrl: 'blah.com',
    name: 'Oscar Was Adopted!',
    description: 'Congratulations to Oscar on their adoption! We hope you enjoy your forever home!'
  },
  {
    id: 2,
    photoUrl: 'blah.com',
    name: 'New Dog Alert: Meet Lucy!',
    description: 'Lucy is a spunky Golden Retriever who wants to spend every minute by your side.'
  },
]

export function NewsPageContent() {
  // TODO insert query for list of data on page load
  // TODO pass in card to render (either pet or news card) as prop to item list, which will pass to Modal to open
  return (
    <ItemList sx={{margin: 'auto'}} data={mockNewsData}/>
  );
}