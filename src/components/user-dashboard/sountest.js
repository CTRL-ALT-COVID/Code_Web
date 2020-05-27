import React from 'react';
import Recording from './record';
import {Button} from 'react-bootstrap';
class Soundtest extends React.Component{

    
    handleRedirect = () => {
        alert("You should be in 14 days of self quarantine before continuing futher if you are unsafe from COVID19")
        this.props.history.push('/ask-covid');
    }

    render(){
        return(
            <div>
                <Recording />
                <Button variant="primary" type="button" onClick={this.handleRedirect}>Continue</Button>

                
            </div>
        );
    }
}

export default Soundtest;