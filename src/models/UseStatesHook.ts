import { State } from './State';

export interface UseStatesHook {
  loading: boolean;
  data: State[];
}
