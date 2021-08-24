import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

// las acciones son funciones que retornan un objeto, en base a los variables pasadas a la funcion
// estas se llaman con dispatch

// la sgte linea es la accion para traer todos los feedbacks  la pagina
export const addFeedbacks = (comments) => ({
  type: ActionTypes.ADD_FEEDBACKS,
  payload: comments,
});
export const feedbackFailed = (errmess) => ({
  type: ActionTypes.FEEDBACK_FAILED,
  payload: errmess,
});
export const fetchFeedbacks = () => (dispatch) => {
  return fetch(baseUrl + "feedback")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addFeedbacks(comments)))
    .catch((error) => dispatch(feedbackFailed(error.message)));
};
// esta linea de abajo agrega el feedback al objeto
export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
});
//Sgte linea envia los nuevos post al objeto
export const postFeedback =
  (firstname, lastname, telnum, email, agree, contactType, message) =>
  (dispatch) => {
    const newFeedback = {
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message,
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + "feedback", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addFeedback(response)))
      .catch((error) => {
        console.log("post feedback", error.message);
        alert("Your feedback could not be posted\nError: " + error.message);
      });
  };

export const addLeader = (leaderinfo) => ({
  type: ActionTypes.ADD_LEADER,
  payload: leaderinfo,
});

export const leaderLoading = () => ({
  type: ActionTypes.LEADER_LOADING,
});
// no usamos en el ejemplo
export const leaderFailed = (errmess) => ({
  type: ActionTypes.LEADER_FAILED,
  payload: errmess,
});

export const fetchLeader = () => (dispatch) => {
  dispatch(leaderLoading(true));
  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // el segundo argumento del metodo then, es llamado si hay un reject de la promesa
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addLeader(dishes)))
    .catch((error) => dispatch(leaderFailed(error.message)));
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();

  return (
    fetch(baseUrl + "comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      // la sgte linea añade al objeto el nuevo feedback
      .then((response) => dispatch(addComment(response)))
      .catch((error) => {
        console.log("post Comment", error.message);
        alert("Your Comment could not be posted\nError: " + error.message);
      })
  );
};

// este es el THUNK
// Redux Thunk middleware allows you to write action creators that return a function instead of an action
// en el caso de abajo devuelve una funcion donde podemos llamar a otras acciones (dishe loading)
// y aparte retornamo el objecto despues de fetchearlo
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // el segundo argumento del metodo then, es llamado si hay un reject de la promesa
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

// Es usado en fetch dishes
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});
// no usamos en el ejemplo
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});
// se llama en fetc dishes
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
