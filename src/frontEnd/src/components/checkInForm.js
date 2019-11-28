import React, { Component } from "react";
import {
  Card,
  ListGroup,
  Container,
  Button,
  Jumbotron,
  Form,
  Col,
  InputGroup,
  FormControl,
  Alert
} from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Scrollbars } from "@influxdata/react-custom-scrollbars";
import Navbar from "./navBar";
import swal from "sweetalert";

class EntryForm extends Component {
  constructor() {
    super();
    this.state = {
      visitorName: null,
      visitorPhone: null,
      visitorEmail: null,
      hostId: null,
      redirect: false,
      host: [],
      search: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/host")
      .then(res => res.json())
      .then(host =>
        this.setState({ host }, () => console.log("host fetched...", host))
      );
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: this.state.visitorName,
      phoneNumber: parseInt(this.state.visitorNumber),
      email: this.state.visitorEmail,
      hostId: this.state.hostId
    };
    console.log(data);
    axios.post(`http://localhost:4000/checkIn`, data).then(res => {
      console.log("object", res.data.message);
      if (res.data.response != false && res.data.status != 500) {
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
          this.componentDidMount();
        });
      }
    });
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filter = this.state.host.filter(host => {
      return (
        host.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        host.phoneNumber
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
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
              <h3>Check-In Form</h3>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        ref="visitorName"
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
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Host</Form.Label>
                  <InputGroup className="mb-4">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Search host By
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      value={this.state.search}
                      onChange={this.updateSearch.bind(this)}
                      placeholder="Name or Phone Number"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </InputGroup>
                  <Scrollbars
                    style={{ width: 500, height: 150 }}
                    autoHeightMin={0}
                    autoHeightMax={200}
                    autoHide={true}
                    hideTracksWhenNotNeeded={true}
                  >
                    <Card style={{ width: "100%" }}>
                      <ListGroup variant="flush">
                        {filter.map(hosts => (
                          <ListGroup.Item>
                            <Form.Check 
                              type="radio"
                              id={`check-api-radio`}
                              style={{ float: "left" }}
                            >
                              <Form.Check.Input
                                disabled = {hosts.active}
                                name="hostId"
                                value={hosts.id}
                                onChange={this.handleChange}
                                type="radio"
                              />
                              <Form.Check.Label>
                                Name -{" "}
                                <span style={{ color: `${hosts.active? "red" : "green"}` }}>
                                  {hosts.name}
                                </span>{" "}
                                <br></br>Email -{" "}
                                <span style={{ color: `${hosts.active? "red" : "green"}` }}>
                                  {hosts.email}
                                </span>
                              </Form.Check.Label>
                            </Form.Check>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card>
                  </Scrollbars>
                </Form.Group>
              </Form.Row>
              <Button
                disabled={!this.refs.visitorName}
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
