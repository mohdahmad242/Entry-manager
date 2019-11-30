import React, { Component } from "react";
import {
  Table,
  Container,
  Button,
  Jumbotron,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Navbar from "./navBar";

class PastEntryDashboard extends Component {
  constructor() {
    super();
    this.state = {
      visitors: [],
      search: ""
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

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filter = this.state.visitors.filter(visitor => {
      return (
        visitor.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        visitor.phoneNumber
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
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
        <div
          style={{ marginRight: "5rem", marginLeft: "5rem", marginTop: "3rem" }}
        >
          <Jumbotron style={{ marginTop: "1rem" }}>
            <h2>All Entries</h2>
            <Link to="/">
              <Button
                variant="warning"
                type="submit"
                style={{ margin: "1rem" }}
              >
                Back
              </Button>
            </Link>
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
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Date</th>
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
                    <td>{visitors.phoneNumber}</td>
                    <td>{visitors.email}</td>
                    <td>{(visitors.checkInTime).slice(0, 10)}</td>
                    <td style={{ width: "9rem" }}>{(visitors.checkInTime).slice(10, 19)}</td>
                    <td style={{ width: "10rem" }}>{visitors.checkOutTime == "Invalid date" ? null: (visitors.checkOutTime).slice(10, 19)}</td>
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
                            Email - <strong>{visitors.hostName.email}</strong>
                            <br></br>
                            Address -{" "}
                            <strong>{visitors.hostName.address}</strong>
                          </Tooltip>
                        }
                      >
                        <Button variant="info">{visitors.hostName.name}</Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default PastEntryDashboard;
