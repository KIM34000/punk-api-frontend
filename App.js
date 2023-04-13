import './App.css';
import React, { useState, useEffect } from 'react';
import BeerList from './ListComponent.jsx';
import SelectedBeer from './DetailComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import SearchBeers from './SearchComponent.jsx';
import axios from 'axios';


const App = () => {
// selectedBeer state variable,which will store the ID of the beer that is currently selected by the user
  const [selectedBeer, setSelectedBeer] = useState(null);
  //The handleClose function is used to reset the selectedBeer state variable to null 
  //when the user clicks the close button on the beer details pop-up.
  const handleClose = () => setSelectedBeer(null);
  //handleBeerClick function is used to set the selectedBeer state variable to the ID of the beer 
  //that the user clicked on in the beer list.
  const handleBeerClick = beerId => {
    setSelectedBeer(beerId);
  };
  //state variable initialBeers is used to store the list of beers fetched from the API,
  // and searchResults is used to store the list of beers that match the user's search query.
  const [initialBeers, setInitialBeers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
//useEffect is used to fetch beer data from the API when the component is mounted
  useEffect(() => {
    // Fetch all beers on component mount
    const fetchBeers = async () => {
      try {
        const res = await axios.get(`https://api.punkapi.com/v2/beers`);
        setInitialBeers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBeers();
  }, []);

    return (

      <div className="center-content">        
        <h2 style={{
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
        padding: '1rem'
        }}
        className="title">Beer Page</h2> 
        <div>
        {/* When the user enters a search query, 
        the SearchBeers component will filter the initialBeers array and set the searchResults state variable with the filtered array. */}
        <SearchBeers
          initialBeers={initialBeers}
          onSearch={setSearchResults}
        />
        {/* handleBeerClick function is called and sets the selectedBeer state variable to the ID of the clicked beer. */}
        <BeerList 
          searchResults={searchResults.length > 0 ? searchResults : initialBeers}
          onBeerClick={handleBeerClick}
        />
        {/* SelectedBeer component is passed the beerId of the selected beer and it fetches and displays the details of that beer */}
        <Modal show={selectedBeer} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Beer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SelectedBeer beerId={selectedBeer} />
          </Modal.Body>
          <Modal.Footer>
          {/* Close button in the pop-up footer calls the handleClose function to hide the pop-up. */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
       
      </div>
      </div>
     
      )
  };

export default App;
