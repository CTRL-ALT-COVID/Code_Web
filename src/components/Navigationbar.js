import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #ffffff;

    &:hover {
      color: white;
    }
  }
`;

class NavigationBar extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">CTRL+ALT+COVID</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.props.auth &&
              this.props.auth.email &&
              this.props.auth.email.includes("hospital") ? (
                <Nav.Item>
                  <Nav.Link href="/hospital-dashboard">Dashboard</Nav.Link>
                </Nav.Item>
              ) : this.props.auth.uid ? (
                <Nav.Item>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
              )}
              {this.props.auth &&
              this.props.auth.email &&
              this.props.auth.email.includes("hospital") ? null : this.props
                  .auth.uid ? (
                <Nav.Item>
                  <Nav.Link href="/hospitals">Hospitals</Nav.Link>
                </Nav.Item>
              ) : null}

              <Nav.Item>
                <Nav.Link href="/Doctor">Doctor </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Patients">Patients </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Awareness">Awareness </Nav.Link>
              </Nav.Item>
              {auth.uid ? (
                <div>
                  <Nav.Item>
                    <Nav.Link onClick={this.props.signOut} href="/">
                      Sign Out
                    </Nav.Link>
                  </Nav.Item>
                </div>
              ) : (
                <Nav.Item>
                  <Nav.Link href="/">Sign IN</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
