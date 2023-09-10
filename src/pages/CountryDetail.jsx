// src/components/CountryDetail.js
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountries } from '../api';
import { InfinitySpin } from 'react-loader-spinner';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const data = await fetchCountries();
        const selectedCountry = data.find(
          (c) => c.name?.common === name
        );
        setCountry(selectedCountry);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    getCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <InfinitySpin 
            width='200'
            color="#4fa94d"
            />
      </div>
    );
  }

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 font-sans ">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:none">
            &larr; Back to Country List
          </Link>
        </div>
        <h1 className="text-3xl font-semibold mb-4">{country.name?.common}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <img
              src={country.flags?.svg}
              alt={`Flag of ${country.name?.common}`}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div>
            <p className="text-lg">
              <strong>Capital:</strong> {country.capital}
            </p>
            <p className="text-lg">
              <strong>Languages:</strong> {Object.values(country.languages).join(', ')}
            </p>
            <p className="text-lg">
              <strong>Currencies:</strong> {Object.keys(country.currencies).map((currencyCode) => (
                <span key={currencyCode}>
                  {country.currencies[currencyCode].name} ({country.currencies[currencyCode].symbol})
                  {currencyCode !== Object.keys(country.currencies)[Object.keys(country.currencies).length - 1] ? ', ' : ''}
                </span>
              ))}
            </p>
            <p className="text-lg">
              <strong>Timezone:</strong> {country.timezones[0]}
            </p>
            <p className="text-lg">
              <strong>Continent:</strong> {country.region}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a
            href={`https://en.wikipedia.org/wiki/${country.name?.common}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Learn more about {country.name?.common} on Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
