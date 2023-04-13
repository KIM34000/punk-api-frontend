import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//searchResults prop is an array of objects, where each object represents a beer 
//and contains information such as its name and ABV (alcohol by volume) percentage
//onBeerClick prop is a callback function that gets called when a user clicks on a beer in the list
const BeerList = ({ searchResults, onBeerClick }) => {
    //abvSortOrder and nameSortOrder using the useState hook
    const [abvSortOrder, setAbvSortOrder] = useState(null);
    const [nameSortOrder, setNameSortOrder] = useState(null);
    const handleBeerClick = searchResults => {
      onBeerClick(searchResults);
    };
  //sortResults that takes an array of beer objects as an argument and returns the sorted results based on the current sort order
    const sortResults = (results) => {
        if (abvSortOrder === 'desc') {
          return results.sort((a, b) => b.abv - a.abv);
        } else if (abvSortOrder === 'asc') {
          return results.sort((a, b) => a.abv - b.abv);
        } else if (nameSortOrder === 'desc') {
          return results.sort((a, b) => b.name.localeCompare(a.name));
        } else if (nameSortOrder === 'asc') {
          return results.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          return results;
        }
      };
    //handleAbvSortClick and handleNameSortClick, which are called when a user clicks on the ABV or Name button
      const handleAbvSortClick = () => {
        if (abvSortOrder === 'asc') {
          setAbvSortOrder('desc');
        } else {
          setAbvSortOrder('asc');
        }
        setNameSortOrder(null);
      };

      const handleNameSortClick = () => {
        if (nameSortOrder === 'asc') {
          setNameSortOrder('desc');
        } else {
          setNameSortOrder('asc');
        }
        setAbvSortOrder(null);
      };
    
      const sortedResults = sortResults(searchResults);

    return   (
        <div>
      <div>
      <button type="submit" className="btn btn-primary mb-2" onClick={handleNameSortClick}style={{ margin:'3%' }}>
          Name {nameSortOrder === 'asc' ? '↑' : nameSortOrder === 'desc' ? '↓' : ''}
        </button>
        <button type="submit" className="btn btn-primary mb-2" onClick={handleAbvSortClick}style={{ margin:'3%' }}>
          ABV {abvSortOrder === 'asc' ? '↑' : abvSortOrder === 'desc' ? '↓' : ''}
        </button>
      </div>
        <ul style={{
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
            padding: '1rem',
            listStyle: 'none' 
          }}
          class="form-select" size="3" aria-label="size 3 select example">
          {searchResults && searchResults.map((beer, index) => (
            <li style={{
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5)',
              borderRadius: '10px',
              padding: '1rem'
            }}
            key={beer.id} onClick={() => handleBeerClick(beer.id)}>
              {beer.name} - ABV: {beer.abv}%
            </li>
          ))}
          </ul>
          </div>
    );
  };
  
export default BeerList;
