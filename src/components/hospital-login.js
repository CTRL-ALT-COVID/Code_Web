import React from 'react';
import {Button, Form} from 'react-bootstrap';
import { auth  } from '../firebase/firebase.utils';
import {Redirect} from 'react-router-dom';


class HospitalLogin extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          canRedirect: false
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
    
        const { email, password } = this.state;
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: '', password: '', canRedirect: true });
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
        const {  email, password } = this.state;
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
                {this.state.canRedirect? <Redirect to='/hospital-dashboard' />: <div></div>}
            </Form>
          </div>
        );
      }
    }

export default HospitalLogin;
		