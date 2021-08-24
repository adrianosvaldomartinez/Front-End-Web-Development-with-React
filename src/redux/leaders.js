// import { LEADERS } from "../shared/leaders";
import * as ActionTypes from "./ActionTypes";
// export const Leaders = (state = LEADERS, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export const Leaders = (
  state = { isLoading: true, errMess: null, leaders: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADER:
      // el spread operator aqui significa meter todos los elementos del objeto original y modfiicar solo los que especifico despues
      // osea mete todo y despues cambia de nuevo
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };

    case ActionTypes.LEADER_LOADING:
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.LEADER_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
