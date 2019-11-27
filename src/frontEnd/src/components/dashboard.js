import React, { Component } from "react";
import {
  Table,
  Modal,
  Col,
  Button,
  Jumbotron,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  FormControl,
  Row,
  Alert
} from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navBar";
import swal from "sweetalert";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      visitors: [],
      search: "",
      show: false,
      checkOutEmail: null,
      alertShow: false,
      error: false,
      message: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/visitor")
      .then(res => res.json())
      .then(visitors =>
        this.setState({ visitors }, () =>
          console.log("Visitors fetched...", visitors)
        )
      );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleCheckOut = event => {
    event.preventDefault();

    const data = { email: this.state.checkOutEmail };
    axios.post(`http://localhost:4000/checkOut`, data).then(res => {
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
      this.componentDidMount();
    });
    this.setState({ show: false });
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filter = this.state.visitors.filter(visitor => {
      return (
        (visitor.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
          visitor.phoneNumber
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1) &&
        visitor.checkOutTime == null
      );
    });
    if (this.props.location.state == true) {
      this.props.history.push({
        state: false
      });
      this.componentDidMount();
    }

    return (
      <div>
        <Navbar />
        {this.state.alertShow == true ? (
          <Alert variant={this.state.error ? "danger" : "success"}>
            {this.state.message}
          </Alert>
        ) : null}

        <div style={{ marginRight: "5rem", marginLeft: "5rem" }}>
          <Jumbotron style={{ marginTop: "2rem", paddingTop: "1rem" }}>
            <h1 style={{ marginBottom: "2rem" }}>Welcome to Innovaccer</h1>
            <Row>
              <Col sm={8}>
                <h2>Dashboard</h2>
                <InputGroup className="mb-4">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Search Visitor By
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
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Check-In Time</th>
                      <th>Check-Out Time</th>
                      <th>Host</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filter.map((visitors, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{visitors.name}</td>
                        <td>{visitors.checkInTime}</td>
                        <td>{visitors.checkOutTime}</td>
                        <td>
                          <OverlayTrigger
                            key="none"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">
                                Name - <strong>{visitors.hostName.name}</strong>
                                <br></br>
                                Phone No -{" "}
                                <strong>{visitors.hostName.phoneNumber}</strong>
                                <br></br>
                                Email -{" "}
                                <strong>{visitors.hostName.email}</strong>
                                <br></br>
                                Address -{" "}
                                <strong>{visitors.hostName.address}</strong>
                              </Tooltip>
                            }
                          >
                            <Button variant="info">
                              {visitors.hostName.name}
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col
                sm={1}
                style={{ borderLeft: " 4px solid black", height: "100" }}
              ></Col>
              <Col sm={3}>
                <Link to="/checkIn">
                  <Button
                    variant="primary"
                    style={{ width: "10rem", margin: "2rem" }}
                  >
                    Check-In
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  onClick={this.handleShow}
                  style={{ width: "10rem", margin: "2rem" }}
                >
                  Check-Out
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Check-Out</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Enter Your Email Address.
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Email
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="xyz@example.com"
                        onChange={this.handleChange}
                        value={this.state.checkOutEmail}
                        name="checkOutEmail"
                        aria-label="Email"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button variant="warning" onClick={this.handleCheckOut}>
                      Check-Out
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Link to="/host">
                  <Button
                    variant="primary"
                    style={{ width: "10rem", margin: "2rem" }}
                  >
                    Register Host
                  </Button>
                </Link>
                <Link to="/pastEntry">
                  <Button
                    variant="primary"
                    style={{ width: "10rem", margin: "2rem" }}
                  >
                    View All Entries
                  </Button>
                </Link>
              </Col>
            </Row>
          </Jumbotron>
          {/* </Container> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
