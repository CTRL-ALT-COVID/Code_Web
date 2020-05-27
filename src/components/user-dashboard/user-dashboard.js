import React from "react";
import "./user-dashboard.css";
import { Card } from "react-bootstrap";

class UserDashboard extends React.Component {
  handleOnlineConsultation = () => {
    this.props.history.push("/consult-online");
  };

  handlePhysicalConsultation = () => {
    this.props.history.push("/sound-test");
  };

  handleFreeTest = () => {
    this.props.history.push("/free-test");
  };

  render() {
    return (
      <div className="consultation">
        <div onClick={this.handlePhysicalConsultation}>
          <Card className="consult"><Card.Title style={{fontSize: 40}}>Consult Doctors Physically</Card.Title>
          <Card.Text class="text">Fill a form to know which hospitals will be able to attend to your issues.</Card.Text></Card>
        </div>
        <div onClick={this.handleFreeTest}>
          <Card className="consult"><Card.Title style={{fontSize: 40}}>Take Free Test</Card.Title>
          <Card.Text class="text">Take up a free test to know whether you are safe from covid or not.</Card.Text></Card>
        </div>
        <div onClick={this.handleOnlineConsultation}>
        <Card className="consult"><Card.Title style={{fontSize: 40}}>Consult Doctors Online</Card.Title>
          <Card.Text class="text">A feature coming soon where you can talk to doctors online for doing some remedy at home</Card.Text></Card>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
