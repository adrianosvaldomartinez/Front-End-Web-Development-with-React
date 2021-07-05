import logo from "./logo.svg";
import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
import Menu from "./components/MenuComponent";

// abajo se colocan las llaves  porque no es un export default
import { DISHES } from "./shared/dishes";

// function App() {

//   return (
//     <div>
//       <Navbar dark color="primary">
//         <div className="container">
//           <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
//         </div>
//       </Navbar>
//       <Menu />
//       <h1>hola</h1>
//       {/* <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
//         <div className="container">
//           <a className="navbar-brand mr-auto" href="#">
//             Ristorante Con Fusion
//           </a>
//         </div>
//       </nav> */}
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    // el estado se define aqui dentro del constructor
    this.state = {
      dishes: DISHES,
    };
  }
  // la prueba de abajo la realize para usar directamente this.state, en vez de this.props. (solo posible aqui en el Padre)
  // en el hijo como paso a traves de props siembre se usa this.props
  // otro objetivo de esta prueba es ver que no se puede meter en la funcion render un objeto
  test() {
    let aqui = this.state.dishes.map(function (item) {
      return item.name;
    });
    return aqui;
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
        {/* {this.test()} */}
      </div>
    );
  }
}

export default App;
