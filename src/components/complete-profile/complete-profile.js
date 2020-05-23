import React from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { auth, firestore } from '../../firebase/firebase.utils'
import './complete-profile.css'

class CompleteProfile extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      gender: "female",
      age: 0,
      phone: 0,
      location: "",
      canRedirect: false
    };
  }

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      this.userRef.update(this.state);
      this.setState({
        gender: "",
        age: 0,
        phone: 0,
        location: "",
        canRedirect: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
      
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {

    const { age, phone, gender, location} = this.state;
    return (
      <div className="profile-form">
        <h2>Tell us more about you</h2> <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="gender"
                value={gender}
                onChange={this.handleChange}
                required
              >
                <option>Female</option>
                <option>Male</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                name="age"
                placeholder="Your Age"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="09874563210"
              name="phone"
              value={phone}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGridL0cation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={location}
              onChange={this.handleChange}
              placeholder="Kolkata"
              required
            />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              checked              
              label="I agree to share my information with the hospitals"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
          {this.state.canRedirect? <Redirect to='/dashboard' />: <div></div>}
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => ({
	currentUser: state.user.currentUser
	});
	
export default connect(mapStateToProps)(CompleteProfile);
