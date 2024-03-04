import React, { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleInput = async (event) => {
    setQuery(event.target.value);
    if (event.target.value !== '') {
      const response = await fetch(`https://restcountries.com/v3.1/name/${event.target.value}`);
      const data = await response.json();
      if (data.length > 10) {
        setCountries(data);
        setSelectedCountry(null);
      } else if (data.length > 1) {
        setCountries(data);
        setSelectedCountry(null);
      } else if (data.length === 1) {
        setCountries([]);
        setSelectedCountry(data[0]);
      }
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${import.meta.env.VITE_SOME_KEY}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setWeather(null);
        }
      }
    };
    fetchWeather();
  }, [selectedCountry]);

  return (
    <>
      <input type="text" value={query} onChange={handleInput} placeholder="Search for a country..." />
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area}</p>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
          {weather && weather.main && (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p><strong>temperature:</strong> {Math.round(weather.main.temp - 273.15)}°C</p>
              {weather.weather && weather.weather[0] && (
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
              )}
              {weather.wind && (
                <p><strong>wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
