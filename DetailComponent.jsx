import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectedBeer =  ({ beerId })  => {
    const [beer, setBeer] = useState({});

    const fetchBeer = async (id) => {
        try {
            const res = await axios.get('https://api.punkapi.com/v2/beers/' + id);
            console.log(res.data);
            setBeer(res.data);
        } catch (err) {
            console.log(err);
            // handle error
        }
    };

//The useEffect hook is used to fetch the beer when the component mounts.
//The empty dependency array ([]) ensures that the fetchBeer function is only called once
    useEffect(() => {
    fetchBeer(beerId);
  }, []);

  return beer.length > 0 ? (
    
    <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
        padding: '1rem'
      }}
      >
        <div style={{ width: '35%', marginRight: '1rem' }}>
          <img src={beer[0].image_url} alt="Beer" style={{ width: '65%', height: 'auto' }}/>
          <p style={{marginTop:'3%'}}>Alcohol level&nbsp;:&nbsp;{beer[0].abv}%</p>
          <p>Color&nbsp;:&nbsp;{beer[0].ebc}&nbsp;EBC</p>
          <p>Bitter&nbsp;:&nbsp;{beer[0].ibu}&nbsp;IBU</p>
        </div>
        <div style={{ width: '65%' }}>
          <h3>{beer[0].name}</h3>
          <p style={{textAlign: 'left'}}>Description&nbsp;:<br/>{beer[0].description}&nbsp;</p>
          <p style={{textAlign: 'left'}}>Food pairing:</p>
          {beer[0].food_pairing.map((pairing, index) => (
    <p key={index} style={{textAlign: 'left', marginBottom: '0.5rem'}}>{pairing}&nbsp;</p>
  ))}
        </div>
      </div>
  ) : (
    <div>Loading...</div>
    );
    
};

export default SelectedBeer;