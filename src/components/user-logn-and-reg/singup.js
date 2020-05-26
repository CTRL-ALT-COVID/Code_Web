import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      canRedirect: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    if (password.length < 6) {
      alert("passwords should have at least 6 characters");
      return;
    }

    this.props.signUp(this.state);
    this.setState({
      canRedirect: true,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">Register Me</h2>
        <Form className="sign-up-form" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              value={displayName}
              onChange={this.handleChange}
              placeholder="Enter Name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter Email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {this.state.canRedirect ? (
            <div>
              <Redirect to="/complete-profile" />{" "}
            </div>
          ) : (
            <div></div>
          )}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
