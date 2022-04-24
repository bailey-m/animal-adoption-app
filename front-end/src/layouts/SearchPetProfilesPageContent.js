import * as React from 'react';
import { ItemList } from '../components/ItemList';

const mockPetData = [
  {
    id: 1,
    photoUrl: 'blah.com',
    name: 'Oscar',
    description: 'German Shepherd | 1 year old'
  },
  {
    id: 2,
    photoUrl: 'blah.com',
    name: 'Lucy',
    description: 'Golden Retriever | 3 years old'
  },
]

export function SearchPetProfilesPageContent() {
  // TODO insert query for list of data on page load
  // TODO insert search/filters with Search button that queries based on filters
  // TODO pass in card to render (either pet or news card) as prop to item list, which will pass to Modal to open
  return (
    <ItemList sx={{margin: 'auto'}} data={mockPetData}/>
  );
}
