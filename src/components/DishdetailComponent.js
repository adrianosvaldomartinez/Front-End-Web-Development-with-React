// import React, { Component } from "react";
// import { Media } from "reactstrap";
// import {
//   Card,
//   CardImg,
//   CardImgOverlay,
//   CardText,
//   CardBody,
//   CardTitle,
//   List,
//   Col,
//   Row,
// } from "reactstrap";

// class DishDetail extends Component {
//   constructor(props) {
//     super(props);
//   }

//   // para mostrar el que hacemos click es llamada en el render
//   renderDish(dish) {
//     if (dish != null)
//       return (
//         <Col xs="12" md="5" m="1" className="m-1">
//           <Card>
//             <CardImg width="100%" src={dish.image} alt={dish.name} />
//             <CardBody>
//               <CardTitle>{dish.name}</CardTitle>
//               <CardText>{dish.description}</CardText>
//             </CardBody>
//           </Card>
//         </Col>
//       );
//     else return <div></div>;
//   }

//   renderComments(comments) {
//     if (comments != null)
//       return (
//         <Col xs="12" md="5" className="m-1">
//           <Card>
//             <CardBody>
//               <h4>Comments</h4>
//               <List type="unstyled">
//                 {comments.comments.map(function (item) {
//                   return (
//                     <li key="{item.id}">
//                       {" "}
//                       {item.comment} <br></br> <span>--</span> {item.author}{" "}
//                       {new Intl.DateTimeFormat("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "2-digit",
//                       }).format(new Date(Date.parse(item.date)))}
//                     </li>
//                   );
//                 })}
//               </List>
//             </CardBody>
//           </Card>
//         </Col>
//       );
//     else return <div></div>;
//   }

//   // la funcion render se pone siempre para mostra el contenido
//   // el contenido es el return de esta funcion
//   // en este caso antes del return declaramos una constante menu que  devuelve un array  las cards de todos los dishes

//   // porque la card no ocupan el 100% del ancho?
//   render() {
//     return (
//       <div className="container">
//         <Row>
//           {this.renderDish(this.props.dish)}

//           {this.renderComments(this.props.dish)}
//         </Row>
//         {/* <Row>
//           <Col xs="12" md="5">
//             col 1
//           </Col>
//           <Col xs="12" md="5">
//             col 2
//           </Col>
//           <Col xs="12" md="5">
//             col 3
//           </Col>
//         </Row>
//         <div className="row">
//           <div className="col-12 col-md-5 m-3">col a</div>
//           <div className="col-12 col-md-5 m-3">col b</div>
//           <div className="col-12 col-md-5 m-3">col c</div>
//         </div> */}
//       </div>
//     );
//   }
// }

// export default DishDetail;

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
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

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
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
function RenderDish({ dish }) {
  if (dish != null)
    return (
      // <Col xs="12" md="5" m="1" className="m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      // </Col>
    );
  else return <div></div>;
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
function RenderComments({ comments, postComment, dishId }) {
  if (comments != null)
    return (
      // <Col xs="12" md="5" className="m-1">
      <Card>
        <CardBody>
          <h4>Comments</h4>
          <List type="unstyled">
            {comments.map(function (item) {
              console.log("ESTOS SON LOS ITEMS", item);
              return (
                <li key="{item.id}">
                  {" "}
                  {item.rating}
                  <span>--</span>
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
          <CommentForm dishId={dishId} postComment={postComment} />
        </CardBody>
      </Card>
      // </Col>
    );
  else return <div></div>;
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // estos son hooks que se usarian en function components
  // toggle = () => setModal(!modal);
  // al no usar hooks hago de la siguiente manera
  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  handleSubmit(values) {
    this.toggle();
    console.log("aqui estan", values);
    this.props.postComment(
      this.props.dishId,
      values.Rating,
      values.Yourname,
      values.Comment
    );
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
                <Button color="primary" type="submit">
                  Do Something
                </Button>{" "}
              </Row>
            </LocalForm>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const DishDetail = (props) => {
  console.log("ESTOS SON LOS PROPS", props);

  // if (props.dish != null) {
  //   return (
  //     <div className="container">
  //       <Row>
  //         <RenderDish dish={props.dish} />
  //         <RenderComments comments={props.dish.comments} />
  //       </Row>
  //     </div>
  //   );
  // } else {
  //   return <div></div>;
  // }
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
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
            {/* <RenderComments comments={props.comments} /> */}
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
