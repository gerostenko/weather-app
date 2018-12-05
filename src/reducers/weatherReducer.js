
import { FETCH_WEATHER } from '../actions/type';

const initialState = {
  item: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}