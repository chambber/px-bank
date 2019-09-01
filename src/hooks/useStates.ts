import { useEffect, useState } from 'react';

import { states } from '../services/countries-states-cities';

import { UseStatesHook } from '../models/UseStatesHook';

const initialState = {
  loading: false,
  data: [],
};

const useStates = () => {
  const [hook, setHook] = useState<UseStatesHook>(initialState);

  useEffect(() => {
    setHook({ loading: true, data: [] });

    const data = states
      .map(state => ({
        id: state.sigla,
        name: state.nome,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return setHook({ loading: false, data });
  }, []);

  return hook;
};

export { useStates };
