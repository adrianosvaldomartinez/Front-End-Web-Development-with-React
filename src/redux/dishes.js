import { DISHES } from "../shared/dishes";
import * as ActionTypes from "./ActionTypes";

// export const Dishes = (state = DISHES, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export const Dishes = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      // el spread operator aqui significa meter todos los elementos del objeto original y modfiicar solo los que especifico despues
      // osea mete todo y despues cambia de nuevo
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
