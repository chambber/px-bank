import { Reducer } from "redux";
import { RatesState, RatesTypes } from "./types";

const INITIAL_STATE: RatesState = {
  selected: 'USD'
};

const reducer: Reducer<RatesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RatesTypes.SET:
      return {
        selected: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
