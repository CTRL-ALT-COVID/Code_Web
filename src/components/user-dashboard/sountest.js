import React from 'react';
import Recording from './record';
import {Button} from 'react-bootstrap';
class Soundtest extends React.Component{

    
    handleRedirect = () => {
        
        this.props.history.push('/ask-covid');
    }

    render(){
        return(
            <div>
                <Recording />
                <Button variant="primary" type="button" onClick={this.handleRedirect}>next</Button>

                
            </div>
        );
    }
}

export default Soundtest;