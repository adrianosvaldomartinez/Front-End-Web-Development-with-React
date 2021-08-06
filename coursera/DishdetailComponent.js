import React, { useState } from "react";
import { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  List,
  Row,
  Col,
  Label,
} from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

function required(val) {
  console.log("ESTO ES VAL", val);
  return val && val.length;
}
const maxLength = (len) => (val) => !val || val.length <= len;
// const minLength = (len) => (val) => val && val.length >= len;
function minLength(len) {
  // len es el dato que nosotros le pasamos como minimo
  console.log("esto es len", len);
  return function (val) {
    return val && val.length >= len;
  };
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      // <Col xs="12" md="5" m="1" className="m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      // </Col>
    );
  else return <div></div>;
}

function RenderComments({ comments }) {
  if (comments != null)
    return (
      // <Col xs="12" md="5" className="m-1">
      <Card>
        <CardBody>
          <h4>Comments</h4>
          <List type="unstyled">
            {comments.map(function (item) {
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
      // </Col>
    );
  else return <div></div>;
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    // estos son hooks que se usarian en function components
    // const [modal, setModal] = useState(false);
    // al no usar hooks hago de la siguiente manera
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  // estos son hooks que se usarian en function components
  // toggle = () => setModal(!modal);
  // al no usar hooks hago de la siguiente manera
  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div>
        <Button outline color="secondary" onClick={this.toggle}>
          <i className="fa fa-pencil"></i> Submit Comment
        </Button>{" "}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="Rating" md={2}>
                  Rating
                </Label>
              </Row>
              <Row>
                <Col md={10}>
                  <Control.select
                    model=".Rating"
                    name="Rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="Yourname" md={2}>
                  Your Name
                </Label>
              </Row>
              <Row>
                <Col md={10}>
                  <Control.text
                    model=".Yourname"
                    id="Yourname"
                    name="Yourname"
                    placeholder="Your Name"
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
                <Label htmlFor="Comment" md={2}>
                  Comment
                </Label>
              </Row>
              <Row>
                <Col md={10}>
                  <Control.textarea
                    model=".Comment"
                    id="Comment"
                    name="Comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  console.log("ESTOS SON LOS PROPS", props);


  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
