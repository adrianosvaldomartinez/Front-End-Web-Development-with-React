import { actions } from "react-redux-form";
import { PROMOTIONS } from "../shared/promotions";
import * as ActionTypes from "./ActionTypes";
// export const Promotions = (state = PROMOTIONS, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

export const Promotions = (
  state = { isLoading: true, errMess: null, promotions: ["jijiji"] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      console.log("ESTAS SON LAS ACCIONES DEL PAYLOAD", action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promotions: action.payload,
      };

    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMess: null, promotions: [] };

    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
