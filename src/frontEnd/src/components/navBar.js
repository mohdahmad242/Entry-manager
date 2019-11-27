import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Entry Management</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
