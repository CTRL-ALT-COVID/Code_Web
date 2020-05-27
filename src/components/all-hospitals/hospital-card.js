import React from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './all-hospitals.css'
class HospitalCard extends React.Component {
  render() {
    const { hospital } = this.props;
    return (
      <Link className="h-card"
        to={"/hospitals/" + hospital.hospital_slug}
        key={hospital.hospital_slug}
      >
        <Card className="hospital-card">
          <Card.Body>
            <Card.Title>{hospital.name}</Card.Title>
            <Card.Text className="text">
              {"Address: " + hospital.address} <br />
              {"Contact: " + hospital.phone}
              <br />
              {"Review: " + hospital.review}
              <br />
              {"No of beds avaiable: " + hospital.no_of_beds}
              <br />
              {"No of Ventilators avaiable: " + hospital.no_of_ventilators}
              <br />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {hospital.only_covid
                ? "Attending Covid19 Patients only"
                : "Attending all kinds of patients"}
            </small>
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}

export default HospitalCard;
