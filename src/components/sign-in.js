import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { auth, SignInWithGoogle } from '../firebase/firebase.utils';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
      alert("Invalid details or Empty fields");
     
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {  email, password} = this.state;
    return (
      <div className='sign-in'>
          <h2 className='title'>Sign IN</h2>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email"
                name='email'
                onChange={this.handleChange}
                value={email}
                required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password"
                name='password'
                value={password}
                onChange={this.handleChange}
                required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
            <Button style={{marginLeft: 15}} variant="primary" onClick={SignInWithGoogle}>
               Sign In with Google
            </Button>
        </Form>
      </div>
    );
  }
}

export default SignIn;