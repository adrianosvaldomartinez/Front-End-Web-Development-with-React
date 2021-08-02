// import React from "react";
import React, { Component } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Col,
//   Row,
//   FormFeedback,
// } from "reactstrap";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { Link } from "react-router-dom";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   firstname: "",
    //   lastname: "",
    //   telnum: "",
    //   email: "",
    //   agree: false,
    //   contactType: "Tel.",
    //   message: "",
    //   touched: {
    //     firstname: false,
    //     lastname: false,
    //     telnum: false,
    //     email: false,
    //   },
    // };
    // las siguientes lineas de codigo son necesarias porque las funciones tienen que ejecutarse dentro del scope del constructor para afectar sus variables (state)

    // el primer this hace referencia al llamado de de la funcion en el codigo posterior
    // el segundo this lo que esta haciendo es asignarle el contexto del constructor, de modo a que pueda acceder a modificar el estado (this.setstate) ese

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleBluradrian = this.handleBluradrian.bind(this);
    this.handleBlurfoo = this.handleBlurfoo.bind(this);
  }

  // el event es el form o elemento html sobre que trigereo el llamado del evento
  // en este caso el form que es un objeto que tiene varios atributos (target, type, name etc)
  // ESTA FUNCION SE ESTA LLAMANDO DENTRO DEL CONTEXTO DEL CONSTRUCTO POR EL BIND, asi tiene acceso a los estados
  handleInputChange(event) {
    // console.log(event);
    console.log("ESTO ES THIS", this.state);
    // se usa en value una linea mas abajo
    const target = event.target;
    // se usa en setState
    const value = target.type === "checkbox" ? target.checked : target.value;
    // es la definicion del nombre
    const name = target.name;
    // recibe dinamicamente el name ( )
    this.setState({
      // porque name esta entre llaves? osea no hay una propeda que se name, tiene que buscar la que corresponda a lo que recibe
      // -------------------------------------------------------------------------------------------------------como exactamente funcion el [] alli
      // FUNCION DE LA SIGUIENTE MANERA, CUANDO QUEREMOS PASAR UNA VARIABLE COMO PROPIEDAD SE PASA ENTRE BRACKETS
      // como sabe que no tiene que reemplazr todo el contenido? en el caso sigueitne pasa eso si no se usa el rest parameter
      [name]: value,
      // name.
    });
  }

  // handleSubmit(event) {
  //   console.log("Current State is: " + JSON.stringify(this.state));
  //   alert("Current State is: " + JSON.stringify(this.state));
  //   event.preventDefault();
  // }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }

  // ON BLUR ESPERA UNA DEFINCION DE FUNCION, NO UNA LLAMADA A LA FUNCION, POR ESO NORMLAMENTE PONEMOS EL NOMBRE DE LA FUNCION SIN EL LLAMADO()
  // ES COMO ADD EVENT LISTENER
  // EN EL CASO DONDE SI LLAMAMOS, ESA LLAMADA HACE REFERENCIA A SU VEZ A LA LLAMADA DE LA DEFINICION DE LA FUNCION, NO A UN LLAMADO DIRECTO
  // OSEA LLAMAMOS A UNA FUNCION QUE ESTA RETORNANDO LA DEFINICION DE LA FUNCION DENTRO SUYO, NO LA LLAMADA

  // EJEMPLO DE LLAMADO DENTRO DEL JSX, LO QUE LLAMA ES A UNA FUNCION QUE RETORNA LA DEFINICION (NO HAY UN LLAMADO DIRECTO)
  // field es por ejemple name
  handleBlur = (field) => (evt) => {
    this.setState({
      // si no tiene el rest parameter solo mete el field actual y no los demas que ya estaban
      touched: { ...this.state.touched, [field]: true },
    });
  };
  // OTRO EJEMPLO DE LLAMADO DENTRO DEL JSX, LO QUE LLAMA ES A UNA FUNCION QUE RETORNA LA DEFINICION (NO HAY UN LLAMADO DIRECTO)
  //  En este caso no usamos arrow function por lo que tenemos que hacer el BIND (el arrow functon usa el scope del padre para su scope)
  handleBlurfoo = function (field) {
    return function (evt) {
      console.log("BABA YAGA", this.state.touched);
      this.setState({
        // -------------------------------------------------------------------------------------------------------como exactamente funcion el ... alli
        // si no tiene el rest parameter solo mete el field actual y no los demas que ya estaban
        // esta expandiendo  todos los elementos del objetos y separando por comas y reasigna uno dos veces
        touched: { ...this.state.touched, [field]: true },
        // touched: { ...this.state.touched },
      });
    }.bind(this);
  };

  // EJEMPLO SIN LLAMAR EN EL JSX, Y LO QUE TENEMOS ES LA DEFINICION DE LA FUNCION (NO EL LLAMADO)
  // SI llamaramos a la funcion se llamaria en un loop infinito y arroja el sgte error
  // Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside
  handleBluradrian(field) {
    // console.log("en este contexto se ejecuta handle blur", this.state.touched);
    // console.log(field.target.id);
    this.setState({
      // -------------------------------------------------------------------------------------------------------Porque no se puede hacer asi?
      // touched.[field] :true
      // si no tiene el rest parameter solo mete el field actual y no los demas que ya estaban
      touched: { ...this.state.touched, [field.target.id]: true },
    });
  }

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (this.state.touched.firstname && firstname.length < 3)
      errors.firstname = "First Name should be >= 3 characters";
    else if (this.state.touched.firstname && firstname.length > 10)
      errors.firstname = "First Name should be <= 10 characters";

    if (this.state.touched.lastname && lastname.length < 3)
      errors.lastname = "Last Name should be >= 3 characters";
    else if (this.state.touched.lastname && lastname.length > 10)
      errors.lastname = "Last Name should be <= 10 characters";

    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum))
      errors.telnum = "Tel. Number should contain only numbers";

    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }
  render() {
    // const errors = this.validate(
    //   this.state.firstname,
    //   this.state.lastname,
    //   this.state.telnum,
    //   this.state.email
    // );
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
            <div className="row row-content">
              <div className="col-12">
                <h3>Send us your Feedback</h3>
              </div>
              <div className="col-12 col-md-9">
                {/* no se pone () a la funcion en javascript cuando se llama a un evento, si estas en html si se pone , en este caso 
                a handel submit se le va a pasar el "form" como parametro  */}
                {/* <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label htmlFor="firstname" md={2}>
                      First Name
                    </Label>
                    <Col md={10}>
                      <Input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        value={this.state.firstname}
                        valid={errors.firstname === ""}
                        invalid={errors.firstname !== ""}
                        // onBlur={this.handleBlur("firstname")}
                        onBlur={this.handleBluradrian}
                        onChange={this.handleInputChange}
                      />
                      <FormFeedback>{errors.firstname}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="lastname" md={2}>
                      Last Name
                    </Label>
                    <Col md={10}>
                      <Input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        value={this.state.lastname}
                        valid={errors.lastname === ""}
                        invalid={errors.lastname !== ""}
                        onBlur={this.handleBlurfoo("lastname")}
                        onChange={this.handleInputChange}
                      />
                      <FormFeedback>{errors.lastname}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="telnum" md={2}>
                      Contact Tel.
                    </Label>
                    <Col md={10}>
                      <Input
                        type="tel"
                        id="telnum"
                        name="telnum"
                        placeholder="Tel. Number"
                        value={this.state.telnum}
                        valid={errors.telnum === ""}
                        invalid={errors.telnum !== ""}
                        onBlur={this.handleBlur("telnum")}
                        onChange={this.handleInputChange}
                      />
                      <FormFeedback>{errors.telnum}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="email" md={2}>
                      Email
                    </Label>
                    <Col md={10}>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        valid={errors.email === ""}
                        invalid={errors.email !== ""}
                        onBlur={this.handleBlur("email")}
                        onChange={this.handleInputChange}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={{ size: 6, offset: 2 }}>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="agree"
                            checked={this.state.agree}
                            onChange={this.handleInputChange}
                          />{" "}
                          <strong>May we contact you?</strong>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md={{ size: 3, offset: 1 }}>
                      <Input
                        type="select"
                        name="contactType"
                        value={this.state.contactType}
                        onChange={this.handleInputChange}
                      >
                        <option>Tel.</option>
                        <option>Email</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="message" md={2}>
                      Your Feedback
                    </Label>
                    <Col md={10}>
                      <Input
                        type="textarea"
                        id="message"
                        name="message"
                        rows="12"
                        value={this.state.message}
                        onChange={this.handleInputChange}
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Send Feedback
                      </Button>
                    </Col>
                  </FormGroup>
                </Form> */}

                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="firstname" md={2}>
                      First Name
                    </Label>
                    <Col md={10}>
                      <Control.text
                        model=".firstname"
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".firstname"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="lastname" md={2}>
                      Last Name
                    </Label>
                    <Col md={10}>
                      <Control.text
                        model=".lastname"
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".lastname"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="telnum" md={2}>
                      Contact Tel.
                    </Label>
                    <Col md={10}>
                      <Control.text
                        model=".telnum"
                        id="telnum"
                        name="telnum"
                        placeholder="Tel. Number"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                          isNumber,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".telnum"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 2 numbers",
                          maxLength: "Must be 15 numbers or less",
                          isNumber: "Must be a number",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="email" md={2}>
                      Email
                    </Label>
                    <Col md={10}>
                      <Control.text
                        model=".email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        validators={{
                          required,
                          validEmail,
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".email"
                        show="touched"
                        messages={{
                          required: "Required",
                          validEmail: "Invalid Email Address",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={{ size: 6, offset: 2 }}>
                      <div className="form-check">
                        <Label check>
                          <Control.checkbox
                            model=".agree"
                            name="agree"
                            className="form-check-input"
                          />{" "}
                          <strong>May we contact you?</strong>
                        </Label>
                      </div>
                    </Col>
                    <Col md={{ size: 3, offset: 1 }}>
                      <Control.select
                        model=".contactType"
                        name="contactType"
                        className="form-control"
                      >
                        <option>Tel.</option>
                        <option>Email</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="message" md={2}>
                      Your Feedback
                    </Label>
                    <Col md={10}>
                      <Control.textarea
                        model=".message"
                        id="message"
                        name="message"
                        rows="12"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Send Feedback
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
