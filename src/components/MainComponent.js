// import React, { Component } from "react";
// import { Navbar, NavbarBrand } from "reactstrap";
// import Menu from "./MenuComponent";
// import DishDetail from "./DishdetailComponent";
// import { DISHES } from "../shared/dishes";
// import Header from "./HeaderComponent";
// import Footer from "./FooterComponent";

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dishes: DISHES,
//       selectedDish: null,
//     };
//   }

//   onDishSelect(dishId) {
//     console.log("este es el dish id,", dishId);
//     this.setState({ selectedDish: dishId });
//   }

//   render() {
//     return (
//       <div>
//         <Header />

//         <Navbar dark color="primary">
//           <div className="container">
//             <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
//           </div>
//         </Navbar>
//         <Menu
//           dishes={this.state.dishes}
//           onClick={(dishId) => this.onDishSelect(dishId)}
//         />
//         <DishDetail
//           dish={
//             this.state.dishes.filter(
//               (dish) => dish.id === this.state.selectedDish
//             )[0]
//           }
//         />
//         <Footer />
//       </div>
//     );
//   }
// }

// export default Main;

import React, { Component } from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";

import Contact from "./ContactComponent";
import About from "./AboutComponent";

import { addComment } from "../redux/ActionCreators";
// import { DISHES } from "../shared/dishes";
// import { COMMENTS } from "../shared/comments";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    // se comenta porque se va a traer de redux el estado
    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS,
    // };
  }

  render() {
    // envia al componente hompage los props
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        // <DishDetail
        //   dish={
        //     this.props.dishes.filter(
        //       (dish) => dish.id === parseInt(match.params.dishId, 10)
        //     )[0]
        //   }
        //   comments={this.props.comments.filter(
        //     (comment) => comment.dishId === parseInt(match.params.dishId, 10)
        //   )}
        // />
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };
    return (
      <div>
        <Header />
        {/* el Switch abajo compara la url solicitada al browser con sus opciones de switch y te devuelve el componete asociado */}
        <Switch>
          <Route exact path="/contactus" component={Contact} />
          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route path="/home" component={HomePage} />
          {/* esta llamada a la ruta menu es con una funcion porque se le pasan props */}
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          {/* en esta otro caso tambien se le estan pasando props, pero se definieron en la cosntante, no aqui */}
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// export default Main;
// connect es un funcion de react-redux
// ----------------------------------------------------------------------------------------------------------------------------------
// connect(mapStateToProps) va a dar como resultado una funcion al que se le pasa el parametro Main

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
