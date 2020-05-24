import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Card } from "react-bootstrap";
import './all-hospitals.css'
import { Redirect } from "react-router-dom";

const HospitalDetails = (props) => {
  const { hospital } = props;

  return (
    <div>
      {hospital ? (
        <Card  className="hospital-details">
          <Card.Body>
            <Card.Text>
              <h1>{hospital.name ? hospital.name : "Hospital Name"}</h1>
              <h6>{"Address: " + hospital.address} </h6>
              <h6>Review</h6>
              <h3>Beds available</h3>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  const hospital_slug = ownProps.match.params.hospital_slug;
  const hospitals = state.firestore.data.hospitals;
  const hospital = hospitals ? hospitals[hospital_slug] : null;
  return {
    hospital: hospital,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "hospitals",
    },
  ])
)(HospitalDetails);
