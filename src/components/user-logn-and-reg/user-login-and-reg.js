import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {SignInWithGoogle} from '../../firebase/firebase.utils';
import './user-login-and-reg.css';
import SignUp from '../../components/singup';


class UserLoginandReg extends React.Component{
    render(){
        return(
            <div className="login-form">
                <Row>
                    <Col lg='6' md='6'>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button style={{marginLeft: 15}} variant="primary" onClick={SignInWithGoogle}>
                            Login with Google
                        </Button>
                    </Form>
                    <br />
                    New user? Sign Up here.
                    
                    </Col>
                    <SignUp />
                </Row>
            </div>
        )
    }

}

export default UserLoginandReg;
		