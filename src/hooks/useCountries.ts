import { useEffect, useState } from 'react';
import { UseCountriesHook } from '../models/UseCountriesHook';
import { countries } from '../services/countries-states-cities';

const useCountries = () => {
  const [hook, setHook] = useState<UseCountriesHook>({ loading: false, data: [] });

  useEffect(() => {
    setHook({ loading: true, data: [] });

    const data = countries
      .map(country => ({
        id: country.id,
        name: country.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    setHook({ loading: false, data });
  }, []);

  return hook;
};

export { useCountries };
