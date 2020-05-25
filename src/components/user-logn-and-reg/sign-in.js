import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'


class SignIn extends React.Component {
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
    this.props.signIn(this.state)
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {  email, password } = this.state;
    const { auth } = this.props;
   
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
            {/* <Button style={{marginLeft: 15}} variant="primary" onClick={SignInWithGoogle}>
               Sign In with Google
            </Button> */}
            {auth.uid? <Redirect to='/dashboard' />: <div></div>}
        </Form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);


/* 


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

*/