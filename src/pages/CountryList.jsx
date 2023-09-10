// src/components/CountryList.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../api';
import { InfinitySpin } from 'react-loader-spinner';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    getCountries();
  }, []);

  // Filter countries based on the search input
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Country List</h1>

      {/* Add the search bar */}
      <input
        type="text"
        placeholder="Search countries..."
        className="mb-4 p-2 border border-gray-300 rounded-md"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <InfinitySpin 
              width='200'
              color="#4fa94d"
              />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries
            .sort((a, b) => a.name.common.localeCompare(b.name.common)) // Sort alphabetically
            .map((country) => (
              <li key={country.name.common} className="bg-white rounded-lg shadow-md">
                <Link to={`/country/${country.name.common}`}>
                  <div className="p-4">
                    <img
                      src={country.flags.svg}
                      alt={`Flag of ${country.name.common}`}
                      className="mx-auto mb-2 h-20 w-20 object-cover rounded-full"
                    />
                    <p className="text-lg font-semibold">{country.name.common}</p>
                    <p className="text-gray-600">{country.capital}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CountryList;
