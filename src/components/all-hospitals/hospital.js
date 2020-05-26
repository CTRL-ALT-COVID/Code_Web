import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Card, Button } from "react-bootstrap";
import "./all-hospitals.css";
import { acceptedRejectHospital } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class HospitalDetails extends React.Component {
  acceptPatient = (user) => {
    console.log(user);
    this.props.acceptedRejectHospital(user.uid, true);
  };
  rejectPatient = (user) => {
    this.props.acceptedRejectHospital(user.uid, false);
  };
  render() {
    const { hospital, auth } = this.props;
    let data;
    return (
      <div>
        {hospital ? (
          <Card className="hospital-details">
            <Card.Body>
              <Card.Text>
                <h1>{hospital.name ? hospital.name : "Hospital Name"}</h1>
                <h6>{"Address: " + hospital.address} </h6>
                <h6>Review</h6>
                <h3>Beds available</h3>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {
                (data = hospital.covid_patients
                  ? hospital.covid_patients.map((patient) => {
                      if (patient.uid === auth.uid) return patient.coming;
                    })
                  : hospital.not_covid_patients
                  ? hospital.not_covid_patients.map((patient) => {
                      if (patient.uid === auth.uid) return patient.coming;
                    })
                  : null)
              }
              {data === null ? (
                <div>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => this.acceptPatient(hospital)}
                  >
                    Going
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => this.rejectPatient(hospital)}
                    style={{ marginLeft: 15 }}
                  >
                    Not Going
                  </Button>
                </div>
              ) : data ? (
                <h5 style={{ color: "green" }}>Going</h5>
              ) : data ? (
                <h5>Not Going</h5>
              ) : null}
            </Card.Footer>
          </Card>
        ) : (
          <div>Come back after 30 mins and check!</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const hospital_slug = ownProps.match.params.hospital_slug;
  const hospitals = state.firestore.ordered.hospital_users;
  const hospital = hospitals
    ? hospitals.filter((user) => {
        if (user.hospital_slug === hospital_slug) return user;
      })[0]
    : null;
  console.log(hospital);
  return {
    hospital: hospital,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptedRejectHospital: (id, accepted) =>
      dispatch(acceptedRejectHospital(id, accepted)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "hospital_users",
    },
  ])
)(HospitalDetails);
