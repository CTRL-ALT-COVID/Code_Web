import React from 'react';
import {Redirect} from 'react-router-dom';
import Recording from '../components/record';
class Soundtest extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            canRedirect: false
        }
    }
    handleRedirect = () => {
        this.setState({
            canRedirect: true
        })
    }

    render(){
        return(
            <div>
                <Recording />
                <div onClick={this.handleRedirect}>next</div>
                { this.state.canRedirect ===true ? 
                 <Redirect to='/ask-covid' /> : <div></div> }
                
            </div>
        );
    }
}

export default Soundtest;