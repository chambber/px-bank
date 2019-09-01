import { Country } from './Country';

export interface UseCountriesHook {
  loading: boolean;
  data: Country[];
}
