import React from 'react';
import {Redirect} from 'react-router-dom';
import './user-dashboard.css';


class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isPhysicalConsult: false,
            isOnlineConsult: false,
            canRedirect: false
        }
    }

    handleOnlineConsultation = () => {
        this.setState({
            isOnlineConsult: true,
            canRedirect: true
        });
    }

    handlePhysicalConsultation = () => {
        this.setState({
            isPhysicalConsult: true,
            canRedirect: true
        });
    }

    render(){
        const {isPhysicalConsult, canRedirect, isOnlineConsult} = this.state ;
        return(
            <div>
                <div className="physical-consult" onClick={this.handlePhysicalConsultation}>
                    Consult Physically
                </div>
                <div className="online-consult" onClick={this.handleOnlineConsultation}>
                    Consult Online
                    
                </div>
                {   canRedirect?
                        isPhysicalConsult === true ? <div> <Redirect to='/sound-test' /> </div> : 
                        isOnlineConsult === true ? <div> <Redirect to='/consult-online' />
                        </div> :<div></div> : <div></div>
                    }

            </div>
        );
    }
}


export default UserDashboard; 