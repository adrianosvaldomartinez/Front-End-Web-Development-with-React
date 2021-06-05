import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      {/* <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
        <div className="container">
          <a className="navbar-brand mr-auto" href="#">
            Ristorante Con Fusion
          </a>
        </div>
      </nav> */}
    </div>
  );
}

export default App;
