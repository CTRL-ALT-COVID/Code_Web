import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { auth, firestore } from "../../firebase/firebase.utils";
import { setCurrentUser } from "../../redux/user/user-actions";
import { connect } from "react-redux";

class CovidChoice extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            thinksHasCovid: false,
            hasOtherDiseases: false,
            otherDiseases: "",
            canRedirect: false
        }
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
                canRedirect: true
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (e) => {
        
        console.log(e.target);
        const { name, value } = e.target;
        this.setState({ [name]: value === "true" ? true : value === "false" ? false : value });
    };
    

    render(){

        return(
            <div>                
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group   controlId="formGridCovid">
                        <Form.Label>Do you think you have Covid 19?</Form.Label> <br />
                        <Form.Check value={true} inline label="Yes" type='radio'   
                        name="thinksHasCovid"
                        onChange={this.handleChange} />
                        <Form.Check value={false} inline label="No" type='radio'  
                        name="thinksHasCovid"                       
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group  controlId="formGridheartNoCovid">
                        <Form.Label>Do you any other disease?</Form.Label> <br />
                        <Form.Check value={true} inline label="Yes"  
                        name="hasOtherDiseases"  
                        onChange={this.handleChange}
                         type='radio'  />
                        <Form.Check value ={ false} inline label="No"  
                        name="hasOtherDiseases"  
                        onChange={this.handleChange}
                        type='radio' />
                    </Form.Group>  
                    { this.state.hasOtherDiseases === true ?
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>What are the other problems that you are facing?</Form.Label>
                        <Form.Control
                        type="text"
                        required
                        name="otherDiseases"  
                        onChange={this.handleChange}
                        value={this.state.otherDiseases}
                         as="textarea" rows="3" />
                    </Form.Group> : <div></div> }                      
                    <Button variant="primary" type="submit">
                    Continue
                    </Button> 
                    {this.state.canRedirect ? <Redirect to="/application-form" /> : <div></div>}
                </Form>
            </div>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CovidChoice);