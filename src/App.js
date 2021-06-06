import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";
import Menu from "./components/MenuComponent";

function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu />
      <h1>hola</h1>
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
