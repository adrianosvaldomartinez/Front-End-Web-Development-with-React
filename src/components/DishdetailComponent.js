import React, { Component } from "react";
import { Media } from "reactstrap";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  List,
  Col,
  Row,
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  // para mostrar el que hacemos click es llamada en el render
  renderDish(dish) {
    if (dish != null)
      return (
        <Col xs="12" md="5" m="1" className="m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    if (comments != null)
      return (
        <Col xs="12" md="5" className="m-1">
          <Card>
            <CardBody>
              <h4>Comments</h4>
              <List type="unstyled">
                {comments.comments.map(function (item) {
                  return (
                    <li key="{item.id}">
                      {" "}
                      {item.comment} <br></br> <span>--</span> {item.author}{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(item.date)))}
                    </li>
                  );
                })}
              </List>
            </CardBody>
          </Card>
        </Col>
      );
    else return <div></div>;
  }

  // la funcion render se pone siempre para mostra el contenido
  // el contenido es el return de esta funcion
  // en este caso antes del return declaramos una constante menu que  devuelve un array  las cards de todos los dishes

  // porque la card no ocupan el 100% del ancho?
  render() {
    return (
      <div className="container">
        <Row>
          {this.renderDish(this.props.dish)}

          {this.renderComments(this.props.dish)}
        </Row>
        {/* <Row>
          <Col xs="12" md="5">
            col 1
          </Col>
          <Col xs="12" md="5">
            col 2
          </Col>
          <Col xs="12" md="5">
            col 3
          </Col>
        </Row>
        <div className="row">
          <div className="col-12 col-md-5 m-3">col a</div>
          <div className="col-12 col-md-5 m-3">col b</div>
          <div className="col-12 col-md-5 m-3">col c</div>
        </div> */}
      </div>
    );
  }
}

export default DishDetail;