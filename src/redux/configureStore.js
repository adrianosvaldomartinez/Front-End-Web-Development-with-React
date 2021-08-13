// import { createStore } from "redux";
// import { Reducer, initialState } from "./reducer";

// // devuelve una funcion que utiliza crea store
// export const ConfigureStore = () => {
//   const store = createStore(
//     Reducer, // reducer
//     initialState // our initialState
//   );

//   return store;
// };
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";

// el valor (estado) incial de nuestro store Dishes tiene el objecto que es definicion de funcion que retorna el estado actual
// dentro de ese objeto estan las instrucciones de como actualizar el valor del estado, dependiendo de la accion enviada con dispatch
// ver ejemplo de archivo comment
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
