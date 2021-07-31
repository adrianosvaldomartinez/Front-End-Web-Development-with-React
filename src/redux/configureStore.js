import { createStore } from "redux";
import { Reducer, initialState } from "./reducer";

// devuelve una funcion que utiliza crea store
export const ConfigureStore = () => {
  const store = createStore(
    Reducer, // reducer
    initialState // our initialState
  );

  return store;
};
