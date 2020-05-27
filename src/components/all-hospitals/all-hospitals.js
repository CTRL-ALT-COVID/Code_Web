import React from "react";
import { CardDeck } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import "./all-hospitals.css";
import HospitalCard from "./hospital-card";

class AllHospitals extends React.Component {
  render() {
    const { hospitals, auth } = this.props;
    return (
      <div className="hospitals">
        <h2 className="heading">Hospitals that will attend you</h2>
        <br />
        <CardDeck className="justify-content-center">
          {hospitals
            ? hospitals.map((hospital) => {
                return (
                  <div>
                    {hospital.covid_patients
                      ? hospital.covid_patients.map((patient) => {
                          if (patient.uid === auth.uid && patient.accepted)
                            return <HospitalCard hospital={hospital} />;
                          return null;
                        })
                      : hospital.not_covid_patients.map((patient) => {
                          if (patient.uid === auth.uid && patient.accepted)
                            return <HospitalCard hospital={hospital} />;
                          return null;
                        })}
                  </div>
                );
              })
            : <h6>Come back after 30 minutes</h6>}
        </CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    hospitals: state.firestore.ordered.hospital_users,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "hospital_users" }])
)(AllHospitals);
