import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import './all-hospitals.css';

class AllHospitals extends React.Component {
  render() {
    const { hospitals } = this.props;
    return (
      <div className="hospitals">
        <h2 className="heading">Hospitals that will attend you</h2>

        <CardDeck className="justify-content-center">
          {hospitals ?
            hospitals.map((hospital) => {
              return (
                <Link to={"/hospitals/" + hospital.hospital_slug} key={hospital.hospital_slug}>
                  <Card className="hospital-card">
                    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                    <Card.Body>
                      <Card.Title>{hospital.name}</Card.Title>
                      <Card.Text className="text">
                        {"Address: " + hospital.address} <br />
                        { "Contact: "+ hospital.phone}<br />
                        {"Review: " + hospital.review }<br />
                        { "No of beds avaiable: "+ hospital.no_of_beds}<br />
                        { "No of Ventilators avaiable: "+ hospital.no_of_ventilators}
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
            }) : "Loading"}
        </CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    hospitals: state.firestore.ordered.hospitals,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "hospitals" }])
)(AllHospitals);
