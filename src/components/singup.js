import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      shouldRedirect: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    if (password.length <6){
      alert("passwords should have at least 6 characters");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        shouldRedirect:true
      });
      } catch (error) {
      console.log(error);
      alert("Invalid details or Empty fields");
     
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>Register Me</h2>
            <Form className='sign-up-form' onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text"  
                    name="displayName" 
                    value={displayName} 
                    onChange={this.handleChange}
                    placeholder="Enter Name"
                    required />
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
                    required />
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
                {this.state.shouldRedirect? <Redirect to='/complete-profile' />: <div></div>}
            </Form>
      </div>
    );
  }
}

export default SignUp;