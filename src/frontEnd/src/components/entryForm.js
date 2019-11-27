import React, { Component } from "react";
import { Form, Container, Jumbotron, Button, Col } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";

class EntryForm extends Component {
  constructor() {
    super();
    this.state = {
      hostName: null,
      hostPhone: null,
      hostEmail: null,
      hostAddress: null,
      visitorName: null,
      visitorPhone: null,
      visitorEmail: null,
      redirect: false,
      time: "",
      date: ""
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
      hostAddress: this.state.hostAddress,
      visitorName: this.state.visitorName,
      visitorPhone: parseInt(this.state.visitorNumber),
      visitorEmail: this.state.visitorEmail,
      visitorVisitTimeDate: `${this.state.date} ${this.state.time}`
    };
    console.log(data);
    axios.post(`http://localhost:4000/entry`, data).then(res => {
      console.log(res.data);
    });
    this.props.history.push("/", true);
  };

  render() {
    return (
      <div>
        <Container>
          <h2>Visitors</h2>
          <Jumbotron>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "2rem"
              }}
            >
              <h3>Host Detail</h3>
              <h3>Visitor's Detail</h3>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
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
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        ref="name"
                        onChange={this.handleChange}
                        name="visitorName"
                        value={this.state.visitorName}
                        type="text"
                        placeholder="Enter name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        name="visitorNumber"
                        value={this.state.visitorNumber}
                        type="number"
                        placeholder="Phone Number"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="visitorEmail"
                      value={this.state.visitorEmail}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        ref="date"
                        onChange={this.handleChange}
                        name="date"
                        value={this.state.date}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        name="time"
                        value={this.state.time}
                        type="time"
                      />
                    </Form.Group>
                  </Form.Row>
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
