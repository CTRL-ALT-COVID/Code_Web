import React from 'react';
import {Redirect} from 'react-router-dom';
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
                Works!
                Now Redirect
                <div onClick={this.handleRedirect}>Yaay</div>
                { this.state.canRedirect ===true ? 
                 <Redirect to='/ask-covid' /> : <div></div> }
                
            </div>
        );
    }
}

export default Soundtest;