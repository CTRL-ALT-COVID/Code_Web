import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Card, Button } from "react-bootstrap";
import "./all-hospitals.css";
import { acceptedRejectHospital } from "../../store/actions/authActions";

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
                <h6>{"Contact number: " + hospital.phone}</h6>
                <h6>{"Review: " + hospital.review}</h6>
                <h6>{"Kind of Hospital: " + hospital.govt? "Government Hospital" : "Private Hospital" }</h6>
                <h6>{"No of Isolation Beds available: " + hospital.no_of_beds}</h6>
                <h6>{"No of Ventilators Availabe: " + hospital.no_of_ventialtors}</h6>
                <h6>{"Speciality: " + hospital.speciality}</h6>
                <h6>{ hospital.only_coid? "Serving only COVID19 patients" : "Attending all kinds of patients"}</h6>
               
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {hospital.covid_patients
                ? hospital.covid_patients.map((patient) => {
                    console.log(patient.uid);
                    if (patient.uid === auth.uid) data = patient.coming;
                    return patient.coming;
                  })
                : hospital.not_covid_patients
                ? hospital.not_covid_patients.map((patient) => {
                    if (patient.uid === auth.uid) data = patient.coming;
                    return patient.coming;
                  })
                : null}
              {console.log(data)}
              {data === undefined ? (
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
              ) : data === true ? (
                <h5 style={{ color: "green" }}>Going</h5>
              ) : data === false ? (
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
