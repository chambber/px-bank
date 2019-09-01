import { useState, useEffect } from 'react';

import { State } from '../models/State';
import { UseCitiesHook } from '../models/UseCitiesHook';
import { states } from '../services/countries-states-cities';

const initialCities = {
  loading: false,
  data: [],
};

const useCities = (state: (State | undefined)) => {
  const [hook, setHook] = useState<UseCitiesHook>(initialCities);

  useEffect(() => {
    if (!state) return setHook(initialCities);

    setHook({ loading: true, data: [] });

    const stateData = states.find(element => element.sigla === state.id);
    if (!stateData) return setHook(initialCities);

    const data = stateData.cidades
      .map(city => ({
        id: city,
        name: city,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return setHook({ loading: false, data });
  }, [state]);

  return hook;
};

export { useCities };
