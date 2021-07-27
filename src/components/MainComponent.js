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
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  render() {
    // envia al componente hompage los props
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
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
            component={() => <About leaders={this.state.leaders} />}
          />
          <Route path="/home" component={HomePage} />
          {/* esta llamada a la ruta menu es con una funcion porque se le pasan props */}
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
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

export default Main;
