import React from 'react';
import {Form, Button,  Row, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { signInHospital } from '../store/actions/hospitalAuthActions'
import './styles.css';
import signin from '../assets/Login-rafiki.svg';

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
    this.props.signInHospital(this.state);
    this.setState({
      canRedirect: true
    });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {  email, password } = this.state;
    // const { auth } = this.props;
   
    return (
      <div className='sign-in-hospital'>
          <Row>
          <Col lg="6" md="6" className="h-form ">
          <h2 className='title'>Sign IN</h2>
          <br />
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
            {this.state.canRedirect? <Redirect to='/hospital-dashboard' />: <div></div>}
        </Form>
        </Col>
        <Col lg={6} md={6}>
          <img src={signin} alt="login" />
        </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
   
    hospital: state.hospital
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInHospital: (creds) => dispatch(signInHospital(creds))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

