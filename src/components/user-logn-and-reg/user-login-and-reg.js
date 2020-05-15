import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SignIn from '../sign-in';
import './user-login-and-reg.css';
import SignUp from '../../components/singup';


class UserLoginandReg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signup: false
        }
    }
    changeState = () => {
        this.setState({
            signup: !this.state.signup,

        });

    }
    render() {
        return (
            <div className="login-form">
                <Row>
                    <Col lg='6' md='6'>
                        {!this.state.signup ?
                            <div>
                                <SignIn />
                                <br />
                                <div className="toggle-sign-in" onClick={this.changeState}>
                                    New user? Sign Up here.</div>
                            </div>
                            :
                            <div>
                                <SignUp />
                                <br />
                                <div className="toggle-sign-in" onClick={this.changeState}>
                                    Already Registered? Sign IN here.
                                </div>
                            </div>}
                    </Col>

                </Row>
            </div>
        )
    }

}

export default UserLoginandReg;
