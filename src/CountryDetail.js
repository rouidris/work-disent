import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => setCountry(response.data[0]))
      .catch(error => setError(error));
  }, [name]);

  

  if (error) {
    return <div className="alert alert-danger">Error: {error.message}</div>;
  }

  if (!country) {
    return <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>;
  }

  return (
    <div>
      <h1 className="mb-4">{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="img-fluid" style={{ maxWidth: '200px' }} />
    </div>
  );
}

export default CountryDetail;
