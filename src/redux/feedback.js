import * as ActionTypes from "./ActionTypes";

export const Feedback = (state = { errMess: null, Feedback: [] }, action) => {
  switch (action.type) {
    // hacer el fetch a la pagina
    case ActionTypes.ADD_FEEDBACKS:
      return { ...state, errMess: null, feedback: action.payload };

    case ActionTypes.FEEDBACK_FAILED:
      return { ...state, errMess: action.payload };

    // añade al objeto
    case ActionTypes.ADD_FEEDBACK:
      var feedback = action.payload;
      return { ...state, feedback: state.feedback.concat(feedback) };

    default:
      return state;
  }
};
