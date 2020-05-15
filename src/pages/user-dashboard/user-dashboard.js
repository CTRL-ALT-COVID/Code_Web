import React from 'react';
import {Redirect} from 'react-router-dom';
import './user-dashboard.css';


class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isPhysicalConsult: false
        }
    }

    handleConsultation = () => {
        this.setState({
            isPhysicalConsult: !this.state.isPhysicalConsult
        });
    }

    render(){
        const {isPhysicalConsult} = this.state ;
        return(
            <div>
                <div className="physical-consult" onClick={this.handleConsultation}>
                    Consult Physically
                    {
                        isPhysicalConsult ? <div> <Redirect to='/sound-test' /> </div> : <div></div> 
                    }
                </div>
                <div className="online-consult" onClick={this.handleConsultation}>
                    Consult Online
                    {
                        isPhysicalConsult ? <div> <Redirect to='/consult-online' /> </div> : <div></div> 
                    }
                </div>

            </div>
        );
    }
}


export default UserDashboard; 