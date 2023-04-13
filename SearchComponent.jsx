import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
//initialBeers: An array of objects representing the initial list of beers to search through
//onSearch: A function that is called when the search results are updated.
const SearchBeers = ({ initialBeers, onSearch }) => {
  //abvQuery: A string representing the ABV value to search for 
  const [abvQuery, setAbvQuery] = useState('');
  //abvOperator: A string representing the comparison operator to use for the ABV search 
  //(either "gt" for greater than or "lt" for less than).
  const [abvOperator, setAbvOperator] = useState('gt');
  //searchedBeers: An array of objects representing the search results
  const [searchedBeers, setSearchedBeers] = useState([]);

  useEffect(() => {
    if (initialBeers.length && !searchedBeers.length) {
      setSearchedBeers(initialBeers);
    }
  }, [initialBeers, searchedBeers]);
//handleAbvQueryChange: A function that updates the abvQuery state based on changes to the ABV input field.
  const handleAbvQueryChange = (event) => {
    setAbvQuery(event.target.value);
  };
//handleAbvOperatorChange: A function that updates the abvOperator state based on changes to the ABV operator radio buttons.
  const handleAbvOperatorChange = (event) => {
    setAbvOperator(event.target.value);
  };
//handleSearch: A function that is called when the search form is submitted. This function uses the Axios library to make a GET request
//to the Punk API to retrieve beers with an ABV value greater than or less than the value entered by the user, 
//depending on the selected operator. The results of this request are stored in the searchedBeers state and passed to the onSearch function
  const handleSearch = async event => {
    event.preventDefault();
    try {
      const res = await axios.get(
         `https://api.punkapi.com/v2/beers?abv_${abvOperator}=${abvQuery}`
      );
      setSearchedBeers(res.data);
      onSearch(res.data);
    } catch (err) {
      console.log(err);
      // handle error
    }
  };

  return (
    <form onSubmit={handleSearch} className="form-inline">
  <div className="form-group mx-sm-3 mb-2">
     {/* search for beers with an ABV greater than or less than the entered value. */}
    <label htmlFor="abvOperator" className="mr-2">ABV&nbsp;:&nbsp;&nbsp;&nbsp;</label>
    <div className="form-check form-check-inline">
      <input
        id="abvGt"
        type="radio"
        value="gt"
        checked={abvOperator === 'gt'}
        onChange={handleAbvOperatorChange}
        className="form-check-input"
      />
      <label htmlFor="abvGt" className="form-check-label mr-2">% max</label>
    </div>
    <div className="form-check form-check-inline">
      <input
        id="abvLt"
        type="radio"
        value="lt"
        checked={abvOperator === 'lt'}
        onChange={handleAbvOperatorChange}
        className="form-check-input"
      />
      <label htmlFor="abvLt" className="form-check-label mr-2">% min</label>
    </div>
    <input
      id="abvQuery"
      type="number"
      step="0.1"
      value={abvQuery}
      onChange={handleAbvQueryChange}
      className="form-control mr-sm-2"
      
    />
  </div>
  <div className="center-content">
  <button type="submit" className="btn btn-primary mb-2">Search</button>
  </div>

</form>
  );
};

export default SearchBeers;