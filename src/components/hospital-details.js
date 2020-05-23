import React from 'react';
import {Card} from 'react-bootstrap';

class Hospital extends React.Component{

    render(){
        return(
            <div>
                  <Card>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Text>
                        <h1>Name of hospital</h1>
                        <h6>Address: </h6>
                        <h6>Review</h6>
                        <h3>Beds available</h3>
                    </Card.Text>
                    </Card.Body>
                </Card>
               
            </div>
        );
    }
}

export default Hospital;