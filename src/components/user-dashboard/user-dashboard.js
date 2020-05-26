import React from 'react';
import './user-dashboard.css';


class UserDashboard extends React.Component{
   
    handleOnlineConsultation = () => {
        this.props.history.push('/sound-test');
    }

    handlePhysicalConsultation = () => {
        this.props.history.push('/consult-online');
    }

    handleFreeTest = () => {
        this.props.history.push('/free-test');
    }

    render(){
       
        return(
            <div>
                <div className="physical-consult" onClick={this.handlePhysicalConsultation}>
                    Consult Physically
                </div>
                <div className="physical-consult" onClick={this.handleFreeTest}>
                    Take Free Test
                </div>
                <div className="online-consult" onClick={this.handleOnlineConsultation}>
                    Consult Online
                    
                </div>
               

            </div>
        );
    }
}


export default UserDashboard; 