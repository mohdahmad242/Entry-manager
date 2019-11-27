import React, { Component } from "react";
import { Form, Container, Jumbotron, Button, Col } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navBar";
import swal from "sweetalert";

class EntryForm extends Component {
  constructor() {
    super();
    this.state = {
      hostName: null,
      hostPhone: null,
      hostEmail: null,
      hostAddress: null,
      redirect: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      hostName: this.state.hostName,
      hostPhone: parseInt(this.state.hostNumber),
      hostEmail: this.state.hostEmail,
      hostAddress: this.state.hostAddress
    };
    console.log(data);
    axios.post(`http://localhost:4000/host`, data).then(res => {
      if (res.data.response != false && res.data.status != 500) {
        console.log("object", res);
        const message = res.data.message;
        swal({
          text: message,
          title: "Success",
          icon: "success",
          closeOnClickOutside: true,
          timer: 3000
        }).then(() => {
          this.props.history.push("/", true);
        });
      } else {
        const message = res.data.message;
        swal({
          text: message,
          title: "Error",
          icon: "error",
          className: "red-bg",
          closeOnClickOutside: true,
          timer: 3000
        }).then(() => {
          this.props.history.push("/host");
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Jumbotron style={{ marginTop: "2rem", paddingTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "2rem"
              }}
            >
              <h3>Host Registration Form</h3>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        ref="name"
                        name="hostName"
                        value={this.state.hostName}
                        type="text"
                        placeholder="Enter name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        name="hostNumber"
                        value={this.state.hostNumber}
                        type="number"
                        placeholder="Phone Number"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="hostEmail"
                      value={this.state.hostEmail}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="hostAddress"
                      value={this.state.hostAddress}
                      placeholder="1234 Main St"
                    />
                  </Form.Group>
                </Form.Group>
              </Form.Row>
              <Button
                disabled={!this.refs.name}
                onClick={() => this.setState({ redirect: true })}
                variant="primary"
                type="submit"
                style={{ width: "8rem", margin: "2rem" }}
              >
                Submit
              </Button>
            </Form>
            <Link to="/">
              <Button variant="warning" type="submit">
                Back
              </Button>
            </Link>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default EntryForm;
